import Comment from "../model/commentModel.js";
import Blog from "../model/blogModel.js";
import User from "../model/authModel.js";
import { connectRedis } from "../index.js";

export const updateComment = async (req, res) => {
  try {
    const { description, commentId } = req.body;
    const comment = await Comment.findByIdAndUpdate(commentId, { description });
    handleCache(comment, "update");
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
export const getCommentsByBlogId = async (req, res) => {
  try {
    let comments = await retrieveCache(req.params.id); //blogId
    if (comments.length)
      res.status(200).json({
        message: "success",
        status: "success",
        body: comments,
        error: null,
      });
    else {
      console.log("Getting comments from db...");
      comments = await Comment.find({ blogId: req.params.id }).populate(
        "userId"
      );
      res.status(200).json({
        message: "success",
        status: "success",
        body: comments,
        error: null,
      });
    }
  } catch (error) {
    res.send({
      message: error?.message || "error fetching comments",
      status: "fail",
      body: [],
      error: error?.message,
    });
  }
};

const handleCache = async (comment, type = "create") => {
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
      : "";
  } catch (error) {
    console.log("ERROR UPDATING CACHE ");
  }
};
const retrieveCache = async (id) => {
  try {
    let comments = [];
    const client = await connectRedis();
    if (client == null) throw new Error("Couldn't connect redis");
    const commentsMap = await client.hGetAll(`post:${id}`);
    let commentIds = Object.keys(commentsMap);
    if (!commentIds) {
    } else {
      commentIds.map((id) => {
        const {userId,description}=JSON.parse(commentsMap[id]);
        
        comments.push(JSON.parse(commentsMap[id]));
      });
    }
    return comments;
  } catch (error) {
    console.log(error);
    return [];
  }
};
