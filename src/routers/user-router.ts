
import express, { Request, Response, NextFunction } from 'express'
import { authenticationMiddleware } from '../middleware/authentication-middleware'
import { authorizationMiddleware } from '../middleware/authorization-middleware'
import { User } from '../models/User'
import { UserIdNumberNeededError } from '../errors/User-Id-Number-Needed-Error'
import { getAllUsersService, getUserByIDService, updateUserService } from '../services/user-service'
import { allUserProfiles, findUsersById } from '../daos/SQL/users-dao'

export const userRouter = express.Router()

//Use login
userRouter.use(authenticationMiddleware)

<<<<<<< HEAD
//Find Users                                 
userRouter.get("/", async (req:Request, res:Response, next:NextFunction)=>{
=======
//Find Users for admin                                 
userRouter.get("/", authorizationMiddleware(["Admin"], false), async (req:Request, res:Response, next:NextFunction)=>{
>>>>>>> master
    try {
        let allUsers = await getAllUsersService() 
        res.json(allUsers)
    } catch(e){
        next(e)
    }
})

//Find Users for users                                              
userRouter.get("/profiles",authorizationMiddleware(["User", "Admin"], true), async (req:Request, res:Response, next:NextFunction)=>{
    try {
        let allUsers2 = await allUserProfiles() 
        res.json(allUsers2)
    } catch(e){
        next(e)
}})
    
//Find user by id
userRouter.get("/:userId",  authorizationMiddleware(["Admin"], true), async (req:Request, res:Response, next:NextFunction)=>{
    let {userId} = req.params
    if(isNaN(+userId)){
        next(new UserIdNumberNeededError)
    } else {
        try {
            let user = await getUserByIDService(+userId)
            res.json(user)
        } catch(e) {
            next(e)
        }
    }
})

//Update user
userRouter.patch("/update/profile/:userId", authorizationMiddleware(["User", "Admin"], true), async (req:Request, res: Response, next:NextFunction) => {
    let {userId} = req.params
    let {username, password, firstName, lastName, affiliation, address, email, image } = req.body
    let currentUserId = +userId
    if (!currentUserId || isNaN(+currentUserId)){
        next (new UserIdNumberNeededError)
    } else { 
        let updatedUser:User = {
            userId: currentUserId,
            username,
            password,
            firstName,
            lastName,
            affiliation,
            placesVisited: (await getUserByIDService(currentUserId)).placesVisited, 
            //no one should have power to change this; it does so automatically when updating location
            address,
            email,
            role: "User", 
            //check to make sure that if admin updates their profile, they use the other one (control with links in nav bar?)
            image 
        }
        updatedUser.username = username || undefined
        updatedUser.password = password || undefined
        updatedUser.firstName = firstName || undefined
        updatedUser.lastName = lastName || undefined
        updatedUser.affiliation = affiliation || undefined
        updatedUser.address = address || undefined
        updatedUser.email = email || undefined
        updatedUser.image = image || undefined
        
        try {
            let updatedUserResults = await updateUserService(updatedUser)
            res.json(updatedUserResults)
        } catch (e) {
            next
        }
    }
})

//Update user FOR ADMIN
userRouter.patch("/update/:userId", authorizationMiddleware(["Admin"], false), async (req:Request, res: Response, next:NextFunction) => {
    let {userId} = req.params
    let {username, password, firstName, lastName, affiliation, address, email, role, image } = req.body
    let currentUserId = +userId
    if (!currentUserId || isNaN(+currentUserId)){
        next (new UserIdNumberNeededError)
    } else { 
        let updatedUser:User = {
            userId: currentUserId,
            username,
            password,
            //set up function so they know what their username and password was changed to?
            firstName,
            lastName,
            affiliation,
            placesVisited: (await findUsersById(currentUserId)).placesVisited,
            address,
            email,
            role,
            image 
        }
        updatedUser.username = username || undefined
        updatedUser.password = password || undefined
        updatedUser.firstName = firstName || undefined
        updatedUser.lastName = lastName || undefined
        updatedUser.affiliation = affiliation || undefined
        updatedUser.address = address || undefined
        updatedUser.email = email || undefined
        updatedUser.role = role || undefined
        updatedUser.image = image || undefined
        
        try {
            let updatedUserResults = await updateUserService(updatedUser)
            res.json(updatedUserResults)
        } catch (e) {
            next
        }
    }
})
