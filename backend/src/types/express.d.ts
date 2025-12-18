import { JwtPayload } from "jsonwebtoken";
import { jwtPayloadTypes } from "./jwtPayloadTypes"
declare global {
    namespace Express {
        interface Request {
            user?: jwtPayloadTypes; 
        }
    }
}

export {};
