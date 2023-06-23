import { NextFunction, Request, Response } from "express"
import {InternalError} from "../../../helpers/errors"
import { User } from "../../../models/user"
import { Playlist } from "../../../models/playlist"
import { ExtendedRequest } from "../validation/validateImportFromApple"
import { generateJwt } from "../../../helpers/generateJwt"
import { importPlaylist } from "../../../helpers/importPlaylist"
import { preProcessImportsToSpotify } from "../../../helpers/processImportsToSpotify"

export const setupImportFromApple = async (req:ExtendedRequest, res:Response, next:NextFunction) => {
    try {
        const {url}: {url: string} = req.body;
        const newUser = await User.create();

        const playlistToImport = await Playlist.create({
            userId: newUser.id,
            url: url,
            name: req.playlist?.name
        })

        const token = await generateJwt(newUser.id);


        res.json({token})

        preProcessImportsToSpotify(await importPlaylist(playlistToImport.id))

    } catch (error) {
        console.log(error)
        next(new InternalError(`Something Unexpected occurred: ${error}`))
    }
}