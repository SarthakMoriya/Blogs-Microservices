import express from "express";
import {
  getCommentsByBlogId,
  updateComment,
} from "../controller/commentController.js";
const router = express.Router();

router.put("/comment", updateComment);
router.delete("/comment/:commentId", getCommentsByBlogId);
export default router;
