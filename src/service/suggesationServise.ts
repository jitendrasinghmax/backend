import { Note, User } from "../model";

const getSuggestions=async(query:string,owner:string)=>{
    try{
        console.log(query,owner);
        const suggestions=await Note.find({title:{$regex:query,$options:"i"},$or:[
            {owner:owner},
            {colaborators:{$in:[owner]}}
        ]}).select("title");
        console.log(suggestions);
        return suggestions;
    }catch(error){
        throw new Error("Failed to get suggestions");
    }
}
const getUsers=async(query:string,owner:string)=>{
    try{
        const users=await User.find({
            email: { $regex: `^${query}`, $options: 'i'},_id:{$ne:owner}
          }).select("email").limit(4);

        return users;
    }catch(error){
        throw new Error("Failed to get users");
    }
}
export {getSuggestions,getUsers};
