import express, { Express, Request, Response, RouterOptions } from "express";
import {validateImportFromApple} from "./validation/validateImportFromApple";
import { setupImportFromApple } from "./middleware/setupImportFromApple";

const router = express.Router()

router.post("/",
// Validate that the url submitted is an apple music playlist url
    validateImportFromApple,
// Preliminary database entries to setup our user and playlist import
    setupImportFromApple,
// Process the playlist url

// Send a response

);

router.get("/test", (req: Request, res: Response)=> {
    res.send("Hi from Apple")
})

export default router;