module.exports = function (sequelize, DataTypes) {
  let Review = sequelize.define("review", {
    text: DataTypes.STRING,
    spoiler: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });
  return Review;
}