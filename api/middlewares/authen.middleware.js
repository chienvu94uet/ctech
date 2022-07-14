const checkAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(403).send("A token is required for authentication");
    }
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.userId = decodedToken.userId;
    req.email = decodedToken.email;
    req.role = decodedToken.role;
    next();
  } catch (error) {
    return res
      .status(401)
      .send({ error: "Not authorized to access this resource" });
  }
};

const isAdmin = (req, res, next) => {
  if (req.user.role === "admin") {
    next();
  } else {
    return res
      .status(401)
      .send({ error: "Not authorized to access this resource" });
  }
};

module.exports = {
  isAdmin,
  checkAuth,
};
