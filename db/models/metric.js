const Sequelize = require("sequelize");
const setupDatabase = require("../lib/db");

module.exports = function setupMetricModel(config) {
  const sequelize = setupDatabase(config);

  return sequelize.define("metric", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    type: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    value: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    agentId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  });
};
