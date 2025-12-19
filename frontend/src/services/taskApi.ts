// services/taskService.ts
import api from "./api";

export type TaskStatus = "todo" | "in_progress" | "done";

export interface Task {
    task_id: number;
    title: string;
    description?: string;
    status: TaskStatus;
    deadline: string;
    created_by: string;
}

export const getTasks = async (): Promise<Task[]> => {
    const res = await api.get("/tasks");
    return res.data.data;
};

export const createTask = async (payload: Partial<Task>) => {
    return api.post("/tasks", payload);
};

export const updateTask = async (id: number, payload: Partial<Task>) => {
    return api.patch(`/tasks/${id}`, payload);
};

export const deleteTask = async (id: number) => {
    return api.delete(`/tasks/${id}`);
};
