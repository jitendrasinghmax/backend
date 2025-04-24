import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import { noteRouter } from "./router/noteRouter";
import { userRouter } from "./router/userRouter";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

mongoose.connect(process.env.DB_CONNECT || '').then(()=>{
    console.log("Connected to MongoDB");
}).catch((err)=>{
    console.log(err);
})
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:['http://localhost:5173', 'https://google-keep-irq9-gnz2ryep6-jitendrasinghmaxs-projects.vercel.app'],
    methods:['GET','POST','PUT','DELETE'],
    credentials:true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Set-Cookie'],
    maxAge: 86400
}));

// Configure default cookie settings
const cookieConfig = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
};

app.use('/api/notes',noteRouter);
app.use('/api/user',userRouter);

app.get("/", (req, res) => {
    res.send("Hello World");
});


app.listen(process.env.PORT||3000, () => {
    console.log("Server is running on port 3000");
});

