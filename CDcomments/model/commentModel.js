import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  blogId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Blogs",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
  description: { type: String, required: true },
});

const Comment=mongoose.model('Comment',commentSchema);
export default Comment;