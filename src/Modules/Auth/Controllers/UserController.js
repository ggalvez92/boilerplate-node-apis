const { responsesTypes } = require("../../../config/responsesTypes");
const { User } = require("../../../db/models");
const jwt = require("jsonwebtoken");

const generateToken = (user) => {
    const token = jwt.sign({ id: user.id }, process.env.SECRET_TOKEN, {
        expiresIn: 86400,
    });
    return token;
};

const login = async (request, response) => {
    const { email, password } = request.body;
    let result = {
        success: false,
        message: "",
        data: {},
    };
    try {
        const userFound = await User.findOne({ where: { email } });
        if (!userFound) {
            result.data.errors = {
                email: ["Correo o clave inválidos"],
            };
            return response.status(responsesTypes.errorFields).send(result);
        }
        const validatePassword = await User.validatePassword(
            password,
            userFound.password
        )
            .then((data) => {
                if (data) {
                    return data;
                }
            })
            .catch((err) => {
                result.msg = err.message;
                res.status(400).send(result);
            });

        if (!validatePassword) {
            result.data.errors = {
                email: ["Correo o clave inválidos"],
            };
            return response.status(responsesTypes.errorFields).send(result);
        }
        result.data = {
            email: userFound.email,
            firstName: userFound.firstName,
            lastName: userFound.lastName,
        };
        result.message = "Bienvenido";
        data.token = generateToken(userFound);
        return response.status(responsesTypes.ok).send(result);
    } catch (error) {
        result.message = error;
        response.status(responsesTypes.serverError).send(result);
    }
};

const signup = async (request, response) => {
    let result = {
        success: false,
        message: "",
        data: {},
    };
    const { firstName, email, password } = request.body;
    try {
        const userExists = await User.findOne({ where: { email } });
        if (userExists) {
            result.data.errors = {
                email: ["Este correo ya se encuentra registrado"],
            };
            return response.status(responsesTypes.errorFields).send(result);
        }
    } catch (error) {
        result.message = error;
        return response.status(responsesTypes.serverError).send(result);
    }
    try {
        await User.create({
            firstName,
            password,
            email,
        });
        result.success = true;
        result.message = "Registro exitoso";
        return response.status(responsesTypes.ok).send(result);
    } catch (error) {
        result.message = error;
        return response.status(responsesTypes.serverError).send(result);
    }
};

module.exports = {
    login,
    signup,
};
