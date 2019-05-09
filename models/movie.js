module.exports = function(sequelize, DataTypes) {
  let Movie = sequelize.define("Movie", {
    title: DataTypes.STRING,
    posterURL: DataTypes.STRING
  });
  Movie.associate = function(models) {
    Movie.hasMany(models.Review, {
      onDelete: "cascade"
    });
  };
  Movie.associate = function(models) {
    Movie.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    })
  }
  return Movie;
};
  