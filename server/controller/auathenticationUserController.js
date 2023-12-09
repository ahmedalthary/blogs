const { User } = require("../models");

module.exports = {
  async register(req, res) {
    try {
      const user = await User.create(req.body);
      return res.json(user);
    } catch (err) {
      return res.status(400).json({
        error: `Failed to create the account:${err.errors[0].message}`,
      });
    }
  },
  async login(req, res) {
    try {
      const { Email, Password } = req.body;
      if (!Email || !Password) {
        return res.status(400).json({
          error: "Both email and password are required for login.",
        });
      }
      const user = await User.findOne({
        where: { Email },
      });
      if (!user) {
        return res.status(403).json({
          error: "The login information was incorrect.",
        });
      }
      const isPasswordValid = Password === user.Password;
      if (!isPasswordValid) {
        return res.status(403).json({
          error: "The login information was incorrect.",
        });
      }
      res.json(user);
    } catch (err) {
      return res.status(500).json({
        error: "An error has occurred trying to login.",
      });
    }
  },
  async allUsers(req, res) {
    try {
      //   const post = await Post.findAll({ include: [User] }); /*if i do not specify an alias name for the user model in static associate in post.js file and we can use include only if we add relation between both models (prim key and forg key) in static associate */
      //   const post = await Post.findAll({
      //     include: [{ model: User, as: "Users" }],
      //   });/*if we specify an alias name for the user model in static associate in users.js*/

      // const user = await User.findAll({
      //   include: ["Posts"],
      // }); /*1-other way if we specify an alias name for the user model in static associate in users.js 2- we put in array ['Posts'] if we will add more than one relation like ['Posts','Articles']*/
      const users = await User.findAll({
        include: "Posts",
      }); /*other way if we specify an alias name for the user model in static associate in users.js*/
      if (users.length === 0) {
        return res.json("There are no users yet");
      }
      return res.json(users);
    } catch (err) {
      return res.status(500).json({
        error: "Something went wrong. Unable to fetch users at the moment.",
      });
    }
  },
  async user(req, res) {
    const uuid = req.params.uuid;
    try {
      const user = await User.findOne({
        where: { uuid },
        include: "Posts",
      });
      if (!user) {
        return res.status(400).json({
          error: "User not found Please review your search parameters.",
        });
      }
      return res.json(user);
    } catch (err) {
      return res.status(500).json({
        error: "Something went wrong. Unable to fetch the user at the moment.",
      });
    }
  },
};
