import express from "express";
import { home, faq, getLogin, postLogin, getJoin, postJoin } from "../controller.js/centerController";

const centerRouter = express.Router();

centerRouter.get("/", home);//홈페이지
centerRouter.get("/faq", faq);//자주묻는 질문
centerRouter.route("/join").get(getJoin).post(postJoin);//회원가입
centerRouter.route("/login").get(getLogin).post(postLogin);//로그인

export default centerRouter;