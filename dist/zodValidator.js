"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLogin = exports.loginValidationSchema = exports.validateGetNotesIds = exports.validateGetNotes = exports.validateNoteUpdate = exports.validateNote = exports.validateUser = exports.getNotesIdsValidationSchema = exports.getNotesValidationSchema = exports.noteUpdateValidationSchema = exports.noteValidationSchema = exports.userValidationSchema = void 0;
const zod_1 = require("zod");
// User validation schema
exports.userValidationSchema = zod_1.z.object({
    email: zod_1.z.string().email("Please provide a valid email"),
    password: zod_1.z.string().min(6, "Password must be at least 6 characters long")
});
// Note validation schema
exports.noteValidationSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, "Title is required"),
    note: zod_1.z.string().min(1, "Note content is required"),
    backgroundColor: zod_1.z.string(),
    owner: zod_1.z.string(),
    colaborators: zod_1.z.array(zod_1.z.string()).optional()
});
exports.noteUpdateValidationSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, "Title is required"),
    note: zod_1.z.string().min(1, "Note content is required"),
    backgroundColor: zod_1.z.string(),
    colaborators: zod_1.z.array(zod_1.z.string()).optional()
});
exports.getNotesValidationSchema = zod_1.z.object({
    _id: zod_1.z.string()
});
exports.getNotesIdsValidationSchema = zod_1.z.object({
    owner: zod_1.z.string()
});
// Validation functions for User model
const validateUser = (userData) => {
    return exports.userValidationSchema.safeParse(userData);
};
exports.validateUser = validateUser;
// Validation functions for Note model
const validateNote = (noteData) => {
    return exports.noteValidationSchema.safeParse(noteData);
};
exports.validateNote = validateNote;
const validateNoteUpdate = (noteData) => {
    return exports.noteUpdateValidationSchema.safeParse(noteData);
};
exports.validateNoteUpdate = validateNoteUpdate;
const validateGetNotes = (noteData) => {
    return exports.getNotesValidationSchema.safeParse(noteData);
};
exports.validateGetNotes = validateGetNotes;
const validateGetNotesIds = (noteData) => {
    return exports.getNotesIdsValidationSchema.safeParse(noteData);
};
exports.validateGetNotesIds = validateGetNotesIds;
// Login validation schema
exports.loginValidationSchema = zod_1.z.object({
    email: zod_1.z.string().email("Please provide a valid email"),
    password: zod_1.z.string().min(1, "Password is required")
});
const validateLogin = (loginData) => {
    return exports.loginValidationSchema.safeParse(loginData);
};
exports.validateLogin = validateLogin;
