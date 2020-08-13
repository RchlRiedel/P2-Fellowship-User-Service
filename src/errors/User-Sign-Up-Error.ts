
import { HttpError } from "./Http-Error";

//for when trying to sign up

export class UserSignUpError extends HttpError {
    constructor (){
        super (400, `Please provide a username, password, first name, email, and affiliation`)
    }
}