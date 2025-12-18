import { Router } from "express";
import { verifyToken } from "../middlewares/authMiddleware";
import { addRowTaskUser, deleteRowTaskUser, editRowTaskUser, getAllTaskUser } from "../controllers/tasksController";

const router = Router();

router.get("/", verifyToken , getAllTaskUser); // user id
router.post("/", verifyToken , addRowTaskUser);
router.patch("/:id", verifyToken , editRowTaskUser); // task id
router.delete("/:id", verifyToken , deleteRowTaskUser); // task id

export default router;
