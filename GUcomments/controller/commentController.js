import Comment from "../model/commentModel.js";
import Blog from "../model/blogModel.js";

export const updateComment = async (req, res) => {
  try {
    const { description, commentId } = req.body;
    const comment = await Comment.findByIdAndUpdate(commentId, { description });
    if (comment == null) throw new Error("Comment not found");
    res.send({
      message: "Comment Updated successfully",
      status: "success",
      body: [],
      error: {},
    });
  } catch (error) {
    res.send({
      message: error?.message || "error updating comment",
      status: "fail",
      body: [],
      error: error?.message,
    });
  }
};
export const getCommentsByBlogId=async(req,res)=>{
  try {
    
  } catch (error) {
    res.send({
      message: error?.message || "error fetching comments",
      status: "fail",
      body: [],
      error: error?.message,
    });
  }
}
