import express from "express";
import { home } from "../controller.js/centerController";

const centerRouter = express.Router();

centerRouter.get("/", home);//홈페이지

export default centerRouter;