import { NextFunction, Request, response, Response } from "express";
import { validateUser } from "../zodValidator";
import { createUser, getUser, getUserEmail } from "../service/userService";
import { getUsers } from "../service/suggesationServise";
import jwt from "jsonwebtoken";
const createUserController=async(req:Request,res:Response)=>{
    const {email,password}=req.body;
    const isValidData=validateUser({email,password});
    if(!isValidData.success){
        res.status(400).json({
            message:"Invalid data",
            error:isValidData.error
        })
        return;
    }
try{
    const user=await createUser({email,password});
    const token=jwt.sign({userId:user._id},process.env.JWT_SECRET as string);
    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        path: '/',
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    });
    res.status(200).json({
        message:"User created successfully",
        user:user,
    })
}catch(error){
    res.status(500).json({
        message:"Failed to create user",
        error:error
    })
}
}
const loginUserController=async(req:Request,res:Response)=>{
    const {email,password}=req.body;
    const isValidData=validateUser({email,password});
    if(!isValidData.success){
        res.status(400).json({
            message:"Invalid credentials",
            error:isValidData.error
        })
        return;
    }
    try{
        const user=await getUser({email,password});
        if(!user){
            res.status(401).json({
                message:"Invalid email or password",
                error:user
            })
            return
        }
    const token=jwt.sign({userId:user._id},process.env.JWT_SECRET as string);
    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        path: '/',
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    });
    res.status(200).json({
        message:"User logged in successfully",
        user:user
    })
}catch(error){
    res.status(500).json({
        message:"Failed to login user",
        error:error
    })
}
}
const restrictUserController=async(req:Request,res:Response,next:NextFunction)=>{
    const token=req.cookies.token;
    if(!token){
        res.status(401).json({
            message:"logged out"
        })
        return;
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string };
        req.body.owner = decoded.userId;
        next();
    }catch(error){
        res.status(401).json({
            message:"logged out",
            error:error
        })
    }
}
const getUsersController=async(req:Request,res:Response)=>{
    const {query}=req.body;
    const owner=req.body.owner;
    if(!query){
        res.status(400).json({
            message:"Invalid credentials"
        })
        return;
    }
    try{
        const users=await getUsers(query,owner);
        res.status(200).json({
            message:"Users fetched successfully",
            users:users
        })
    }catch(error){
        res.status(500).json({
            message:"Failed to fetch users",
            error:error
        })
    }
}
const getUserEmailController=async(req:Request,res:Response)=>{
    const owner=req.body.owner;
    try{
        const user=await getUserEmail(owner);
        res.status(200).json({
            message:"user is fetched sucessfully",
            user
        })
    }
    catch(error){
        res.status(500).json({
            message:"Failed to fetch user email",
            error:error
        })
    }
}
const logoutUserController=async(req:Request,res:Response)=>{
    res.clearCookie("token", {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        path: '/'
    });
    res.status(200).json({
        message:"User logged out successfully"
    })
}
export {createUserController,loginUserController,restrictUserController,getUsersController,getUserEmailController,logoutUserController};

