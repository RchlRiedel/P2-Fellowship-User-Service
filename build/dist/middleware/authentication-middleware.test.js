"use strict";
//same test, but with loggers
Object.defineProperty(exports, "__esModule", { value: true });
const mockRequest = () => {
    return {
        user: undefined
    };
};
const mockResponse = () => {
    let res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);
    return res;
};
const authentication_middleware_1 = require("./authentication-middleware");
const loggers_1 = require("../utilities/loggers");
describe('authenticationMiddleware', () => {
    let req;
    let res;
    let next;
    //runs our setup before each individual test
    beforeEach(() => {
        req = mockRequest();
        res = mockResponse();
        next = jest.fn();
    });
    it('Should not allow someone who is not logged in through', () => {
        //calls the middleware with a non existenent user
        authentication_middleware_1.authenticationMiddleware(req, res, next);
        expect(res.status).toBeCalledWith(401);
        expect(res.send).toBeCalledWith('Please Login');
        expect(next).not.toBeCalled();
    });
    it('Should allow through someone who is logged in', () => {
        req.user = {
            username: 'Mithrandir',
            role: 'Admin'
        };
        loggers_1.logger.debug = jest.fn(); //mock console.log WITH LOGGER
        authentication_middleware_1.authenticationMiddleware(req, res, next);
        expect(res.status).not.toBeCalled();
        expect(res.send).not.toBeCalled();
        expect(next).toBeCalled();
        //expect(logger.debug).toBeCalledWith('user Mithrandir has a role of Admin')
        expect(loggers_1.logger.debug).toBeCalledWith('user Mithrandir has a role of Admin');
    });
});
//# sourceMappingURL=authentication-middleware.test.js.map