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
const messaging_1 = require("../messaging");
const _1 = require(".");
//custom event listener that will fire when someone emits a New User Event
//by default, event listeners fire in order and synchronously
//this sends use objects that let us know what has been updated so far, but always sends userId, role, and username
_1.expressEventEmitter.on(_1.customExpressEvents.UPDATED_USER, (updatedUser) => {
    console.log("and I Raaaan");
    setImmediate(() => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let updatedUserInfo = {
                userId: updatedUser.userId,
                username: updatedUser.username,
                role: updatedUser.role,
                email: updatedUser.email,
                placesVisited: updatedUser.placesVisited,
                password: "Not updated",
                firstName: "Not updated",
                lastName: "Not updated",
                affiliation: "Not updated",
                address: "Not updated",
                image: "Not updated"
            };
            if (updatedUser.password) {
                updatedUserInfo.password = updatedUser.password;
            }
            if (updatedUser.firstName) {
                updatedUserInfo.firstName = updatedUser.firstName;
            }
            if (updatedUser.lastName) {
                updatedUserInfo.lastName = updatedUser.lastName;
            }
            if (updatedUser.affiliation) {
                updatedUserInfo.affiliation = updatedUser.affiliation;
            }
            if (updatedUser.address) {
                updatedUserInfo.address = updatedUser.address;
            }
            if (updatedUser.image) {
                updatedUserInfo.image = updatedUser.image;
            }
            let res = yield messaging_1.updatedUserTopic.publishJSON(updatedUserInfo);
            //publishJSON is specifically buffering JSON for you
            //subscriptions always return message data in the form of a buffer,soooooooo..... look at documentation
            console.log(res);
        }
        catch (e) {
            console.log(e);
        }
    }));
});
//# sourceMappingURL=updated-user.js.map