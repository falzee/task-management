import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: "No token found" });

    try {
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET!);

        if (typeof decoded === "string") {
            return res.status(401).json({ message: "Invalid token" });
        }

        req.user = decoded;

        if (decoded.exp) {
            const expirationTime = decoded.exp * 1000;
            if (Date.now() > expirationTime) {
                return res.status(401).json({ message: "Token expired" });
            }
        }
        next();
    } catch {
        res.status(401).json({ message: "Invalid token" });
    }
};
