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
    // console.log("COmments")
    // console.log(comments)

    if (comments)
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
    type == "update"
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
    const comments = [];
    const client = await connectRedis();
    if (client == null) throw new Error("Couldn't connect to Redis");

    const commentsMap = await client.hGetAll(`post:${id}`);
    // console.log("Getting comments map")
    // console.log(commentsMap)
    const commentIds = Object.keys(commentsMap);

    if (commentIds.length > 0) {
      // Create an array of promises for fetching user data
      const commentPromises = commentIds.map(async (commentId) => {
        const { userId, description } = JSON.parse(commentsMap[commentId]);
        // console.log("userID: " + userId + " description"+ description);
        const user = JSON.parse(await client.hGet("users", JSON.stringify(userId)));
        // console.log(user)
        if (user) {
          // Push comment data to the comments array
          comments.push({
            description,
            userId,
            username: user.username,
            imageUrl: user.imageUrl,
          });
        }
      });

      // Wait for all user data to be fetched
      await Promise.all(commentPromises);
    }

    // console.log("Returning comments", comments.length);
    return comments;
  } catch (error) {
    console.log(error);
    return [];
  }
};

