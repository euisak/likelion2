import express from "express";
import { seeUser, editUser } from "../controller.js/userController";

const userRouter = express.Router();

userRouter.get("/:id", seeUser);//마이페이지
userRouter.get("/:id/edit", editUser);//개인정보수정

export default userRouter;