import Comment from "../model/commentModel.js";
import Blog from "../model/blogModel.js";
import { connectRedis } from "../index.js";

export const createComment = async (req, res) => {
  try {
    const { blogId, userId, description } = req.body;
    const comment = new Comment({ blogId, userId, description });
    await comment.save();
    let blog = await Blog.findById(blogId);
    if (blog == null) throw new Error("Couldn't find blog " + blogId);
    blog.comments.push(comment._id);
    await blog.save();
    updateCache(comment, "create");
    res.send({ message: "Comment created successfully" });
  } catch (error) {
    res.send({
      message: error?.message || "error creating comment",
      status: "fail",
      body: [],
      error: error?.message,
    });
  }
};
export const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    let comment = await Comment.findByIdAndDelete(commentId);
    if (comment == null) {
      throw new Error("Comment not found");
    }
    let blog = await Blog.findById(comment.blogId);
    console.log(comment);
    updateCache(comment,'delete');
    if (blog == null) throw new Error("Couldn't find blog " + blogId);
    blog.comments = blog.comments.filter((comment) => comment._id != commentId);
    await blog.save();
    res.send({
      message: "Comment deleted successfully",
      status: "success",
      body: [],
      error: {},
    });
  } catch (error) {
    console.log(error);
    res.send({
      message: error?.message || "error creating comment",
      status: "fail",
      body: [],
      error: error?.message,
    });
  }
};

const updateCache = async (comment, type = "create") => {
  console.log(comment);
  try {
    const client = await connectRedis();
    if (client == null) throw new Error("Couldn't connect redis");
    const { blogId, _id, ...others } = comment._doc;
    console.log(others);
    type == "create"
      ? client.hSet(
          `post:${blogId}`,
          `comment:${_id}`,
          JSON.stringify({ ...others })
        )
      : client.hDel(`post:${blogId}`, `comment:${_id}`);
  } catch (error) {}
};
