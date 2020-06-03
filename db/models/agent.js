const Sequelize = require("sequelize");
const setupDatabase = require("../lib/db");

module.exports = function setupAgentModel(config) {
  const sequelize = setupDatabase(config);

  return sequelize.define("agent", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    hostname: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    pid: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    connected: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  });
};
