const userModel = require("../models/user.model");

class UserController {
  async get(req, res) {
    try {
      const { id } = req.params;
      const user = await userModel.findOne({ id });
      return res.status(200).json({
        data: user,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const allUsers = await userModel.find({});
      return res.status(200).json({
        data: allUsers,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const userUpdate = await userModel.findByIdAndUpdate(id, {
        password: req.body.password,
      });
      return res.status(200).json({
        data: userUpdate.username,
        msg: "Updated user",
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}

module.exports = UserController;
