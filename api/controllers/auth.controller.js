const userModel = require("../models/user.model");

class AuthController {
  async register(req, res) {
    const { username, password } = req.body;
    let isExistUser = false;

    try {
      const userByUsername = await userModel.findOne({ username: username });
      isExistUser = userByUsername ? true : false;
    } catch (error) {
      return res.status(500).json({
        msg: "Server error",
      });
    }

    if (isExistUser) {
      return res.status(400).json({
        msg: "User already exists",
      });
    }

    const newUser = await userModel.create({
      username,
      password,
    });

    res.status(201).json({
      data: {
        username,
      },
    });
  }

  async login(req, res) {
    const { username, password } = req.body;
    let isExistUser = false;

    try {
      const userByUsername = await userModel.findOne({ username: username });
      isExistUser = userByUsername ? true : false;
    } catch (error) {
      return res.status(500).json({
        msg: "Server error",
      });
    }

    if (!isExistUser) {
      return res.status(400).json({
        msg: "User not found",
      });
    }
  }
}

module.exports = AuthController;
