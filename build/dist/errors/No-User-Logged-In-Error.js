"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoUserLoggedInError = void 0;
const Http_Error_1 = require("./Http-Error");
class NoUserLoggedInError extends Http_Error_1.HttpError {
    constructor() {
        super(404, "Must be logged in to log out");
    }
}
exports.NoUserLoggedInError = NoUserLoggedInError;
//# sourceMappingURL=No-User-Logged-In-Error.js.map