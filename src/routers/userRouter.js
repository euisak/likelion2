import express from "express";
<<<<<<< HEAD
import { seeUser, editUser } from "../controller.js/userController";

const userRouter = express.Router();

=======
import { logout, seeUser, editUser } from "../controller.js/userController";

const userRouter = express.Router();

userRouter.get("/logout", logout)//로그아웃
>>>>>>> 1e458b7a25ed3153b5ef817c98ded00b3959e9dd
userRouter.get("/:id", seeUser);//마이페이지
userRouter.get("/:id/edit", editUser);//개인정보수정

export default userRouter;