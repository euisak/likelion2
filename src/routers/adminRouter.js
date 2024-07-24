import express from "express";
import { mySales, productReg } from "../controller.js/adminController";

const adminRouter = express.Router();

adminRouter.get("/mySales", mySales);//나의 판매(/개별id/mySales로 변경 예정)
adminRouter.get("/productReg", productReg);//상품 등록(/개별id/productReg로 변경 예정)

export default adminRouter;