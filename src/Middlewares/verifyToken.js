require("dotenv/config");
const jwt = require("jsonwebtoken");
// const db = require("../database");
// const User = db.users;

const unauthorizedStatus = 401;

const verifyToken = async (req, res, next) => {
    const token = req.headers["authorization"];

    if (!token)
        return res.status(unauthorizedStatus).json({
            message: `No token provided`,
        });
    try {
        const decoded = jwt.verify(token, process.env.SECRET_TOKEN);
        req.user = decoded.id;

        // const user = await User.findByPk(req.userId)
        // 	.then((data) => {
        // 		if (data) {
        // 			return data.dataValues;
        // 		}
        // 	})
        // 	.catch((err) => {
        // 		return res.status(404).json({ message: `${err.message} token` });
        // 	});

        // if (!user) return res.status(404).json({ message: "No user found" });

        next();
    } catch (error) {
        return res.status(401).json({ message: `${error} ${token}` });
    }
};

module.exports.verifyToken = verifyToken;
