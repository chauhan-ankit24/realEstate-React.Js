import express from "express";
import {
    deleteUser,
    getUser,
    getUsers,
    updateUser,
    savePost,
    profilePosts,
    getNotificationNumber
} from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/", getUsers);
// Move specific routes before parameterized routes
router.get("/profilePosts", verifyToken, profilePosts);
router.get("/notification", verifyToken, getNotificationNumber);
router.get("/:id", getUser);
router.put("/:id", verifyToken, updateUser);
router.delete("/:id", verifyToken, deleteUser);
router.post("/save", verifyToken, savePost);

export default router;
