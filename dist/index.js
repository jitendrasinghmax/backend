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
app.use((0, cors_1.default)({
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use('/api/notes', noteRouter_1.noteRouter);
app.use('/api/user', userRouter_1.userRouter);
app.get("/", (req, res) => {
    res.send("Hello World");
});
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
