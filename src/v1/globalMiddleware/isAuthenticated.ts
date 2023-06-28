import { BadRequest, InternalError, Unauthorized } from "../../helpers/errors";
import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken"
import dotenv from "dotenv";
import { User } from "../../models/user";

dotenv.config();

export async function isAuthenticated(req: Request, res: Response, next: NextFunction){
    try {
        if(!req.headers.authorization){
            next(new Unauthorized(`You must be Authenticated to access this endpoint.`))
        }

        const token = req.headers.authorization?.split(" ")[1]

        const tokenIsValid = jwt.verify(`${token}`, `${process.env.JWT_SECRET}`);

        if(Date.now() > ((tokenIsValid as JwtPayload).exp as number)){
            next(new BadRequest("Your token is expired."))
        }

        const user = User.findByPk((tokenIsValid as JwtPayload).id)

        if(!user){
            next(new BadRequest("User does not exist."))
        }

        
    } catch (error: any) {
        next(new InternalError(`Something Unexpected occurred: ${error.message}`))
    }
}