import db from "../config/db.js";
const User = db.User;
const Post = db.Post;
const Comment = db.Comment;

export const addComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId, comment } = req.body;
    if (!userId || !comment) {
      return res.status(400).json({
        status: false,
        message: "All fields are required.",
      });
    }

    const postExist = await Post.findOne({
      where: {
        id: postId,
      },
    });
    if (!postExist) {
      return res.status(400).json({
        status: false,
        message: "Post does not exist.",
      });
    }
    const addComment = await Comment.create({
      postId,
      userId,
      comment,
    });
    if (!addComment) {
      return res.status(400).json({
        status: false,
        message: "Error occurred while creating comment.",
      });
    }
    return res.status(200).json({
      status: true,
      message: "Comment added successfuly.",
      data: addComment,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

export const getCommentsPerPost = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findOne({
      where: {
        id: id,
      },
      attributes: ["id", "title", "description"],
      include: {
        model: User,
        attributes: ["name"],
      },
    });
    if (!post) {
      return res.status(400).json({
        status: false,
        message: "Post does not exist.",
      });
    }

    const comments = await Comment.findAll({
      where: { postId: id },
      attributes: ["id", "comment", "createdAt", "updatedAt"],
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });

    const responseData ={
        postId:post.id,
        title:post.title,
        description:post.description,
        authorName:post.user.name,
        comments:comments
    }

    return res.status(200).json({
      status: true,
      message: "Comments fetched successfully.",
      data: responseData,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};
