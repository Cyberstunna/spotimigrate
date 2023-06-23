import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const SECRET_KEY: Secret = `${process.env.JWT_SECRET}`

export async function generateJwt(id: string) {
    return jwt.sign({id: id}, SECRET_KEY, {expiresIn: "2 days"});
}