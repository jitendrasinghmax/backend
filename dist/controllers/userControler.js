"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutUserController = exports.getUserEmailController = exports.getUsersController = exports.restrictUserController = exports.loginUserController = exports.createUserController = void 0;
const zodValidator_1 = require("../zodValidator");
const userService_1 = require("../service/userService");
const suggesationServise_1 = require("../service/suggesationServise");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const isValidData = (0, zodValidator_1.validateUser)({ email, password });
    if (!isValidData.success) {
        res.status(400).json({
            message: "Invalid data",
            error: isValidData.error
        });
        return;
    }
    try {
        const user = yield (0, userService_1.createUser)({ email, password });
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, process.env.JWT_SECRET);
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            path: '/',
            maxAge: 24 * 60 * 60 * 1000 // 24 hours
        });
        res.status(200).json({
            message: "User created successfully",
            user: user,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Failed to create user",
            error: error
        });
    }
});
exports.createUserController = createUserController;
const loginUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const isValidData = (0, zodValidator_1.validateUser)({ email, password });
    if (!isValidData.success) {
        res.status(400).json({
            message: "Invalid credentials",
            error: isValidData.error
        });
        return;
    }
    try {
        const user = yield (0, userService_1.getUser)({ email, password });
        if (!user) {
            res.status(401).json({
                message: "Invalid email or password",
                error: user
            });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, process.env.JWT_SECRET);
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            path: '/',
            maxAge: 24 * 60 * 60 * 1000 // 24 hours
        });
        res.status(200).json({
            message: "User logged in successfully",
            user: user
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Failed to login user",
            error: error
        });
    }
});
exports.loginUserController = loginUserController;
const restrictUserController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.cookies.token;
    if (!token) {
        res.status(401).json({
            message: "logged out"
        });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.body.owner = decoded.userId;
        next();
    }
    catch (error) {
        res.status(401).json({
            message: "logged out",
            error: error
        });
    }
});
exports.restrictUserController = restrictUserController;
const getUsersController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { query } = req.body;
    const owner = req.body.owner;
    if (!query) {
        res.status(400).json({
            message: "Invalid credentials"
        });
        return;
    }
    try {
        const users = yield (0, suggesationServise_1.getUsers)(query, owner);
        res.status(200).json({
            message: "Users fetched successfully",
            users: users
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Failed to fetch users",
            error: error
        });
    }
});
exports.getUsersController = getUsersController;
const getUserEmailController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const owner = req.body.owner;
    try {
        const user = yield (0, userService_1.getUserEmail)(owner);
        res.status(200).json({
            message: "user is fetched sucessfully",
            user
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Failed to fetch user email",
            error: error
        });
    }
});
exports.getUserEmailController = getUserEmailController;
const logoutUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie("token", {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        path: '/'
    });
    res.status(200).json({
        message: "User logged out successfully"
    });
});
exports.logoutUserController = logoutUserController;
