// import mongoose from "mongoose";

// const blogSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     image: { type: String, required: false, default: "" },
//     desc: { type: String, required: true },
//     likes: { type: Number, default: 0 },
//     comments: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Comment", // Reference to Comment model
//       },
//     ],
//     category: { type: String, required:true ,default:"general"},

//   },
//   { timestamps: true }
// );

// const Blog = mongoose.model("Blogs", blogSchema);
// export default Blog;

import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
  },
  { timestamps: true }
);

const Blog =  mongoose.model("Blogs", blogSchema);
export default Blog;
