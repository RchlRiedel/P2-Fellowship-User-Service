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
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserService = exports.saveNewUserService = exports.getUserByUserNameAndPasswordService = exports.getUserByIDService = exports.getAllUsersService = void 0;
const user_images_1 = require("../daos/Cloud-Storage/user-images");
const Cloud_Storage_1 = require("../daos/Cloud-Storage");
const event_listeners_1 = require("../event-listeners");
const users_dao_1 = require("../daos/SQL/users-dao");
//the most basic service function you will see (all it does is call the dao)
//its easier to expand a function that already exists instead of inserting a new function in to the mix
//(easier to edit it later)
function getAllUsersService() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield users_dao_1.getAllUsers();
    });
} //not currently actually using this, just an example
exports.getAllUsersService = getAllUsersService;
function getUserByIDService(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield users_dao_1.findUsersById(id);
    });
}
exports.getUserByIDService = getUserByIDService;
function getUserByUserNameAndPasswordService(username, password) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield users_dao_1.getUserByUsernameAndPassword(username, password);
    });
}
exports.getUserByUserNameAndPasswordService = getUserByUserNameAndPasswordService;
function saveNewUserService(newUser) {
    return __awaiter(this, void 0, void 0, function* () {
        //two major process to manage in this function
        try {
            if (newUser.image) { //avoid splitting a void string!
                let base64Image = newUser.image;
                let [dataType, imageBase64Data] = base64Image.split(';base64,'); // gets us the two important parts of the base 64 string
                //we need to make sure picture is in the right format
                let contentType = dataType.split('/').pop();
                //then the pop method gets us the last thing in the array
                newUser.image = `${Cloud_Storage_1.bucketBaseUrl}/LOTR_Profiles/${newUser.username}.${contentType}`;
                //we need to add the picture path to the user data in the sql database        
                //we need to save new user data to the sql database
                //we need to save a picture to cloud storage 
                yield user_images_1.saveProfilePicture(contentType, imageBase64Data, `LOTR_Profiles/${newUser.username}.${contentType}`);
                //spaces are ok in usernames (for file path) :D
            }
            let savedUser = yield users_dao_1.saveNewUser(newUser);
            event_listeners_1.expressEventEmitter.emit(event_listeners_1.customExpressEvents.NEW_USER, newUser);
            //with event driven design after I completed the save a user process
            //send an event saying tis done with the relevent info
            // (aka) send an event with relevant info, telling us we are done saving new user (only to internal server pieces)
            return savedUser;
        }
        catch (e) {
            console.log(e);
            throw e;
        }
        //if we can't save the user in the db, don't save the picture
        //if we do save the user and the picture save fails - pretend that nothing happened ( you should probably update the user to set the image to null)
    });
}
exports.saveNewUserService = saveNewUserService;
function updateUserService(updatedUser) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (updatedUser.image) {
                //essentially the above, but we are switching the dao fucntion and the input
                let base64Image = updatedUser.image;
                let [dataType, imageBase64Data] = base64Image.split(';base64,');
                let contentType = dataType.split('/').pop();
                updatedUser.image = `${Cloud_Storage_1.bucketBaseUrl}/LOTR_Profiles/${updatedUser.username}.${contentType}`;
                yield user_images_1.saveProfilePicture(contentType, imageBase64Data, `LOTR_Profiles/${updatedUser.username}.${contentType}`);
            }
            let savedUser = yield users_dao_1.updateUser(updatedUser);
            console.log(updatedUser);
            event_listeners_1.expressEventEmitter.emit(event_listeners_1.customExpressEvents.UPDATED_USER, updatedUser);
            return savedUser;
        }
        catch (e) {
            console.log(e);
            throw e;
        }
    });
}
exports.updateUserService = updateUserService;
//# sourceMappingURL=user-service.js.map