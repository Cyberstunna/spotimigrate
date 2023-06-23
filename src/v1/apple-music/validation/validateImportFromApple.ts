import { NextFunction, Request, Response } from "express"
import {BadRequest, InternalError} from "../../../helpers/errors"

export interface PlaylistMeta {
    name: string,
    source?: string
    sourceId?: string
}

export interface ExtendedRequest extends Request {
    playlist?: PlaylistMeta;
}

export const validateImportFromApple = async (req:ExtendedRequest, res:Response, next:NextFunction) => {
    try {
        const {url}: {url: string} = req.body;
        const appleMusicSubstring: string = "https://music.apple.com";
        const playlistInfo = url.split("/").slice(4, url.length - 1)

        if(!url){
            return next(new BadRequest("URL is required."))
        }

        if(playlistInfo.length < 3 || playlistInfo[0] != "playlist") {
            return next(new BadRequest("Apple Music URL is incomplete."))
        }

        if(!url.startsWith(appleMusicSubstring)){
            return next(new BadRequest("URL is not an Apple Music Playlist."))
        }

        let playlist: PlaylistMeta = {
            name: playlistInfo[1],
        }

        req.playlist = playlist

        return next()    
        
    } catch (error) {
        next(new InternalError(`Something Unexpected occurred: ${error}`))
    }
}