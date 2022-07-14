const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

class AuthController {
  async register(req, res) {
    const { username, password } = req.body;
    let isExistUser;
    try {
      const userByUsername = await userModel.findOne({ username: username });
      isExistUser = userByUsername ? true : false;
    } catch (error) {
      return res.status(500).json({
        msg: "Server error" + error.message,
      });
    }

    if (isExistUser) {
      return res.status(400).json({
        msg: "User already exists",
      });
    }

    try {
      await userModel.create({
        username,
        password,
      });

      const token = jwt.sign({ username }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1d",
      });

      const refreshToken = jwt.sign(
        { username },
        process.env.REFRESH_TOKEN_SECRET,
        {
          expiresIn: "30d",
        }
      );

      // nếu các cookies được gắn HttpOnly thì chỉ server có quyền thao tác đến các cookies này.
      // token: localstorage
      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        sameSite: "None",
        secure: true,
        maxAge: 24 * 60 * 60 * 1000 * 30,
      });

      return res.status(201).json({
        data: {
          username,
          token,
        },
      });
    } catch (error) {
      return res.status(500).json({
        msg: "Server error",
      });
    }
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

    return res.status(200).json({
      data: {
        username,
      },
    });
  }

  // when token expired call refresh token api to get new token to continue access resource
  async refreshToken(req, res) {
    if (req.cookies?.jwt) {
      // Destructuring refreshToken from cookie
      const refreshToken = req.cookies.jwt;

      // Verifying refresh token
      jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
          if (err) {
            // Wrong Refesh Token
            return res.status(406).json({ message: "Unauthorized" });
          } else {
            // Correct token we send a new access token
            const accessToken = jwt.sign(
              {
                username: decoded.username,
              },
              process.env.ACCESS_TOKEN_SECRET,
              {
                expiresIn: "1d",
              }
            );
            return res.json({ accessToken });
          }
        }
      );
    } else {
      return res.status(406).json({ message: "Unauthorized" });
    }
  }
}

module.exports = AuthController;
