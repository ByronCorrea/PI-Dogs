const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Temperament",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },

    { timestamps: false }
  );
};
