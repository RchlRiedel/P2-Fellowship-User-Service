"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserIdNumberNeededError = void 0;
const Http_Error_1 = require("./Http-Error");
//for when trying to retrieve user information by id number
class UserIdNumberNeededError extends Http_Error_1.HttpError {
    constructor() {
        let num = "number";
        super(400, `Please provide an id ${num.italics()}`);
    }
}
exports.UserIdNumberNeededError = UserIdNumberNeededError;
//# sourceMappingURL=User-Id-Number-Needed-Error.js.map