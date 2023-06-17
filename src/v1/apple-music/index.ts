import express, { Express, Request, Response, RouterOptions } from "express";

const router = express.Router()

router.post("/",
// Validate that the url submitted is an apple music playlist url

// Preliminary database entries to setup our user and playlist import

// Process the playlist url

// Send a response

);

router.get("/test", (req: Request, res: Response)=> {
    res.send("Hi from Apple")
})

export default router;