import express from "express";
import { home, faq } from "../controller.js/centerController";

const centerRouter = express.Router();

centerRouter.get("/", home);//홈페이지
centerRouter.get("/faq", faq);//자주묻는 질문

export default centerRouter;