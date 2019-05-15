// eslint-disable-next-line no-undef
module.exports = function(sequelize, DataTypes) {
  let Movie = sequelize.define("Movie", {
    title: DataTypes.STRING,
    posterURL: DataTypes.STRING,
    createdAt: {
      type: DataTypes.DATE
    },
    updatedAt: {
      type: DataTypes.DATE
    }
  });
  Movie.associate = function(models) {
    Movie.hasMany(models.Review, {
      onDelete: "cascade"
    });
  };
  return Movie;
};
  