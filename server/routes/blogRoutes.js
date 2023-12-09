const express = require("express");
const router = express.Router();
const postController = require("../controller/postController");

router.post("/posts", postController.createPost);
router.get("/posts", postController.allPosts);
router.get("/posts/:uuid", postController.post);
router.delete("/posts/:uuid", postController.deletePost);
router.put("/posts/:uuid", postController.updatePost);

module.exports = router;
