import express from "express";
import { getBlogs } from "../controller/getBlogs.js";

const router = express.Router();

router.route("/").get(getBlogs);

export default router;
