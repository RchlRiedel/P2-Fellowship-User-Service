"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWTVerifyMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const loggers_1 = require("../utilities/loggers");
exports.JWTVerifyMiddleware = (req, res, Next) => {
    var _a, _b;
    try {
        // ?. operator is really just short hand for the guard operator
        // req.headers.authorization && req.headers.authorization.split(' ').pop()
        let token = (_b = (_a = req === null || req === void 0 ? void 0 : req.headers) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.split(' ').pop(); //turn the string Bearer token -> token
        if (token) {
            req.user = jsonwebtoken_1.default.verify(token, 'thisIsASecret');
        }
        Next(); //no token and no req.user
        //other validation middleware will catch it
    }
    catch (e) {
        console.log(e);
        loggers_1.logger.error(e);
        loggers_1.errorLogger.error(e);
        Next(e);
    }
};
//# sourceMappingURL=jwt-verify-middleware.js.map