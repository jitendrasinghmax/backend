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

// More permissive CORS configuration to handle all frontend deployment variations
app.use(cors({
    origin: function(origin, callback) {
        const allowedOrigins = [
            'http://localhost:5173',
            'https://google-keep-irq9-gnz2ryep6-jitendrasinghmaxs-projects.vercel.app',
            'https://google-keep-irq9-1kpmzvmth-jitendrasinghmaxs-projects.vercel.app',
            'https://google-keep-irq9.vercel.app',
            /\.vercel\.app$/  // Allow all vercel.app subdomains
        ];
        
        // Allow requests with no origin (like mobile apps, curl requests, etc)
        if (!origin) return callback(null, true);
        
        // Check if the origin is allowed
        const isAllowed = allowedOrigins.some(allowedOrigin => {
            if (typeof allowedOrigin === 'string') {
                return allowedOrigin === origin;
            } else if (allowedOrigin instanceof RegExp) {
                return allowedOrigin.test(origin);
            }
            return false;
        });
        
        if (isAllowed) {
            callback(null, true);
        } else {
            console.log('Blocked origin:', origin);
            callback(null, false);
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
    exposedHeaders: ['Set-Cookie'],
    maxAge: 86400
}));

app.use('/api/notes',noteRouter);
app.use('/api/user',userRouter);

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.listen(process.env.PORT||3000, () => {
    console.log("Server is running on port 3000");
});

