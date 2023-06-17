import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import AppleMusicRoutes from "./src/v1/apple-music"
import TidalRoutes from "./src/v1/tidal"
import UserRoutes from "./src/v1/users"

dotenv.config();

const app: Express = express();
const port: string = process.env.PORT || "8080"

app.use("/import-from-apple", AppleMusicRoutes)
app.use("/import-from-tidal", TidalRoutes)
app.use("/users", UserRoutes)


app.get("/", (req, res)=> {
    res.send("Hi")
})

app.listen(port, ()=> {
    console.log(`SpotiMigrate is running on port ${port}`)
})