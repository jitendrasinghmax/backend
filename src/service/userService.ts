import { User } from "../model";

export interface userDataInterface{
    email:string,
    password:string
}
const createUser=async(userData:userDataInterface)=>{
    try{
        const user=await User.create(userData);
        return user;
    }catch(error){
        throw new Error("Failed to create user");
    }
}
const getUser=async(userData:userDataInterface)=>{
    try{
        const user=await User.findOne({email:userData.email}).select('email');
        return user;
    }catch(error){
        throw new Error("Failed to login user");
    }
}
const getUserEmail=async(id:string)=>{
    try{
        const user=await User.findOne({_id:id}).select("email");
        return user;
    }
    catch(error){
        throw new Error("Failed to get user email");
    }
}

export {createUser,getUser,getUserEmail};

