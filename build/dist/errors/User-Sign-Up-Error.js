"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSignUpError = void 0;
const Http_Error_1 = require("./Http-Error");
//for when trying to sign up
class UserSignUpError extends Http_Error_1.HttpError {
    constructor() {
        super(400, `Please provide a username, password, email, and affiliation`);
    }
}
exports.UserSignUpError = UserSignUpError;
//# sourceMappingURL=User-Sign-Up-Error.js.map