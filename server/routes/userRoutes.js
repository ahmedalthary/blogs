const express = require("express");
const router = express.Router();
const authenticationUserController = require("../controller/auathenticationUserController");

router.post("/register", authenticationUserController.register);
router.post("/login", authenticationUserController.login);
router.get("/users", authenticationUserController.allUsers);
router.get("/users/:uuid", authenticationUserController.user);

module.exports = router;
