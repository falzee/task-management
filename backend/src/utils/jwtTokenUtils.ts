import jwt from "jsonwebtoken";

export const generateNewJWTToken = (payload: any) => {
    return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: "1d" });
};

export const verifyJWTToken = (token: string) => {
    return jwt.verify(token, process.env.JWT_SECRET!);
};
