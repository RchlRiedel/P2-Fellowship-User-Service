import { Response, NextFunction } from "express";
import { logger } from "../utilities/loggers";

export  function authenticationMiddleware (req:any, res:Response, next:NextFunction){
    if (!req.user){
        res.status(401).send('Please Login') //could be a custom error
    } else {
        console.log(`User ${req.user.username} has a role of ${req.user.role}`);
        logger.debug(`user ${req.user.username} has a role of ${req.user.role}`);
        next()
    }
}
