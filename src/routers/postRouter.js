import express from "express";
import { protectorMiddleware } from '../authMiddleware';
import { watch, post, getEdit, postEdit, deletePost, addComment, editComment, deleteComment } from "../controller.js/postController";

const postRouter = express.Router();

postRouter.get("/", post);
postRouter.get("/:id([0-9a-fA-F]{24})", watch);
postRouter.route("/:id([0-9a-fA-F]{24})/edit").get(getEdit).post(postEdit);
postRouter.route("/:id([0-9a-fA-F]{24})/delete").get(deletePost);

postRouter.post('/:postId([0-9a-fA-F]{24})/comment',protectorMiddleware, addComment);

// 댓글 수정 및 삭제
postRouter.post('/:postId/comment/:commentId/edit', editComment);
postRouter.post('/:postId/comment/:commentId/delete', deleteComment);


export default postRouter;