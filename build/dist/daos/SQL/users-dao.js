"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveNewUser = exports.getUserByUsernameAndPassword = exports.updateUser = exports.findUsersById = exports.getAllUsers = void 0;
const _1 = require(".");
const UserDTO_to_Users_converter_1 = require("../../utilities/UserDTO-to-Users-converter");
const User_Not_Found_Error_1 = require("../../errors/User-Not-Found-Error");
const Authentification_Failure_1 = require("../../errors/Authentification-Failure");
function getAllUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        //first, decleare a client
        let client;
        try {
            //get connection
            client = yield _1.connectionPool.connect();
            //send query
            let results = yield client.query(`select * from project_2.users u;`);
            //return results
            return results.rows.map(UserDTO_to_Users_converter_1.UserDTOtoUserConverter);
        }
        catch (e) {
            //if we get an error we don't know
            console.log(e);
            throw new Error("This error can't be handled, like the way the ring can't be handled by anyone but Frodo");
        }
        finally {
            //let the connection go back to the pool
            client && client.release();
        }
    });
}
exports.getAllUsers = getAllUsers;
//find users by id
function findUsersById(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        let client;
        try {
            client = yield _1.connectionPool.connect();
            let results = yield client.query(`select * from project_2.users u 
                                                    where u.user_id = $1;`, [userId]);
            if (results.rowCount === 0) {
                throw new Error('NotFound');
            }
            else {
                return UserDTO_to_Users_converter_1.UserDTOtoUserConverter(results.rows[0]);
            }
        }
        catch (e) {
            if (e.message === "NotFound") {
                throw new User_Not_Found_Error_1.UserNotFoundError;
            }
            console.log(e);
            throw new Error("This error can't be handled, like the way the ring can't be handled by anyone but Frodo");
        }
        finally {
            client && client.release();
        }
    });
}
exports.findUsersById = findUsersById;
//update a user info
function updateUser(updatedUser) {
    return __awaiter(this, void 0, void 0, function* () {
        let client;
        try {
            client = yield _1.connectionPool.connect();
            yield client.query('BEGIN;'); //start transaction
            if (updatedUser.username) {
                yield client.query(`update project_2.users set "username" = $1 where user_id = $2;`, [updatedUser.username, updatedUser.userId]);
            }
            if (updatedUser.password) {
                yield client.query(`update project_2.users set "password" = $1 where user_id = $2;`, [updatedUser.password, updatedUser.userId]);
            }
            if (updatedUser.firstName) {
                yield client.query(`update project_2.users set "first_name" = $1 where user_id = $2;`, [updatedUser.firstName, updatedUser.userId]);
            }
            if (updatedUser.lastName) {
                yield client.query(`update project_2.users set "last_name" = $1 where user_id = $2;`, [updatedUser.lastName, updatedUser.userId]);
            }
            if (updatedUser.email) {
                yield client.query(`update project_2.users set "email" = $1 where user_id = $2;`, [updatedUser.email, updatedUser.userId]);
            }
            if (updatedUser.affiliation) {
                yield client.query(`update project_2.users set "affiliation" = $1 where user_id = $2;`, [updatedUser.affiliation, updatedUser.userId]);
            }
            if (updatedUser.placesVisited) {
                yield client.query(`update project_2.users set "places_visited" = $1 where user_id = $2;`, [updatedUser.placesVisited, updatedUser.userId]);
            }
            if (updatedUser.address) {
                yield client.query(`update project_2.users set "address" = $1 where user_id = $2;`, [updatedUser.address, updatedUser.userId]);
            }
            if (updatedUser.role) { //figure out what you're doing for this...
                yield client.query(`update project_2.users set "role" = $1 where user_id = $2;`, [updatedUser.role, updatedUser.userId]);
            }
            if (updatedUser.image) { //figure out what you're doing for this...
                yield client.query(`update project_2.users set "image" = $1 where user_id = $2;`, [updatedUser.image, updatedUser.userId]);
            }
            yield client.query('COMMIT;'); //end transaction
            return findUsersById(updatedUser.userId);
        }
        catch (e) {
            client && client.query('ROLLBACK;'); //if a js error takes place, send it back
            console.log(e);
            throw new Error("This error can't be handled, like the way the ring can't be handled by anyone but Frodo");
        }
        finally {
            client && client.release();
        }
    });
}
exports.updateUser = updateUser;
//For login
function getUserByUsernameAndPassword(username, password) {
    return __awaiter(this, void 0, void 0, function* () {
        let client;
        try {
            client = yield _1.connectionPool.connect();
            let results = yield client.query(`select * from project_2.users u 
                                                    where u."username" = $1 and u."password" = $2;`, [username, password]);
            if (results.rowCount === 0) {
                throw new Error("NotFound");
            }
            return UserDTO_to_Users_converter_1.UserDTOtoUserConverter(results.rows[0]);
        }
        catch (e) {
            if (e.message === "NotFound") {
                throw new Authentification_Failure_1.AuthFailureError;
            }
            console.log(e);
            throw new Error("This error can't be handled, like the way the ring can't be handled by anyone but Frodo");
        }
        finally {
            client && client.release();
        }
    });
}
exports.getUserByUsernameAndPassword = getUserByUsernameAndPassword;
//Register a new user
function saveNewUser(newUser) {
    return __awaiter(this, void 0, void 0, function* () {
        let client;
        try {
            client = yield _1.connectionPool.connect();
            let results = yield client.query(`insert into project_2.users ("username", "password", "first_name", "last_name", "email", "affiliation", "places_visited", "address", "role", "image")
                                            values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) returning user_id`, [newUser.username, newUser.password, newUser.firstName, newUser.lastName,
                newUser.email, newUser.affiliation, newUser.placesVisited, newUser.address,
                newUser.role, newUser.image]);
            newUser.userId = results.rows[0].user_id;
            console.log(newUser);
            return newUser;
        }
        catch (e) {
            console.log(e);
            throw new Error("This error can't be handled, like the way the ring can't be handled by anyone but Frodo");
        }
        finally {
            client && client.release();
        }
    });
}
exports.saveNewUser = saveNewUser;
//# sourceMappingURL=users-dao.js.map