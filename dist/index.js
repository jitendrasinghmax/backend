"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const noteRouter_1 = require("./router/noteRouter");
const userRouter_1 = require("./router/userRouter");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
dotenv_1.default.config();
const app = (0, express_1.default)();
mongoose_1.default.connect(process.env.DB_CONNECT || '').then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log(err);
});
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
// More permissive CORS configuration to handle all frontend deployment variations
app.use((0, cors_1.default)({
    origin: function (origin, callback) {
        const allowedOrigins = [
            'http://localhost:5173',
            'https://google-keep-irq9-gnz2ryep6-jitendrasinghmaxs-projects.vercel.app',
            'https://google-keep-irq9-1kpmzvmth-jitendrasinghmaxs-projects.vercel.app',
            'https://google-keep-irq9.vercel.app',
            /\.vercel\.app$/ // Allow all vercel.app subdomains
        ];
        // Allow requests with no origin (like mobile apps, curl requests, etc)
        if (!origin)
            return callback(null, true);
        // Check if the origin is allowed
        const isAllowed = allowedOrigins.some(allowedOrigin => {
            if (typeof allowedOrigin === 'string') {
                return allowedOrigin === origin;
            }
            else if (allowedOrigin instanceof RegExp) {
                return allowedOrigin.test(origin);
            }
            return false;
        });
        if (isAllowed) {
            callback(null, true);
        }
        else {
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
app.use('/api/notes', noteRouter_1.noteRouter);
app.use('/api/user', userRouter_1.userRouter);
app.get("/", (req, res) => {
    res.send("Hello World");
});
app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running on port 3000");
});
