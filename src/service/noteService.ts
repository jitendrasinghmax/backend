import { Note } from "../model";

export interface noteDataInterface{
    title:string,
    note:string,
    backgroundColor:string,
    owner:string,
    colaborators:string[]
}
export interface noteUpdateInteface{
    title:string,
    note:string,
    backgroundColor:string,
    colaborators:string[]
}
export const createNote=async (data:noteDataInterface)=>{
    try{
        const noteResult=await Note.create(data);
        return noteResult._id;
    }catch(error){
        throw new Error("Failed to create note");
    }
}
export const updateNote=async(data:noteUpdateInteface,id:string,owner:string)=>{
    try{
        const noteResult=await Note.findOneAndUpdate({_id:id,$or:[
            {owner:owner},
            {colaborators:{$in:[owner]}}
        ]},data,{new:true});
        return noteResult;
    }catch(error){
        throw new Error("Failed to update note");
    }
}
export const deleteNote=async(id:string,owner:string)=>{
    try{
        //check the owner of the note is the same as the user
        const noteResult=await Note.findOneAndDelete({_id:id,owner:owner});
        if(noteResult){
        return true;
    }
    return false;
    }catch(error){
        throw new Error("Failed to delete note");
    }
}
export const getNoteById=async(id:string)=>{
    const noteResult=await Note.findOne({
        _id:id
    });
    return noteResult;
}
export const getNotesIds=async(owner:string)=>{
    const noteResult=await Note.find({$or:[
        {owner:owner},
        {colaborators:{$in:[owner]}}
    ]},{_id:1});
    return noteResult;
}
