import express from 'express';
import { protectorMiddleware } from '../authMiddleware';
import {
  watch,
  challenge,
  getEditChallenge,
  challengeEdit,
  deleteChallenge,
  addComment,
  editComment,
  deleteComment,
  participate,
} from '../controller.js/challengeController';

const challengeRouter = express.Router();

challengeRouter.get("/", challenge);
challengeRouter.get("/:id([0-9a-fA-F]{24})", watch);
challengeRouter.get("/:id([0-9a-fA-F]{24})/edit", getEditChallenge);
challengeRouter.post("/:id([0-9a-fA-F]{24})/edit", challengeEdit);
challengeRouter.get("/:id([0-9a-fA-F]{24})/delete", deleteChallenge);
challengeRouter.post("/:challengeId([0-9a-fA-F]{24})/comment", protectorMiddleware, addComment);
challengeRouter.post("/:challengeId([0-9a-fA-F]{24})/comment/:commentId([0-9a-fA-F]{24})/edit", editComment);
challengeRouter.post("/:challengeId([0-9a-fA-F]{24})/comment/:commentId([0-9a-fA-F]{24})/delete", deleteComment);
challengeRouter.post("/:id([0-9a-fA-F]{24})/participate", protectorMiddleware, participate);



export default challengeRouter;