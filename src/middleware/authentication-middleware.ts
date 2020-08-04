
import { Response, NextFunction } from "express";

export function authenticationMiddleware (req:any, res:Response, next:NextFunction){
    if (!req.user){
        res.status(401).send('Please login') //could be a custom error
    } else {
        console.log(`User ${req.user.username} has a role of ${req.user.role}`);
        next()
    }
}
