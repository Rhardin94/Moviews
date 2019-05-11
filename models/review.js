module.exports = function (sequelize, DataTypes) {
  let Review = sequelize.define("Review", {
    text: DataTypes.STRING,
    spoiler: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  });
  Review.associate = function(models) {
    Review.belongsTo(models.Movie, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  Review.associate = function(models) {
    Review.belongsTo(models.User), {
      foreignKey: {
        allowNull: false
      }
    }
  }
  return Review;
}