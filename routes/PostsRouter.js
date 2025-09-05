import express from "express";
import {
  createPost,
  getAllPosts,
  getPostsById,
} from "../controllers/PostController.js";

const router = express.Router();

router.post("/create-post", createPost);
router.get("/get-posts", getAllPosts);
router.get("/get-post-by-id/:id", getPostsById);

export default router;
