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
const authentification_middleware_1 = require("../middleware/authentification-middleware");
const authorization_middleware_1 = require("../middleware/authorization-middleware");
const User_Id_Number_Needed_Error_1 = require("../errors/User-Id-Number-Needed-Error");
const user_service_1 = require("../services/user-service");
exports.userRouter = express_1.default.Router();
//Use login
exports.userRouter.use(authentification_middleware_1.authentificationMiddleware);
//Find Users                                 
exports.userRouter.get("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let allUsers = yield user_service_1.getAllUsersService();
        res.json(allUsers);
    }
    catch (e) {
        next(e);
    }
}));
//Get user profile information                       I don't think I need anything in this array
//ON SECOND THOUGHT this would be too complicated... maybe later
// userRouter.get("/-profiles", authorizationMiddleware([], true), async (req:Request, res:Response, next:NextFunction)=>{
//     try {
//         let allUserProfiles = await getAllUserProfiles() 
//         res.json(allUserProfiles)
//     } catch(e){
//         next(e)
//     }})
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
exports.userRouter.patch("/update/:userId", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let { userId } = req.params;
    let { username, password, firstName, lastName, affiliation, placesVisited, address, email, role, image } = req.body;
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
            placesVisited,
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
        updatedUser.placesVisited = placesVisited || undefined;
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