const express = require("express");
const authController = require("../controllers/authController");

const Router = express.Router();
Router.post("/signup",authController.singUp);
Router.post("/login",authController.login);


module.exports = Router;