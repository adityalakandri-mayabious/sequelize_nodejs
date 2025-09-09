import db from "../config/db.js";
const Post = db.Post;
const User = db.User;

export const createPost = async (req, res) => {
  try {
    const { title, description, userId } = req.body;
    if (!title || !description || !userId) {
      return res.status(400).json({
        status: false,
        message: "All fields are required.",
      });
    }
    const userExist = await User.findOne({
      where: {
        id: userId,
      },
    });
    if (!userExist) {
      return res.status(400).json({
        status: false,
        message: "User not found.",
      });
    }
    const post = await Post.create({
      title,
      description,
      userId,
    });
    if (!post) {
      return res.status(400).json({
        status: false,
        message: "Error creating post.",
      });
    }
    return res.status(200).json({
      status: true,
      message: "Post created successfully.",
      data: post,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: {
        model: User,
        attributes: ["name"],
        required: true,
      },
    });
    if (posts.length === 0) {
      return res.status(400).json({
        status: false,
        message: "No posts found.",
      });
    }
    return res.status(200).json({
      status: true,
      message: "Data fetched successfully.",
      total: posts.length,
      data: posts,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

export const getPostsById = async (req, res) => {
  try {
    const { id } = req.params;
    const posts = await Post.findOne({
      where: {
        id: id,
      },
      include: {
        model: User,
        attributes: ["name", "city"],
      },
    });
    if (posts.length === 0) {
      return res.status(400).json({
        status: false,
        message: "No posts found.",
      });
    }
    return res.status(200).json({
      status: true,
      message: "Data fetched successfully.",
      total: posts.length,
      data: posts,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, userId } = req.body;
    if (!title || !description || !userId) {
      return res.status(400).json({
        status: false,
        message: "All fields are required.",
      });
    }
    const postExist = await Post.findOne({
      where: {
        id: id,
      },
    });
    if (!postExist) {
      return res.status(400).json({
        status: false,
        message: "Post does not exist.",
      });
    }
    if (postExist.userId === !userId) {
      return res.status(400).json({
        status: false,
        message: "You are not allowed to do this operation.",
      });
    }
    const updatePost = await Post.update(
      {
        title,
        description,
        userId,
      },
      {
        where: {
          id: id,
        },
      }
    );
    if (!updatePost) {
      return res.status(400).json({
        status: false,
        message: "Error occurred while updating data.",
      });
    }
    return res.status(200).json({
      status: true,
      message: "Data updated successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const postExist = await Post.findOne({
      where: {
        id: id,
      },
    });
    if (!postExist) {
      return res.status(400).json({
        status: false,
        message: "Post not found.",
      });
    }
    const deletePost = await Post.destroy({
      where: {
        id: id,
      },
    });
    if (!deletePost) {
      return res.status(400).json({
        status: false,
        message: "Error deleting data.",
      });
    }
    return res.status(200).json({
      status: true,
      message: "Data deleted successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};
