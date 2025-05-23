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
exports.getUsers = exports.getSuggestions = void 0;
const model_1 = require("../model");
const getSuggestions = (query, owner) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(query, owner);
        const suggestions = yield model_1.Note.find({ title: { $regex: query, $options: "i" }, $or: [
                { owner: owner },
                { colaborators: { $in: [owner] } }
            ] }).select("title");
        console.log(suggestions);
        return suggestions;
    }
    catch (error) {
        throw new Error("Failed to get suggestions");
    }
});
exports.getSuggestions = getSuggestions;
const getUsers = (query, owner) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield model_1.User.find({
            email: { $regex: `^${query}`, $options: 'i' }, _id: { $ne: owner }
        }).select("email").limit(4);
        return users;
    }
    catch (error) {
        throw new Error("Failed to get users");
    }
});
exports.getUsers = getUsers;
