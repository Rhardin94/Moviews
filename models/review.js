module.exports = function (sequelize, DataTypes) {
  let Review = sequelize.define("review", {
    text: DataTypes.STRING,
    spoiler: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });
  Review.associate = function(models) {
    Review.belongsTo(models.Movie, {
      foreignKey: {
        allowNull: false
      }
    });
  }
  return Review;
}