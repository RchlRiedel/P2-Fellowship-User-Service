"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserNotFoundError = void 0;
const Http_Error_1 = require("./Http-Error");
class UserNotFoundError extends Http_Error_1.HttpError {
    constructor() {
        super(404, "User not found.");
    }
}
exports.UserNotFoundError = UserNotFoundError;
//# sourceMappingURL=User-Not-Found-Error.js.map