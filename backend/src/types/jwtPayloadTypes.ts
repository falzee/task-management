// src/types/jwt-payload.ts
import { JwtPayload } from 'jsonwebtoken';

export interface jwtPayloadTypes extends JwtPayload {
    user_id: number;
    username: string;
    name: string;
    email: string;
}