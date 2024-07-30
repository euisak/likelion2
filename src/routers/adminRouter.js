import express from "express";
import { mySales, getProductReg, postProductReg } from "../controller.js/adminController";
import {storemulterMiddleware} from "../middlewares"

const adminRouter = express.Router();

adminRouter.get("/mySales", mySales);//나의 판매(/개별id/mySales로 변경 예정)
adminRouter.route("/productReg").get(getProductReg).post(storemulterMiddleware.fields([
    {name: "thumbnail", maxCount: 1},
    {name: "productImage", maxCount: 5},
]), postProductReg);//상품 등록

export default adminRouter;