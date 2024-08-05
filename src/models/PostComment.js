import mongoose from 'mongoose';

const postCommentSchema = new mongoose.Schema({
  author: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' }, // userId
  content: { type: String, required: true },
  postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
  createdAt: { type: Date, default: Date.now }
});

const PostComment = mongoose.model('PostComment', postCommentSchema);
export default PostComment;