import { User } from "../models/User";
import { newUserTopic } from "../messaging";
import { customExpressEvents, expressEventEmitter } from ".";
import { logger, errorLogger } from "../utilities/loggers";

//custom event listener that will fire when someone emits a New User Event
//by default, event listeners fire in order and synchronously
expressEventEmitter.on(customExpressEvents.NEW_USER, (newUser: User) =>{
    logger.debug("and I Raaaan");
    
    //setImmediate allows us to resolve the contianed function asynchronously (instead of default of synchronous)
    setImmediate(async ()=>{
        try {  
            let res = await newUserTopic.publishJSON(newUser) 
            //publishJSON is specifically buffering JSON for you
            //subscriptions always return message data in the form of a buffer,soooooooo..... look at documentation
            logger.debug(`pub sub message id:  ${res}`)
        } catch(e){
            logger.error(e);  
            errorLogger.error(e)
        }
    })
})

//can create multiple (sending password reset link, sending to marketting, etc.)
//expressEventEmitter.on(customExpressEvents.NEW_USER, (newUser: User) =>{}
