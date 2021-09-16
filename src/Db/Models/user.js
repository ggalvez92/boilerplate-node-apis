"use strict";
const bcrypt = require("bcrypt");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    User.init(
        {
            firstName: {
                type: DataTypes.STRING,
                field: "first_name",
            },
            lastName: {
                type: DataTypes.STRING,
                field: "last_name",
            },
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            createdAt: {
                type: DataTypes.DATE,
                defaultValue: sequelize.literal("NOW()"),
                field: "created_at",
            },
            updatedAt: {
                type: DataTypes.DATE,
                defaultValue: sequelize.literal("NOW()"),
                field: "updated_at",
            },
        },
        {
            sequelize,
            modelName: "User",
        }
    );
    User.addHook("beforeCreate", async (user) => {
        const salt = await bcrypt.genSaltSync(10);
        user.password = await bcrypt.hashSync(user.password, salt);
    });
    User.validatePassword = async function (password, receive_password) {
        return await bcrypt.compare(password, receive_password);
    };
    return User;
};
