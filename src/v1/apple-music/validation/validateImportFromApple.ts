import { NextFunction, Request, Response } from "express"
import {BadRequest, InternalError} from "../../../helpers/errors"

export const validateImportFromApple = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const {url}: {url: string} = req.body;
        const appleMusicSubstring: string = "https://music.apple.com";

        if(!url){
            return next(new BadRequest("URL is required."))
        }

        if(url.startsWith(appleMusicSubstring)){
            return next()
        }

        return next(new BadRequest("URL is not an Apple Music Playlist."))
        
    } catch (error) {
        next(new InternalError(`Something Unexpected occurred: ${error}`))
    }
}