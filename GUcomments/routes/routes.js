import express from "express";
import {
  getCommentsByBlogId,
  updateComment,
} from "../controller/commentController.js";
const router = express.Router();

router.put("/comment", updateComment);
router.get("/comment/:id", getCommentsByBlogId);
export default router;
