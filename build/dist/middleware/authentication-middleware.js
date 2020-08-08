"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticationMiddleware = void 0;
const loggers_1 = require("../utilities/loggers");
function authenticationMiddleware(req, res, next) {
    if (!req.user) {
        res.status(401).send('Please Login'); //could be a custom error
    }
    else {
        console.log(`User ${req.user.username} has a role of ${req.user.role}`);
        loggers_1.logger.debug(`user ${req.user.username} has a role of ${req.user.role}`);
        next();
    }
}
exports.authenticationMiddleware = authenticationMiddleware;
//# sourceMappingURL=authentication-middleware.js.map