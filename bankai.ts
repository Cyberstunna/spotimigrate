import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const port: string = process.env.PORT || "8080"

app.listen(port, ()=> {
    console.log(`SpotiMigrate is running on port ${port}`)
})