import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import {db} from "./src/db/config";
import AppleMusicRoutes from "./src/v1/apple-music"
import TidalRoutes from "./src/v1/tidal"
import UserRoutes from "./src/v1/users"

dotenv.config();

const app: Express = express();
const port: string = process.env.PORT || "8080"

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use("/import-from-apple", AppleMusicRoutes)
app.use("/import-from-tidal", TidalRoutes)
app.use("/users", UserRoutes)


app.get("/", (req, res)=> {
    res.send("Hi")
})

app.listen(port, async ()=> {
    await db.sequelize.authenticate()
    .then(()=> {
        console.log("\x1b[36m%s\x1b[0m", "Database connected");
        console.log(`Listening on port: ${port}`);
    })
    .catch((err: Error)=> {
        console.log("Failed to sync db: " + err.message);
    })

})