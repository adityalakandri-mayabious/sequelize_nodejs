import express from "express";
import {
  createPost,
  getAllPosts,
  getPostsById,
  deletePost,
  updatePost
} from "../controllers/PostController.js";

const router = express.Router();

router.post("/create-post", createPost);
router.get("/get-posts", getAllPosts);
router.get("/get-post-by-id/:id", getPostsById);
router.put("/update-post/:id", updatePost);
router.delete("/delete-post/:id", deletePost);

export default router;
