require("dotenv/config");
const jwt = require("jsonwebtoken");
const { User } = require("../Db/Models");

const unauthorizedStatus = 401;

const verifyToken = async (request, response, next) => {
    const token = request.headers["authorization"];

    if (!token)
        return response.status(unauthorizedStatus).json({
            message: `No token provided`,
        });
    try {
        const decoded = jwt.verify(token, process.env.SECRET_TOKEN);
        const user = await User.findByPk(decoded.id);
        if (!user) {
            return response.status(401).json({ message: `Unauthorized token` });
        }
        request.user = data.dataValues;
        next();
    } catch (error) {
        return response.status(401).json({ message: `${error} ${token}` });
    }
};

module.exports.verifyToken = verifyToken;
