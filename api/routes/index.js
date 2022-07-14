const authRoute = require("./auth.route");
const userRoute = require("./user.route");

const routeApp = (app) => {
  app.use("/api/v1/auth", authRoute);
  app.use("/api/v1/user", userRoute);
};

module.exports = routeApp;
