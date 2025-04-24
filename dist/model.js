"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Note = exports.User = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
const noteShema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true
    },
    note: {
        type: String,
        required: true
    },
    backgroundColor: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    colaborators: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }]
});
const userSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});
exports.User = mongoose_2.default.model('User', userSchema);
exports.Note = mongoose_2.default.model('Note', noteShema);
