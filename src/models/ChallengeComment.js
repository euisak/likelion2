import mongoose from 'mongoose';

const challengeCommentSchema = new mongoose.Schema({
  author: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' }, // userId
  content: { type: String, required: true },
  challengeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Challenge', required: true },
  createdAt: { type: Date, default: Date.now }
});

const ChallengeComment = mongoose.model('ChallengeComment', challengeCommentSchema);
export default ChallengeComment;