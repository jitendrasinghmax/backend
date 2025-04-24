import { Request, Response } from "express";
import { createNote, deleteNote, getNoteById, getNotesIds, noteDataInterface, updateNote } from "../service/noteService";
import {  validateGetNotes, validateGetNotesIds, validateNote, validateNoteUpdate } from "../zodValidator";
import {getSuggestions} from "../service/suggesationServise";

export const createNoteController=async(req:Request,res:Response)=>{
    const {title,note,backgroundColor,colaborators}:noteDataInterface=req.body;
    console.log(req.body);
    const owner=req.body.owner;
    const isValidData=validateNote({title,note,backgroundColor,owner,colaborators});
    if(!isValidData){
         res.status(400).json({
            message:"Invalid data"
        })
        return;
    }
try{
    const noteResult=await createNote({title,note,backgroundColor,owner,colaborators});
    res.status(200).json({
        message:"Note created successfully",
        id:noteResult
    })
}catch(error){
    res.status(500).json({
        message:"Failed to create note"
    })
}
}
export const updateNoteController=async(req:Request,res:Response)=>{
    const {title,note,backgroundColor,colaborators}:noteDataInterface=req.body;
    const id=req.body.id;
    const owner=req.body.owner;
    const isValidData=validateNoteUpdate({title,note,backgroundColor,colaborators});
    if(!isValidData){
         res.status(400).json({
            message:"Invalid data"
        })
        return;
    }
    try{
        const noteResult=await updateNote({title,note,backgroundColor,colaborators},id,owner);
        res.status(200).json({
            message:"Note updated successfully",
            note:noteResult
        })
    }catch(error){
        res.status(500).json({
            message:"Failed to update note"
        })
    }
}
export const deleteNoteController=async(req:Request,res:Response)=>{
    const id=req.body.id;
    const owner=req.body.owner;
    const isValidData=validateGetNotes({id});
    if(!isValidData){
         res.status(400).json({
            message:"Invalid data"
        })
        return;
    }
    try{
        const noteResult=await deleteNote(id,owner);
        res.status(200).json({
            message:"Note deleted successfully"
        })
    }catch(error){
        res.status(500).json({
            message:"Failed to delete note"
        })
    }
}
export const getNoteByIdController=async(req:Request,res:Response)=>{
    const id=req.body.id;
    const isValidData=validateGetNotes({id});
    if(!isValidData){
        res.status(400).json({
            message:"Invalid data"
        })
        return;
    }
    try{
        const noteResult=await getNoteById(id);
        res.status(200).json({
            message:"Note fetched successfully",
            note:noteResult
        })
    }catch(error){
        res.status(500).json({
            message:"Failed to fetch note"
        })
    }
}
export const getNotesIdsController=async(req:Request,res:Response)=>{
    const owner=req.body.owner;
    const isValidData=validateGetNotesIds({owner});
    if(!isValidData){
        res.status(400).json({
            message:"Invalid data"
        })
        return;
    }
    try{
        const noteResult=await getNotesIds(owner);
        res.status(200).json({
            message:"Notes fetched successfully",
            note:noteResult
        })
    }catch(error){
        res.status(500).json({
            message:"Failed to fetch notes"
        })
    }
}
export const getSuggestionsController=async(req:Request,res:Response)=>{
    const query=req.body.query;
    const owner=req.body.owner;
    if(!query){
        res.status(400).json({
            message:"Invalid data"
        })
        return;
    }
    const suggestions=await getSuggestions(query,owner);
    res.status(200).json({
        message:"Suggestions fetched successfully",
        suggestions:suggestions
    })
}

