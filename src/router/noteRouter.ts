import { Router,Request,Response } from "express";
import { createNoteController, deleteNoteController, getNoteByIdController, getNotesIdsController, getSuggestionsController, updateNoteController } from "../controllers/noteControllers";
import { restrictUserController } from "../controllers/userControler";

const noteRouter = Router();

noteRouter.post('/create',restrictUserController, createNoteController);
noteRouter.post('/update', restrictUserController, updateNoteController);
noteRouter.post('/delete', restrictUserController, deleteNoteController);

noteRouter.post('/postIds',restrictUserController,getNotesIdsController)
noteRouter.post('/post',restrictUserController,getNoteByIdController)
noteRouter.post('/suggestions',restrictUserController,getSuggestionsController)

export {noteRouter};