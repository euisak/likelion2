import mongoose from 'mongoose';

const challengeSchema = new mongoose.Schema({
  prefix: { type: String, required: true },
  title: { type: String, required: true },
  writer: { type: String, required: true }, // username
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' }, // userId
  createdAt: { type: Date, default: Date.now },
  description: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  meta: {
    participants: { type: Number, default: 0 }
  }
});

challengeSchema.methods.toFormattedDate = function () {
  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  };
  const date = new Date(this.createdAt);
  const formattedDate = date.toLocaleString('ko-KR', options)
    .replace(',', '')
    .replace(/\//g, '.');
  return formattedDate;
};

const Challenge = mongoose.model('Challenge', challengeSchema);
export default Challenge;