"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customExpressEvents = exports.expressEventEmitter = void 0;
const events_1 = require("events");
//EventEmitter = special node js object that holds event listeners and sends event triggers to them
//call emit to send event, and any functions listening to that emitter will be triggered in order
exports.expressEventEmitter = new events_1.EventEmitter();
//defines custom event (so we don't mistype it)
exports.customExpressEvents = {
    NEW_USER: 'NEW_USER',
    UPDATED_USER: 'UPDATED_USER'
};
//call expressEventEmttier.emit(customExpressEvents.NEW_USER, newUser) in user services
//this lets other internal things know it's done with the listener
//# sourceMappingURL=index.js.map