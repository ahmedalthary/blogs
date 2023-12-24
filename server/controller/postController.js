const { Post, User, Sequelize } = require("../models");
const multer = require("multer");
const path = require("path");
// upload image
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only JPEG, JPG, PNG, are allowed."));
    }
  },
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});
let postImage = upload.single("image");

module.exports = {
  createPost(req, res) {
    postImage(req, res, async (err) => {
      try {
        if (err) return res.status(400).json({ error: err.message });
        const Image = req.file ? req.file.path : null;
        const { Title, Snippet, Body, userUuid } = req.body;
        const user = await User.findOne({ where: { uuid: userUuid } });
        if (!user) {
          return res.status(401).json({
            error: "Unauthorized: User must be logged in or have an account.",
          });
        }
        const post = await Post.create({
          Image,
          Title,
          Snippet,
          Body,
          UserId: user.id,
        });
        // return res.json(post);
        return res.json({
          message: "Post created successfully.",
          redirect: "Posts",
        });
      } catch (err) {
        if (err instanceof Sequelize.ValidationError) {
          // const errorMessages = err.errors.map((error) => error.message);
          return res.status(400).json({
            error: `Failed to create the post: ${err.errors[0].message}`,
          });
        }
        return res.status(500).json({
          error: "Failed to create the post. Please try again later.",
        });
      }
    });
  },

  async allPosts(req, res) {
    try {
      //   const post = await Post.findAll({ include: [User] }); /*if i do not specify an alias name for the user model in static associate in post.js file and we can use include only if we add relation between both models (prim key and forg key) in static associate */
      //   const post = await Post.findAll({
      //     include: [{ model: User, as: "Users" }],
      //   });/*if we specify an alias name for the user model in static associate in post.js*/

      //   const post = await Post.findAll({
      //     include: ["User"],
      //   }); /*1- other way if we specify an alias name for the user model in static associate in post.js 2- we put in array ['Posts'] if we will add more than one relation like ['Posts','Articles']*/

      const posts = await Post.findAll({
        include: "User",
      }); /*other way if we specify an alias name for the user model in static associate in post.js*/
      if (posts.length === 0) {
        return res.json("There are no posts yet");
      }
      return res.json(posts);
    } catch (err) {
      return res.status(500).json({
        error: "Something went wrong. Unable to fetch posts at the moment.",
      });
    }
  },
  async post(req, res) {
    const uuid = req.params.uuid;
    try {
      const post = await Post.findOne({
        where: { uuid },
        include: "User",
      });
      if (!post) {
        return res.status(400).json({
          error: "Post not found Please review your search parameters.",
        });
      }
      return res.json(post);
    } catch (err) {
      return res.status(500).json({
        error: "Something went wrong. Unable to fetch the post at the moment.",
      });
    }
  },
  async searchResult(req, res) {
    const searchQuery = req.query.q;
    try {
      if (searchQuery.length > 0) {
        const posts = await Post.findAll({
          where: {
            Title: {
              [Sequelize.Op.like]: `%${searchQuery}%`,
            },
          },
          include: "User",
        });
        if (posts.length === 0) {
          return res.status(400).json({
            error: `No result for '${searchQuery}'`,
          });
        }
        return res.json(posts);
      }
      return res.json([]);
    } catch (err) {
      return res.status(500).json({
        error:
          "Something went wrong,Unable to find results for your search, please try again later.",
      });
    }
  },
  async deletePost(req, res) {
    try {
      const uuid = req.params.uuid;
      await Post.destroy({
        where: { uuid },
      });
      return res.json({
        message: "Post deleted successfully.",
        redirect: "Posts",
      });
    } catch (err) {
      return res.status(500).json({
        error: "Failed to delete the post. Please try again later.",
      });
    }
  },
  updatePost(req, res) {
    postImage(req, res, async (err) => {
      try {
        if (err) return res.status(400).json({ error: err.message });
        const uuid = req.params.uuid;
        const Image = req.file ? req.file.path : null;
        const { Title, Snippet, Body } = req.body;
        await Post.update(
          {
            Image,
            Title,
            Snippet,
            Body,
          },
          {
            where: { uuid },
          }
        );
        return res.json({
          message: "Post updated successfully.",
        });
      } catch (err) {
        if (err instanceof Sequelize.ValidationError) {
          // const errorMessages = err.errors.map((error) => error.message);
          return res.status(400).json({
            error: `Failed to update the post: ${err.errors[0].message}`,
          });
        }
        return res.status(500).json({
          error: "Failed to update the post. Please try again later.",
        });
      }
    });
  },
};
