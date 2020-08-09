import { User } from "../models/User";
import { updatedUserTopic } from "../messaging";
import { customExpressEvents, expressEventEmitter } from ".";
import { logger, errorLogger } from "../utilities/loggers";

//custom event listener that will fire when someone emits a New User Event
//by default, event listeners fire in order and synchronously

//this sends use objects that let us know what has been updated so far, but always sends userId, role, and username
expressEventEmitter.on(customExpressEvents.UPDATED_USER, (updatedUser: User) =>{
    logger.debug("and I Raaaan");
    
    setImmediate(async ()=>{
        try {  
            let updatedUserInfo:User = {
                userId : updatedUser.userId,
                username : updatedUser.username,
                role : updatedUser.role,
                email : updatedUser.email,
                placesVisited : updatedUser.placesVisited,
                password : "Not updated",
                firstName : "Not updated",
                lastName : "Not updated",
                affiliation : "Not updated",
                address : "Not updated",
                image : "Not updated"
            }
            if (updatedUser.password){
                updatedUserInfo.password = updatedUser.password
            }   
            if (updatedUser.firstName){
                updatedUserInfo.firstName = updatedUser.firstName
            }   
            if (updatedUser.lastName){
                updatedUserInfo.lastName = updatedUser.lastName
            }   
            if (updatedUser.affiliation){
                updatedUserInfo.affiliation = updatedUser.affiliation
            }     
            if (updatedUser.address){
                updatedUserInfo.address = updatedUser.address
            }   
            if (updatedUser.image){
                updatedUserInfo.image = updatedUser.image
            }     
            
            
            let res = await updatedUserTopic.publishJSON(updatedUserInfo) 
            //publishJSON is specifically buffering JSON for you
            //subscriptions always return message data in the form of a buffer,soooooooo..... look at documentation
            logger.debug(res)
        } catch(e){
            errorLogger.error(e);
            logger.error(e)  
        }
    })
})
