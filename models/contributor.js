module.exports = function(sequelize, DataTypes) {
  //craetes a "Contributor" model that will match to db
  var Contributor = sequelize.define("Contributor", {
    //the name of the contibutor in text form

    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [1] },
    },
    //the specialty if any of the contributor
    specialty: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    //the title of the contributor
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [1] },
    },
    //email
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [1] },
    },
    //password
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [3] },
    },
  });

  Contributor.associate = function(models) {
    Contributor.hasMany(models.Video, {
      onDelete: "cascade",
    });
  };

  return Contributor;
};
