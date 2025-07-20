import express from "express";
import {
  deleteUser,
  getUser,
  getUsers,
  updateUser,
  savePost,
  profilePosts,
  getNotificationNumber,
} from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/", getUsers);

// router.get("/profilePosts", verifyToken, profilePosts);
// router.get("/notification", verifyToken, getNotificationNumber);
// router.get("/:id", getUser);
// router.put("/:id", verifyToken, updateUser);
// router.delete("/:id", verifyToken, deleteUser);
// router.post("/save", verifyToken, savePost);

router.get("/profilePosts", profilePosts);
router.get("/notification", getNotificationNumber);
router.get("/:id", getUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.post("/save", savePost);

export default router;
