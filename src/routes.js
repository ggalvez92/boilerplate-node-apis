const router = require("express").Router();
const AuthRoutes = require("./Modules/Auth/routes");

router.use("/auth", AuthRoutes);

module.exports.routes = router;
