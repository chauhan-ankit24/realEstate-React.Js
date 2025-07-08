import express from "express";
import { shouldBeAdmin, shouldBeLoggedIn } from "../controllers/test.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

// Simple test endpoint
router.get("/", (req, res) => {
  res.json({ message: "API is working!", timestamp: new Date().toISOString() });
});

router.get("/should-be-logged-in", verifyToken, shouldBeLoggedIn);

router.get("/should-be-admin", shouldBeAdmin);

export default router;