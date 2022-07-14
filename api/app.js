const express = require("express");
const path = require("path");
const cors = require("cors");
var cookieParser = require("cookie-parser");
const connect = require("./configs/mongo");
require("dotenv").config();
const authRoute = require("./routes/auth.route");
const userRoute = require("./routes/user.route");

const app = express();
app.use(cors());
app.use(cookieParser());
// path.join('/a', '/b') // Outputs '/a/b'
// path.resolve('/a', '/b') // Outputs '/b'
// b có dấu / nó hiểu là đường dẫn tuyệt đối nó sẽ lấy luôn
app.use("/public", express.static(path.join(__dirname, "public")));
app.use(express.json());
// Kiểu mã hóa được dùng ở đây là kiểu URL Encoded.
// Hiểu đơn giản thì dữ liệu được biểu diễn dưới dạng (key, value),
// nối với nhau bằng ký hiệu & thành một chuỗi (long string).
// Trong mỗi cặp (key, value), key và value tách nhau bở dấu =
// Ví dụ: key1=value1&key2=value2

app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/user", userRoute);

const PORT = process.env.PORT || 1911;
connect();
app.listen(PORT, () => console.log("api listening on port " + PORT));
