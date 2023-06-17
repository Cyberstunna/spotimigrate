"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const apple_music_1 = __importDefault(require("./src/v1/apple-music"));
const tidal_1 = __importDefault(require("./src/v1/tidal"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || "8080";
app.use("/import-from-apple", apple_music_1.default);
app.use("/import-from-tidal", tidal_1.default);
app.get("/", (req, res) => {
    res.send("Hi");
});
app.listen(port, () => {
    console.log(`SpotiMigrate is running on port ${port}`);
});
