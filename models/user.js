module.exports = function (sequelize, DataTypes) {
  let User = sequelize.define("User", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 50];
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 20]
      };
    },
    last_login: {
      type: DataTypes.DATE
    },
    status: {
      type: DataTypes.ENUM("active, inactive"),
      defaultValue: active
    }
  });
  User.associate = function (models) {
    User.hasMany(models.Review, {
      onDelete: "cascade"
    });
  };
  User.associate = function(models) {
    User.hasMany(models.Movie);
  }
  return User;
}