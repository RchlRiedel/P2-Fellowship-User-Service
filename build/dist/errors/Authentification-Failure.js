"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthFailureError = void 0;
const Http_Error_1 = require("./Http-Error");
class AuthFailureError extends Http_Error_1.HttpError {
    constructor() {
        super(401, "Incorrect username or password!");
    }
}
exports.AuthFailureError = AuthFailureError;
//# sourceMappingURL=Authentification-Failure.js.map