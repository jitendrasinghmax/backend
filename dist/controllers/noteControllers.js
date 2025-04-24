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
exports.getSuggestionsController = exports.getNotesIdsController = exports.getNoteByIdController = exports.deleteNoteController = exports.updateNoteController = exports.createNoteController = void 0;
const noteService_1 = require("../service/noteService");
const zodValidator_1 = require("../zodValidator");
const suggesationServise_1 = require("../service/suggesationServise");
const createNoteController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, note, backgroundColor, colaborators } = req.body;
    console.log(req.body);
    const owner = req.body.owner;
    const isValidData = (0, zodValidator_1.validateNote)({ title, note, backgroundColor, owner, colaborators });
    if (!isValidData) {
        res.status(400).json({
            message: "Invalid data"
        });
        return;
    }
    try {
        const noteResult = yield (0, noteService_1.createNote)({ title, note, backgroundColor, owner, colaborators });
        res.status(200).json({
            message: "Note created successfully",
            id: noteResult
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
    const { title, note, backgroundColor, colaborators } = req.body;
    const id = req.body.id;
    const owner = req.body.owner;
    const isValidData = (0, zodValidator_1.validateNoteUpdate)({ title, note, backgroundColor, colaborators });
    if (!isValidData) {
        res.status(400).json({
            message: "Invalid data"
        });
        return;
    }
    try {
        const noteResult = yield (0, noteService_1.updateNote)({ title, note, backgroundColor, colaborators }, id, owner);
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
    const owner = req.body.owner;
    const isValidData = (0, zodValidator_1.validateGetNotes)({ id });
    if (!isValidData) {
        res.status(400).json({
            message: "Invalid data"
        });
        return;
    }
    try {
        const noteResult = yield (0, noteService_1.deleteNote)(id, owner);
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
const getNoteByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.body.id;
    const isValidData = (0, zodValidator_1.validateGetNotes)({ id });
    if (!isValidData) {
        res.status(400).json({
            message: "Invalid data"
        });
        return;
    }
    try {
        const noteResult = yield (0, noteService_1.getNoteById)(id);
        res.status(200).json({
            message: "Note fetched successfully",
            note: noteResult
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Failed to fetch note"
        });
    }
});
exports.getNoteByIdController = getNoteByIdController;
const getNotesIdsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const owner = req.body.owner;
    const isValidData = (0, zodValidator_1.validateGetNotesIds)({ owner });
    if (!isValidData) {
        res.status(400).json({
            message: "Invalid data"
        });
        return;
    }
    try {
        const noteResult = yield (0, noteService_1.getNotesIds)(owner);
        res.status(200).json({
            message: "Notes fetched successfully",
            note: noteResult
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Failed to fetch notes"
        });
    }
});
exports.getNotesIdsController = getNotesIdsController;
const getSuggestionsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.body.query;
    const owner = req.body.owner;
    if (!query) {
        res.status(400).json({
            message: "Invalid data"
        });
        return;
    }
    const suggestions = yield (0, suggesationServise_1.getSuggestions)(query, owner);
    res.status(200).json({
        message: "Suggestions fetched successfully",
        suggestions: suggestions
    });
});
exports.getSuggestionsController = getSuggestionsController;
