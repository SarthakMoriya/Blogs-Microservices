import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
  },
  { timestamps: true }
);

const Blog =  mongoose.model("Blogs", blogSchema);
export default Blog;
