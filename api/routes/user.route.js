const express = require("express");
const UserController = require("../controllers/user.controller");
const router = express.Router();
const userController = new UserController();

router.get("/", userController.getAll);
router.get("/:id", userController.get);
router.put("/:id", userController.update);

module.exports = router;
