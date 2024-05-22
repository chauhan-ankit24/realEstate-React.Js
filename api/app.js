import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import postRoute from './routes/post.route.js';
import userRoute from './routes/user.route.js';
import authRoute from './routes/auth.route.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));

app.use("/api/posts", postRoute);
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});