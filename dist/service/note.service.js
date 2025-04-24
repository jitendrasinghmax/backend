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
exports.getNoteById = exports.deleteNote = exports.updateNote = exports.createNote = void 0;
const model_1 = require("../model");
const createNote = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const noteResult = yield model_1.Note.create(data);
        return noteResult;
    }
    catch (error) {
        throw new Error("Failed to create note");
    }
});
exports.createNote = createNote;
const updateNote = (data, id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const noteResult = yield model_1.Note.findByIdAndUpdate(id, data, { new: true });
        return noteResult;
    }
    catch (error) {
        throw new Error("Failed to update note");
    }
});
exports.updateNote = updateNote;
const deleteNote = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //check the owner of the note is the same as the user
        const noteResult = yield model_1.Note.findByIdAndDelete(id);
        if (noteResult) {
            return true;
        }
        return false;
    }
    catch (error) {
        throw new Error("Failed to delete note");
    }
});
exports.deleteNote = deleteNote;
const getNoteById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const noteResult = yield model_1.Note.findById(id);
});
exports.getNoteById = getNoteById;
