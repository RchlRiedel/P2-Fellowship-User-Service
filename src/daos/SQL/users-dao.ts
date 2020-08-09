import { PoolClient, QueryResult } from "pg";
import { connectionPool } from ".";
import { UserDTOtoUserConverter } from "../../utilities/UserDTO-to-Users-converter";
import { User } from "../../models/User";
import { UserNotFoundError } from "../../errors/User-Not-Found-Error";
import { AuthFailureError } from "../../errors/Authentification-Failure";
import { logger, errorLogger } from "../../utilities/loggers";

const schema = process.env['P2_SCHEMA'] || 'project_2_user_service'

export async function getAllUsers(): Promise<User[]>{
    //first, decleare a client
    let client:PoolClient
    try {
        //get connection
        client = await connectionPool.connect()
        //send query
        let results = await client.query(`select * from ${schema}.users u;`)
        //return results
        return results.rows.map(UserDTOtoUserConverter)
    } catch(e) {
        //if we get an error we don't know
        logger.error(e);
        errorLogger.error(e)
        throw new Error ("This error can't be handled, like the way the ring can't be handled by anyone but Frodo")
    } finally {
        //let the connection go back to the pool
        client && client.release()
    }
}

//find users by id
export async function findUsersById (userId: number): Promise<User> {
    let client: PoolClient 
    try{ 
        client = await connectionPool.connect()
        let results: QueryResult = await client.query(`select * from ${schema}.users u 
                                                    where u.user_id = $1;`, [userId])
        if (results.rowCount === 0){
            throw new Error('NotFound')
        } else {
            return UserDTOtoUserConverter(results.rows[0])
        }
    } catch(e) {
        if (e.message === "NotFound"){
            throw new UserNotFoundError
        }
        logger.error(e);
        errorLogger.error(e)
        throw new Error ("This error can't be handled, like the way the ring can't be handled by anyone but Frodo")
    } finally { 
        client && client.release()
    }
}

//update a user info (works for admin or not))
export async function updateUser (updatedUser:User): Promise <User> {
    let client: PoolClient

    try {
        client = await connectionPool.connect()
        await client.query('BEGIN;') //start transaction

        if (updatedUser.username){
            await client.query(`update ${schema}.users set "username" = $1 where user_id = $2;`,
                                [updatedUser.username, updatedUser.userId])
        }
        if (updatedUser.password){
            await client.query(`update ${schema}.users set "password" = $1 where user_id = $2;`,
                                [updatedUser.password, updatedUser.userId])
        } 
        if (updatedUser.firstName){
            await client.query(`update ${schema}.users set "first_name" = $1 where user_id = $2;`,
                                [updatedUser.firstName, updatedUser.userId])
        } 
        if (updatedUser.lastName){
            await client.query(`update ${schema}.users set "last_name" = $1 where user_id = $2;`,
                                [updatedUser.lastName, updatedUser.userId])
        } 
        if (updatedUser.email){
            await client.query(`update ${schema}.users set "email" = $1 where user_id = $2;`,
                                [updatedUser.email, updatedUser.userId])
        }
        if (updatedUser.affiliation){
            await client.query(`update ${schema}.users set "affiliation" = $1 where user_id = $2;`,
                                [updatedUser.affiliation, updatedUser.userId])
        }
        if (updatedUser.placesVisited){
            await client.query(`update ${schema}.users set "places_visited" = $1 where user_id = $2;`,
                                [updatedUser.placesVisited, updatedUser.userId])
        }
        if (updatedUser.address){
            await client.query(`update ${schema}.users set "address" = $1 where user_id = $2;`,
                                [updatedUser.address, updatedUser.userId])
        }
        if (updatedUser.role){ //figure out what you're doing for this...
            await client.query(`update ${schema}.users set "role" = $1 where user_id = $2;`,
            [updatedUser.role, updatedUser.userId])
        }
        if (updatedUser.image){ //figure out what you're doing for this...
            await client.query(`update ${schema}.users set "image" = $1 where user_id = $2;`,
            [updatedUser.image, updatedUser.userId])
        }

        await client.query('COMMIT;') //end transaction
        return findUsersById(updatedUser.userId)

    } catch(e) {
        client && client.query('ROLLBACK;') //if a js error takes place, send it back
        logger.error(e);
        errorLogger.error(e)
        throw new Error ("This error can't be handled, like the way the ring can't be handled by anyone but Frodo")
    } finally {
        client && client.release()
    }
}

//For login
export async function getUserByUsernameAndPassword (username:String, password:String): Promise<User>{
    let client: PoolClient 
    try{ 
        client = await connectionPool.connect()
        let results: QueryResult = await client.query(`select * from ${schema}.users u 
                                                    where u."username" = $1 and u."password" = $2;`, [username, password])      
        if (results.rowCount === 0){
            throw new Error("NotFound")
        } 
        return UserDTOtoUserConverter(results.rows[0]) 
    } catch(e) {
        if (e.message === "NotFound"){
            throw new AuthFailureError
        }
        logger.error(e);
        errorLogger.error(e)
        throw new Error ("This error can't be handled, like the way the ring can't be handled by anyone but Frodo")
    } finally { 
        client && client.release()
    }
}

//Register a new user
export async function saveNewUser(newUser: User): Promise <User> {
    let client: PoolClient

    try{
        client = await connectionPool.connect()
        let results = await client.query(`insert into ${schema}.users ("username", "password", "first_name", "last_name", "email", "affiliation", "places_visited", "address", "role", "image")
                                            values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) returning user_id`, 
                                            [newUser.username, newUser.password, newUser.firstName, newUser.lastName, 
                                            newUser.email, newUser.affiliation, newUser.placesVisited, newUser.address,
                                            newUser.role, newUser.image])
        
        newUser.userId = results.rows[0].user_id    
        logger.info(newUser);
        return newUser   
    } catch(e) {       
        logger.error(e);
        errorLogger.error(e)
        throw new Error ("This error can't be handled, like the way the ring can't be handled by anyone but Frodo")
    } finally {
        client && client.release()
    }
}