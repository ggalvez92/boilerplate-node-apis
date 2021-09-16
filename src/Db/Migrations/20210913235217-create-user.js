"use strict";
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("Users", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            firstName: {
                type: Sequelize.STRING,
                field: "first_name",
            },
            lastName: {
                type: Sequelize.STRING,
                field: "last_name",
            },
            email: {
                type: Sequelize.STRING,
            },
            password: {
                type: Sequelize.STRING,
            },
            createdAt: {
                allowNull: false,
                defaultValue: Sequelize.literal("NOW()"),
                type: Sequelize.DATE,
                field: "created_at",
            },
            updatedAt: {
                allowNull: false,
                defaultValue: Sequelize.literal("NOW()"),
                type: Sequelize.DATE,
                field: "updated_at",
            },
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable("Users");
    },
};
