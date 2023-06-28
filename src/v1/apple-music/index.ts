import express, { Express, Request, Response, RouterOptions } from "express";
import {validateImportFromApple} from "./validation/validateImportFromApple";
import { setupImportFromApple } from "./middleware/setupImportFromApple";
import { isAuthenticated } from "../globalMiddleware/isAuthenticated";

const router = express.Router()

router.post("/",
// Validate that the url submitted is an apple music playlist url
    validateImportFromApple,
// Preliminary database entries to setup our user and playlist import
    setupImportFromApple
);

router.post("/complete-import",
    isAuthenticated
);

router.get("/test", (req: Request, res: Response)=> {
    res.send("Hi from Apple")
})

export default router;