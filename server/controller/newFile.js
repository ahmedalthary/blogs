const { Post, User } = require("../models");

module.exports = {
  async createPost(req, res) {
    const { Title, Snippet, Body, uuid } = req.body;
    try {
      const user = await User.findOne({ where: { uuid } });
      if (!user) {
        return res.status(401).json({
          error: "Unauthorized: User must be logged in or have an account.",
        });
      }
      const post = await Post.create({ Title, Snippet, Body, UserId: user.id });
      return res.json(post);
    } catch (err) {
      return res.status(400).json({
        error: `Failed to create the post:${err.errors[0].message}`,
      });
    }
  },
  async allPosts(req, res) {
    try {
      const post = await Post.findAll({ include: [User] }); // if i do not spicy
      if (post.length === 0) {
        return res.json("There are no posts yet");
      }
      return res.json(post);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
};
