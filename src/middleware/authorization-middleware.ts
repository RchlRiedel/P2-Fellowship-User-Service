import { Response, NextFunction } from "express";
import { logger } from "../utilities/loggers";


//same from lightly-burning
export function authorizationMiddleware(roles:string[], currentUser: Boolean){ //get the roles, or check if their id matches

    return (req: any, res:Response, next:NextFunction) =>{
        let allowed = false
            
        for (const role of roles){//to allow a given role
            if (req.user.role === role){
                allowed =true
                logger.debug(`role: ${role}, input role:${req.user.role}`);
            }
        }
        if (currentUser){  //if we are checking for current user
            let id = +req.params.userId //get the id from path
            if (!isNaN(id)){
                if (req.user.userId == id) { //watch for type coersion
                    allowed = true
                }
            }
        }
        if (allowed) { //have to wait to make sure both conditions are checked
            next() 
        } else { 
             //if they don't have a matching role or the right id, kick them out
             res.status(403).send("You have insufficient permissions for this endpoint!")
        }

    }

}

