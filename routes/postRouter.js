const express = require("express");
const postController = require("../controllers/postController");
const protect = require("../middlewares/authMiddlare");
const Router = express.Router();
Router.route("/").get(protect,postController.getAllPosts).post(protect,postController.createPost);
Router.route("/:id").get(postController.getOnePost).patch(postController.updatePost).delete(postController.deletePost);

module.exports = Router;