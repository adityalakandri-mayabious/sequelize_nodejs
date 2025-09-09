import express from "express";
import { addComment, getCommentsPerPost } from "../controllers/CommentController.js";

const router = express.Router();

router.post('/add-comment/:postId',addComment)
router.get('/get-comments/:id',getCommentsPerPost)

export default router;
