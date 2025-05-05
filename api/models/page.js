'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Page extends Model {}
  Page.init({
    userId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    links: DataTypes.JSONB
  }, {
    sequelize,
    modelName: 'Page',
  });
  Page.associate = models => {
    Page.belongsTo(models.User, { foreignKey: 'userId' });
  };
  return Page;
};