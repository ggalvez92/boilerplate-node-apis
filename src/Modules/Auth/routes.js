const router = require("express").Router();
const UserController = require("./Controllers/UserController");

router.post("/login", UserController.login);
router.post("/signup", UserController.signup);

module.exports = router;
