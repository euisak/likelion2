import express from "express";
<<<<<<< HEAD
import { home, faq } from "../controller.js/centerController";
=======
import { home, faq, getLogin, postLogin, getJoin, postJoin } from "../controller.js/centerController";
>>>>>>> 1e458b7a25ed3153b5ef817c98ded00b3959e9dd

const centerRouter = express.Router();

centerRouter.get("/", home);//홈페이지
centerRouter.get("/faq", faq);//자주묻는 질문
<<<<<<< HEAD
=======
centerRouter.route("/join").get(getJoin).post(postJoin);//회원가입
centerRouter.route("/login").get(getLogin).post(postLogin);//로그인
>>>>>>> 1e458b7a25ed3153b5ef817c98ded00b3959e9dd

export default centerRouter;