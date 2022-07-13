const express = require("express");
require("dotenv").config();
const authRoute = require("./routes/auth.route");

const app = express();

app.use("/api/v1/auth", authRoute);

const PORT = process.env.PORT || 1911;
app.listen(PORT, () => console.log("api listening on port " + PORT));
