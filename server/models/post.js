"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      this.belongsTo(User, { foreignKey: "UserId", as: "User" }); // 1-if we didnt specify the foreignKey the default will be the name of the mode "User"and "Id" so will be "UserID" but we should the foreignKey to create an alias name "as: 'name' 2- if we need to link with other column than the ID that is prim key the will link to it by default we write next to foreignKey 'Target:name of column' and in post we write 'sourceKey: name of the column' buz it will link to prim key column that is the ID "
    }
    toJSON() {
      return { ...this.get(), id: undefined, UserId: undefined };
    }
  }
  Post.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      Image:{
        type: DataTypes.STRING,
        allowNull: true,
        
      },
      Title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "The title of the blog can't be null." },
          notEmpty: { msg: "The title of the blog can't be an empty." },
          len: {
            args: [3, 20],
            msg: "The length of the title must be more than two characters and less than twenty characters",
          },
        },
      },
      Snippet: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Body: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "The body of the blog can't be null." },
          notEmpty: { msg: "The blog of the blog can't be an empty." },
          len: {
            args: [10, 200],
            msg: "The length of the blog must be more than ten characters and less than two hundred characters",
          },
        },
      },
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      hooks: {
        beforeValidate(instance) {
          if (instance.Snippet === "") {
            instance.Snippet = null;
          }
        },
      },
      sequelize,
      modelName: "Post",
    }
  );
  return Post;
};
