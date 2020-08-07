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
_1.expressEventEmitter.on(_1.customExpressEvents.NEW_USER, (newUser) => {
    console.log("and I Raaaan");
    //setImmediate allows us to resolve the contianed function asynchronously (instead of default of synchronous)
    setImmediate(() => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let res = yield messaging_1.newUserTopic.publishJSON(newUser);
            //publishJSON is specifically buffering JSON for you
            //subscriptions always return message data in the form of a buffer,soooooooo..... look at documentation
            console.log(res);
        }
        catch (e) {
            console.log(e);
        }
    }));
});
//can create multiple (sending password reset link, sending to marketting, etc.)
//expressEventEmitter.on(customExpressEvents.NEW_USER, (newUser: User) =>{}
//# sourceMappingURL=new-user.js.map