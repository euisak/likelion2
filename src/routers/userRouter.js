import express from "express";
import { logout, seeUser, editUser, getProductReg, postProductReg, mySales } from "../controller.js/userController";
import {storemulterMiddleware} from "../middlewares"

const userRouter = express.Router();

userRouter.get("/logout", logout)//로그아웃
userRouter.get("/:id", seeUser);//마이페이지
userRouter.route("/:id/productReg").get(getProductReg).post(storemulterMiddleware.fields([
    {name: "thumbnail", maxCount: 1},
    {name: "productImage", maxCount: 5},
]), postProductReg);//상품 등록(판매자만 가능)
userRouter.route("/:id/mySales").get(mySales);//나의 판매(판매자만 가능)
userRouter.get("/:id/edit", editUser);//개인정보수정

export default userRouter;