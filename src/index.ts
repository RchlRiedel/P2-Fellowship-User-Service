import express, { Request, Response, NextFunction } from "express"
import { userRouter } from "./routers/user-router"
import { User } from "./models/User"

import { InvalidCredentials } from "./errors/Invalid-Credentials"
import { UserSignUpError } from "./errors/User-Sign-Up-Error"
import { NoUserLoggedInError } from "./errors/No-User-Logged-In-Error"

import { loggingMiddleware } from "./middleware/logging-middleware"
// import { sessionMiddleware } from "./middleware/session-middleware"
import { corsFilter } from "./middleware/cors-filter"
import jwt from 'jsonwebtoken'
import { saveNewUserService, getUserByUserNameAndPasswordService } from "./services/user-service"

//import { userTopic } from "./messaging"
import './event-listeners/new-user' //so that file will actually excetute 
import './event-listeners/updated-user' //try
import { JWTVerifyMiddleware } from "./middleware/jwt-verify-middleware"

//console.log(userTopic); //see what the topic is

const app = express() //our application from express

app.use(express.json({limit:'50mb'})) 
//need to increase max size of body we can parse, in order to allow for images

app.use(loggingMiddleware)

app.use(corsFilter)

// app.use(sessionMiddleware)

app.use(JWTVerifyMiddleware)

app.use("/users", userRouter)

//health check! for load balancer 
app.get('/health', (req:Request,res:Response)=>{
    res.sendStatus(200)
})


//Save a new user (here to avoid authentification)
app.post("/register", async (req:any, res:Response, next:NextFunction)=>{    
    console.log(req.body)
    let {username, password, firstName, lastName, affiliation, address, email, image} = req.body 

    if (!username || !password || !firstName || !affiliation || !email){
        next(new UserSignUpError)
    } else {
        let newUser: User = {
            userId:0,
            username,
            password,
            firstName,
            lastName,
            affiliation,
            placesVisited:0,
            address,
            email,
            role: 'User',
            image
        }
        newUser.lastName = lastName || null
        newUser.address = address || null
        newUser.image = image || null 

        try {
            let savedUser = await saveNewUserService(newUser) //using service function instead of DAO
            req.user = savedUser //set session user to current, new user
            res.json(savedUser) 
        } catch(e) {
            next(e)
        }
    }
})

//login
app.post("/login", async (req: Request, res: Response, next: NextFunction)=>{
    let {username, password} =  req.body

    if (!username || !password){
        next(new InvalidCredentials())
    } else {
       try {
            let user =await getUserByUserNameAndPasswordService(username, password)
            let token = jwt.sign(user, 'thisIsASecret', {expiresIn: '1h'})
            res.header('Authorization', `Bearer ${token}`)
            // req.session.user = user
            res.json(user)
       } catch(e) {
           next(e)
       }
    }
})

//logout
app.delete("/logout", async (req: any, res: Response, next: NextFunction)=>{
    if (!req.user) {
        next(new NoUserLoggedInError())
    } else {
        try {
            req.user = null
            res.json(req.user)
        } catch(e) {
            next(e)
        }
    }
})

//error handler we wrote that express redirects top level errors to
app.use((err, req, res, next) => {  
    if (err.statusCode) { 
        console.log(err);
        res.status(err.statusCode).send(err.message)
    } else { //if it wasn't one of our custom errors, send generic response
        console.log(err); 
        res.status(500).send("Oops, something went wrong")
    }
})

app.listen(2007, () => { //start server on port 2007
    console.log("Server has started");
})