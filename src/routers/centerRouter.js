import express from "express";
import { home, faq, getLogin, postLogin, getJoin, postJoin } from "../controller.js/centerController";
import { getUpload, postUpload, search, watch, increaseLike } from "../controller.js/postController";
import {  postUploadChallenge, getUploadChallenge, participate } from "../controller.js/challengeController";
import { protectorMiddleware } from "../middlewares";

const centerRouter = express.Router();

centerRouter.get("/", home);//홈페이지
centerRouter.get("/faq", faq);//자주묻는 질문
centerRouter.route("/join").get(getJoin).post(postJoin);//회원가입
centerRouter.route("/login").get(getLogin).post(postLogin);//로그인
centerRouter.route("/upload").all(protectorMiddleware).get(getUpload).post(postUpload);
centerRouter.get("/search", search);
centerRouter.get("/post/:id", watch);
centerRouter.post("/post/:id/like",protectorMiddleware, increaseLike);
centerRouter.get("/challenge/upload", protectorMiddleware , getUploadChallenge);
centerRouter.post("/challenge/upload", protectorMiddleware , postUploadChallenge);
centerRouter.post("/challenge/:id([0-9a-fA-F]{24})/participate", protectorMiddleware, participate);

export default centerRouter;