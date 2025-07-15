import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.route.js";
import postRoute from "./routes/post.route.js";
import testRoute from "./routes/test.route.js";
import userRoute from "./routes/user.route.js";
import chatRoute from "./routes/chat.route.js";
import messageRoute from "./routes/message.route.js";

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://real-estate-blush-eight-49.vercel.app",
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// Root endpoint for testing
app.get("/", (req, res) => {
  res.json({
    message: "Real Estate API Server is running!",
    timestamp: new Date().toISOString(),
  });
});

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/test", testRoute);
app.use("/api/chats", chatRoute);
app.use("/api/messages", messageRoute);

app.listen(process.env.PORT || 5000, () => {
  console.log("Server is running at", process.env.PORT || 5000);
});
