"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidCredentials = void 0;
const Http_Error_1 = require("./Http-Error");
class InvalidCredentials extends Http_Error_1.HttpError {
    constructor() {
        super(400, "Invalid credentials");
    }
}
exports.InvalidCredentials = InvalidCredentials;
//# sourceMappingURL=Invalid-Credentials.js.map