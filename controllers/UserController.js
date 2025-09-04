import db from "../config/db.js";
const User = db.User;

export const test = async (req, res) => {
  return res.send("Hello");
};

export const createUser = async (req, res) => {
  try {
    const { name, email, city } = req.body;
    if (!name || !email || !city) {
      return res.status(400).json({
        status: false,
        message: "All fields are required.",
      });
    }
    const user = await User.create({
      name,
      email,
      city,
    });
    if (!user) {
      return res.status(400).json({
        status: false,
        message: "Error while creating user.",
      });
    }
    return res.status(400).json({
      status: false,
      message: "User created successfully.",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    if (!users) {
      return res.status(400).json({
        status: false,
        message: "No data found.",
      });
    }
    return res.status(200).json({
      status: true,
      message: "Data fetched successfully.",
      data: users,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

export const getUsersById = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findOne({
      where: {
        id: userId,
      },
    });
    if (!user) {
      return res.status(400).json({
        status: false,
        message: "No data found.",
      });
    }
    return res.status(200).json({
      status: true,
      message: "Data fetched by id successfully.",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

export const updateUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    const { name, city } = req.body;
    if (!name || !city) {
      return res.status(400).json({
        status: false,
        message: "All fields are required.",
      });
    }
    const user = await User.findOne({
      where: {
        id: userId,
      },
    });
    if (!user) {
      return res.status(400).json({
        status: false,
        message: "User not found.",
      });
    }
    const update = await User.update(
      {
        name,
        city,
      },
      {
        where: {
          id: userId,
        },
      }
    );
    console.log(update)
    if (!update) {
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

export const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findOne({
      where: {
        id: userId,
      },
    });
    if (!user) {
      return res.status(400).json({
        status: false,
        message: "User not found.",
      });
    }
    const delUser = await User.destroy({
      where: {
        id: userId,
      },
    });
    if (!delUser) {
      return res.status(400).json({
        status: false,
        message: "Error deleting data.",
      });
    }
    return res.status(200).json({
      status: true,
      message: "User deleted successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};
