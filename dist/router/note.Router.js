"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noteRouter = void 0;
const express_1 = require("express");
const note_controllers_1 = require("../controllers/note.controllers");
const noteRouter = (0, express_1.Router)();
exports.noteRouter = noteRouter;
noteRouter.post('/create', note_controllers_1.createNoteController);
noteRouter.post('/update', note_controllers_1.updateNoteController);
noteRouter.post('/delete', note_controllers_1.deleteNoteController);
noteRouter.post('/postIds', (req, resp) => {
});
noteRouter.post('/post', (req, resp) => {
});
