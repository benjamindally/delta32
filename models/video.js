module.exports = function(sequelize, DataTypes) {
  var Video = sequelize.define("Video", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [1] },
    },

    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [3, 140] },
    },

    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [1] },
    },

    keywordOne: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [1] },
    },

    keywordTwo: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    keywordThree: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  Video.associate = function(models) {
    Video.belongsTo(models.Contributor, {
      foreignKey: {
        allowNull: false,
      },
    });
  };

  return Video;
};
