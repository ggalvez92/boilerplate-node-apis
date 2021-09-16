"use strict";
const bcrypt = require("bcrypt");

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const user = {
            first_name: "Super Admin",
            password: "yupi",
            email: "super@admin.com",
        };
        const salt = await bcrypt.genSaltSync(10);
        user.password = await bcrypt.hashSync(user.password, salt);
        await queryInterface.bulkInsert("Users", [user], {});
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete("Users", null, {});
    },
};
