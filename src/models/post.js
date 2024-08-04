import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  author: String,
  content: String,
  createdAt: { type: Date, default: Date.now },
  _id: mongoose.Schema.Types.ObjectId
});

const postSchema = new mongoose.Schema({
  prefix: { type: String, required: true },
  title: { type: String, required: true, trim: true, maxLength: 50 },
  writer: { type:mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, required: true, default: Date.now },
  content: { type: String, required: true, trim: true },
  comments: [commentSchema],
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
