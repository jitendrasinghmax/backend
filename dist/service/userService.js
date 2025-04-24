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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserEmail = exports.getUser = exports.createUser = void 0;
const model_1 = require("../model");
const createUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield model_1.User.create(userData);
        return user;
    }
    catch (error) {
        throw new Error("Failed to create user");
    }
});
exports.createUser = createUser;
const getUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield model_1.User.findOne({ email: userData.email }).select('email');
        return user;
    }
    catch (error) {
        throw new Error("Failed to login user");
    }
});
exports.getUser = getUser;
const getUserEmail = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield model_1.User.findOne({ _id: id }).select("email");
        return user;
    }
    catch (error) {
        throw new Error("Failed to get user email");
    }
});
exports.getUserEmail = getUserEmail;
