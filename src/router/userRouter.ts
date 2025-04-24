import { Router,Request,Response } from "express";
import { createUserController, getUserEmailController, getUsersController, loginUserController, logoutUserController, restrictUserController } from "../controllers/userControler";

const userRouter = Router();

userRouter.post('/create',createUserController)
userRouter.post('/login',loginUserController)
userRouter.post('/users',restrictUserController,getUsersController)
userRouter.post('/userEmail',restrictUserController,getUserEmailController)
userRouter.post('/logout',restrictUserController,logoutUserController)
export {userRouter};