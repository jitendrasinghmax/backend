import { Schema } from "mongoose";
import mongoose from "mongoose";

const noteShema=new Schema({
    title:{
        type:String,
        required:true
    },
    note:{
        type:String,
        required:true
    },
    backgroundColor:{
        type:String,
        required:true
    },
    owner:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    colaborators:[{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    }]
})


const userSchema=new Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
})

export const User = mongoose.model('User', userSchema);
export const Note = mongoose.model('Note', noteShema);

