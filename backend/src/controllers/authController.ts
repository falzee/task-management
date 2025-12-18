import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { AppDataSource } from "../AppDataSource";
import { User } from "../entities/User";
import { generateNewJWTToken } from "../utils/jwtTokenUtils";

export const register = async (req: Request, res: Response) => {
    const { name, username, email, password } = req.body;

    if (!name || !username || !email || !password) {
        return res.status(400).json({ success: false, message: "User informations are required!" });
    }

    try{
        const userRepo = AppDataSource.getRepository(User);

        const existingUser = await userRepo.findOne({ 
            where: [
                { username: username },
                { email: email }
            ] 
        });

        // cek user ada atau tidak
        if (existingUser) {
            return res.status(401).json({ success: false, message: "User Already Exists!" });
        }
    
        const hashed = await bcrypt.hash(password, 10);
    
        const user = userRepo.create({
            name,
            username,
            email,
            password: hashed,
        });
    
        await userRepo.save(user);
    
        res.status(201).json({ success: true, message: 'User Created Successfully' });

    } catch (error){
        res.status(500).json({ success: false, message: "Internal Server Error", error });
    }

};

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: "User informations are required!" });
    }
    try{
        const userRepo = AppDataSource.getRepository(User);
        const user = await userRepo.findOne({ where: { email } });

        // cek user apakah eksis
        if (!user) {
            return res.status(401).json({ success: false, message: "User Not Found!" });
        }

        //cek password user
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            return res.status(401).json({ success: false, message: "Invalid credentials!" });
        }

        const token = generateNewJWTToken({ 
            user_id: user.user_id, 
            name: user.name,
            username: user.username,
            email: user.email
        });

        res.status(201).json({ success: true, message: 'User Created Successfully', token: token });
    } catch (error){
        res.status(500).json({ success: false, message: "Internal Server Error", error });
    }
};
