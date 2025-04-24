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
exports.deleteNoteController = exports.updateNoteController = exports.createNoteController = void 0;
const note_service_1 = require("../service/note.service");
const zod_validator_1 = require("../zod.validator");
const createNoteController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, note, backgroundColor, owner, colaborators } = req.body;
    const isValidData = (0, zod_validator_1.validateNote)({ title, note, backgroundColor, owner, colaborators });
    if (!isValidData) {
        res.status(400).json({
            message: "Invalid data"
        });
        return;
    }
    try {
        const noteResult = yield (0, note_service_1.createNote)({ title, note, backgroundColor, owner, colaborators });
        res.status(201).json({
            message: "Note created successfully",
            note: noteResult
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Failed to create note"
        });
    }
});
exports.createNoteController = createNoteController;
const updateNoteController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, note, backgroundColor, owner, colaborators } = req.body;
    const isValidData = (0, zod_validator_1.validateNote)({ title, note, backgroundColor, owner, colaborators });
    if (!isValidData) {
        res.status(400).json({
            message: "Invalid data"
        });
        return;
    }
    try {
        const noteResult = yield (0, note_service_1.updateNote)({ title, note, backgroundColor, owner, colaborators }, req.params.id);
        res.status(200).json({
            message: "Note updated successfully",
            note: noteResult
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Failed to update note"
        });
    }
});
exports.updateNoteController = updateNoteController;
const deleteNoteController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.body.id;
    const isValidData = (0, zod_validator_1.validateNote)({ id });
    if (!isValidData) {
        res.status(400).json({
            message: "Invalid data"
        });
        return;
    }
    try {
        const noteResult = yield (0, note_service_1.deleteNote)(id);
        res.status(200).json({
            message: "Note deleted successfully"
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Failed to delete note"
        });
    }
});
exports.deleteNoteController = deleteNoteController;
