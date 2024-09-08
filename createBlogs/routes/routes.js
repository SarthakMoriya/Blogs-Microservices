import express from "express";
import { createBlog } from "../controller/createBlog.js";

const router = express.Router();

router.route("/").post(createBlog);

export default router;
