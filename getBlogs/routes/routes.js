import express from "express";
import { getBlogById, getBlogs } from "../controller/getBlogs.js";

const router = express.Router();

router.route("/").get(getBlogs);
router.route("/:id").get(getBlogById);

export default router;
