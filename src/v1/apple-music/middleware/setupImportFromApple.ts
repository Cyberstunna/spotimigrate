import { NextFunction, Request, Response } from "express"
import {InternalError} from "../../../helpers/errors"
import { User } from "../../../models/user"
import { db } from "../../../db/config"

export const setupImportFromApple = async (req:Request, res:Response, next:NextFunction) => {
    try {
        await db.sequelize.models.users.create()
        res.json(typeof(User))
        
    } catch (error) {
        next(new InternalError(`Something Unexpected occurred: ${error}`))
    }
}