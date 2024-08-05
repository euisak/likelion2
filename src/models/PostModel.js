import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  prefix: { type: String, required: true },
  title: { type: String, required: true, trim: true, maxLength: 50 },
  writer: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' }, // userId
  createdAt: { type: Date, required: true, default: Date.now },
  content: { type: String, required: true, trim: true },
  meta: {
    views: { type: Number, default: 0, required: true },
    like: { type: Number, default: 0, required: true }
  },
});

// Instance method to format the date
postSchema.methods.toFormattedDate = function() {
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

postSchema.pre('save', async function(){
  console.log(this);
});

const Post = mongoose.model("Post", postSchema);
export default Post;