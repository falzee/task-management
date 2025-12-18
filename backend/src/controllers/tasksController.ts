import { Request, Response } from "express";
import { AppDataSource } from "../AppDataSource";
import { Task, TaskStatus } from "../entities/Task";
import { User } from "../entities/User";

// get - "/" info user middleware bukan param (fetch all data)
// post - "/" info user middleware bukan param (buat 1 row saja)
// patch - "/:id" info user middleware + task id buat param (buat 1 row saja)
// delete - "/:id" info user middleware + task id buat param (buat 1 row saja)
export const getAllTaskUser = async (req: Request, res: Response) => {
    if (!req.user) {
        return res.status(401).json({ success: false, message: "Unauthorized Users!" });
    }

    // dari middleware yang verify token
    const userId = req.user.user_id;

    try{
        const taskRepo = AppDataSource.getRepository(Task);
    
        const tasks = await taskRepo.find({
            where: { user: { user_id: userId } }
        });
    
        res.status(201).json({ success: true, message: 'List Tasks Found!', data:tasks });
    } catch(error){
        res.status(500).json({ success: false, message: "Internal Server Error", error });
    }
};

export const addRowTaskUser = async (req: Request, res: Response) => {
    if (!req.user) {
        return res.status(401).json({ success: false, message: "Unauthorized Users!" });
    }
    const { title, description, status, deadline } = req.body;
    const userId = req.user.user_id;
    const taskCreatedBy = req.user.username; 

    try{
        const taskRepo = AppDataSource.getRepository(Task);
        const userRepo = AppDataSource.getRepository(User); 
        
        if (!title || !deadline) {
            return res.status(400).json({ success: false, message: "Title and deadline are required" });
        }

        const user = await userRepo.findOneBy({ user_id: userId });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const taskData = taskRepo.create({
            title,
            description,
            status: status ?? TaskStatus.TODO,
            deadline: new Date(deadline),
            created_by: taskCreatedBy,
            user,
        });
        
        await taskRepo.save(taskData);

        const filteredData = {
            title: taskData.title,
            description: taskData.description,
            status: taskData.status,
            deadline: taskData.deadline,
            created_by: taskData.created_by,
        }

        res.status(201).json({ success: true, message: 'Task data created successfully!', data:filteredData });
    } catch(error){
        res.status(500).json({ success: false, message: "Internal Server Error", error });
    }

};

export const editRowTaskUser = async (req: Request, res: Response) => {
    if (!req.user) {
        return res.status(401).json({ success: false, message: "Unauthorized Users!" });
    }

    const { id } = req.params;
    const { title, description, status, deadline } = req.body;
    const userId = req.user.user_id;

    try {
        const taskRepo = AppDataSource.getRepository(Task);

        const task = await taskRepo.findOne({
            where: {
                task_id: Number(id),
                user: { user_id: userId },
            },
            relations: ["user"],
        });

        if (!task) {
            return res.status(404).json({ success: false, message: "Task Not Found!" });
        }

        if (title !== undefined) {
            task.title = title;
        }
        if (description !== undefined) {
            task.description = description;
        }
        if (status !== undefined) {
            task.status = status;
        }
        if (deadline !== undefined) {
            task.deadline = new Date(deadline);
        }

        await taskRepo.save(task);

        res.status(200).json({ success: true, message: "Task Row Updated successfully!", data: task });

    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error", error });
    }
};


export const deleteRowTaskUser = async (req: Request, res: Response) => {
    if (!req.user) {
        return res.status(401).json({ success: false, message: "Unauthorized Users!" });
    }
    const { id } = req.params;
    const userId = req.user.user_id;

    try{
        const taskRepo = AppDataSource.getRepository(Task);

        const task = await taskRepo.findOne({
            where: {
                task_id: Number(id),
                user: { user_id: userId },
            },
            relations: ["user"],
        });

        if (!task) {
            return res.status(404).json({ success: false, message: "Task Not Found!" });
        }

        await taskRepo.remove(task);

        res.status(200).json({ success: true, message: "Task Row Deleted successfully!", data: task });


    } catch(error){
        res.status(500).json({ success: false, message: "Internal Server Error", error });
    }
};
