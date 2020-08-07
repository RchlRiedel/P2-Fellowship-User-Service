"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_router_1 = require("./routers/user-router");
const Invalid_Credentials_1 = require("./errors/Invalid-Credentials");
const User_Sign_Up_Error_1 = require("./errors/User-Sign-Up-Error");
const No_User_Logged_In_Error_1 = require("./errors/No-User-Logged-In-Error");
const logging_middleware_1 = require("./middleware/logging-middleware");
const cors_filter_1 = require("./middleware/cors-filter");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_service_1 = require("./services/user-service");
//import { userTopic } from "./messaging"
require("./event-listeners/new-user"); //so that file will actually excetute 
require("./event-listeners/updated-user"); //try
const jwt_verify_middleware_1 = require("./middleware/jwt-verify-middleware");
//console.log(userTopic); //see what the topic is
const app = express_1.default(); //our application from express
app.use(express_1.default.json({ limit: '50mb' }));
//need to increase max size of body we can parse, in order to allow for images
app.use(logging_middleware_1.loggingMiddleware);
app.use(cors_filter_1.corsFilter);
app.use(jwt_verify_middleware_1.JWTVerifyMiddleware);
app.use("/users", user_router_1.userRouter);
//health check! for load balancer 
app.get('/health', (req, res) => {
    res.sendStatus(200);
});
//Save a new user (here to avoid authentification)
app.post("/register", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    let { username, password, firstName, lastName, affiliation, address, email, image } = req.body;
    if (!username || !password || !firstName || !affiliation || !email) {
        next(new User_Sign_Up_Error_1.UserSignUpError);
    }
    else {
        let newUser = {
            userId: 0,
            username,
            password,
            firstName,
            lastName,
            affiliation,
            placesVisited: 0,
            address,
            email,
            role: 'User',
            image
        };
        newUser.lastName = lastName || null;
        newUser.address = address || null;
        newUser.image = image || null;
        try {
            let savedUser = yield user_service_1.saveNewUserService(newUser); //using service function instead of DAO
            let token = jsonwebtoken_1.default.sign(savedUser, 'thisIsASecret', { expiresIn: '1h' });
            res.header('Authorization', `Bearer ${token}`);
            req.user = savedUser; //set user to current, new user
            res.json(savedUser);
        }
        catch (e) {
            next(e);
        }
    }
}));
//login
app.post("/login", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let { username, password } = req.body;
    if (!username || !password) {
        next(new Invalid_Credentials_1.InvalidCredentials());
    }
    else {
        try {
            let user = yield user_service_1.getUserByUserNameAndPasswordService(username, password);
            let token = jsonwebtoken_1.default.sign(user, 'thisIsASecret', { expiresIn: '1h' });
            res.header('Authorization', `Bearer ${token}`);
            // req.session.user = user
            console.log(req.user);
            console.log(token);
            res.json(user);
        }
        catch (e) {
            next(e);
        }
    }
}));
//logout
app.delete("/logout", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        next(new No_User_Logged_In_Error_1.NoUserLoggedInError());
    }
    else {
        try {
            req.user = null;
            res.json(req.user);
        }
        catch (e) {
            next(e);
        }
    }
}));
//error handler we wrote that express redirects top level errors to
app.use((err, req, res, next) => {
    if (err.statusCode) {
        console.log(err);
        res.status(err.statusCode).send(err.message);
    }
    else { //if it wasn't one of our custom errors, send generic response
        console.log(err);
        res.status(500).send("Oops, something went wrong");
    }
});
app.listen(2007, () => {
    console.log("Server has started");
});
//# sourceMappingURL=index.js.map