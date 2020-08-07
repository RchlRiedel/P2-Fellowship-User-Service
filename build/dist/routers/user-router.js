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
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const authentication_middleware_1 = require("../middleware/authentication-middleware");
const authorization_middleware_1 = require("../middleware/authorization-middleware");
const User_Id_Number_Needed_Error_1 = require("../errors/User-Id-Number-Needed-Error");
const user_service_1 = require("../services/user-service");
const users_dao_1 = require("../daos/SQL/users-dao");
exports.userRouter = express_1.default.Router();
//Use login
exports.userRouter.use(authentication_middleware_1.authenticationMiddleware);
//Find Users for admin                                 
exports.userRouter.get("/", authorization_middleware_1.authorizationMiddleware(["Admin"], false), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let allUsers = yield user_service_1.getAllUsersService();
        res.json(allUsers);
    }
    catch (e) {
        next(e);
    }
}));
//Find user by id
exports.userRouter.get("/:userId", authorization_middleware_1.authorizationMiddleware(["Admin"], true), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let { userId } = req.params;
    if (isNaN(+userId)) {
        next(new User_Id_Number_Needed_Error_1.UserIdNumberNeededError);
    }
    else {
        try {
            let user = yield user_service_1.getUserByIDService(+userId);
            res.json(user);
        }
        catch (e) {
            next(e);
        }
    }
}));
//Update user
exports.userRouter.patch("/update/profile/:userId", authorization_middleware_1.authorizationMiddleware(["User", "Admin"], true), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let { userId } = req.params;
    let { username, password, firstName, lastName, affiliation, address, email, image } = req.body;
    let currentUserId = +userId;
    if (!currentUserId || isNaN(+currentUserId)) {
        next(new User_Id_Number_Needed_Error_1.UserIdNumberNeededError);
    }
    else {
        let updatedUser = {
            userId: currentUserId,
            username,
            password,
            firstName,
            lastName,
            affiliation,
            placesVisited: (yield user_service_1.getUserByIDService(currentUserId)).placesVisited,
            //no one should have power to change this; it does so automatically when updating location
            address,
            email,
            role: "User",
            //check to make sure that if admin updates their profile, they use the other one (control with links in nav bar?)
            image
        };
        updatedUser.username = username || undefined;
        updatedUser.password = password || undefined;
        updatedUser.firstName = firstName || undefined;
        updatedUser.lastName = lastName || undefined;
        updatedUser.affiliation = affiliation || undefined;
        updatedUser.address = address || undefined;
        updatedUser.email = email || undefined;
        updatedUser.image = image || undefined;
        try {
            let updatedUserResults = yield user_service_1.updateUserService(updatedUser);
            res.json(updatedUserResults);
        }
        catch (e) {
            next;
        }
    }
}));
//Update user FOR ADMIN
exports.userRouter.patch("/update/:userId", authorization_middleware_1.authorizationMiddleware(["Admin"], false), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let { userId } = req.params;
    let { username, password, firstName, lastName, affiliation, address, email, role, image } = req.body;
    let currentUserId = +userId;
    if (!currentUserId || isNaN(+currentUserId)) {
        next(new User_Id_Number_Needed_Error_1.UserIdNumberNeededError);
    }
    else {
        let updatedUser = {
            userId: currentUserId,
            username,
            password,
            //set up function so they know what their username and password was changed to?
            firstName,
            lastName,
            affiliation,
            placesVisited: (yield users_dao_1.findUsersById(currentUserId)).placesVisited,
            address,
            email,
            role,
            image
        };
        updatedUser.username = username || undefined;
        updatedUser.password = password || undefined;
        updatedUser.firstName = firstName || undefined;
        updatedUser.lastName = lastName || undefined;
        updatedUser.affiliation = affiliation || undefined;
        updatedUser.address = address || undefined;
        updatedUser.email = email || undefined;
        updatedUser.role = role || undefined;
        updatedUser.image = image || undefined;
        try {
            let updatedUserResults = yield user_service_1.updateUserService(updatedUser);
            res.json(updatedUserResults);
        }
        catch (e) {
            next;
        }
    }
}));
//# sourceMappingURL=user-router.js.map