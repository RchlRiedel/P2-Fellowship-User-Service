"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authentificationMiddleware = void 0;
function authentificationMiddleware(req, res, next) {
    if (!req.session.user) {
        res.status(401).send('Please login'); //could be a custom error
    }
    else {
        console.log(`User ${req.session.user.username} has a role of ${req.session.user.role}`);
        next();
    }
}
exports.authentificationMiddleware = authentificationMiddleware;
//# sourceMappingURL=authentification-middleware.js.map