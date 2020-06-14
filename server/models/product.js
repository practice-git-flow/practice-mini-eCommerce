'use strict';
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize

  class Product extends Model{}

  Product.init({
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    price: DataTypes.FLOAT
  }, { sequelize });

  Product.associate = function(models) {
    Product.belongsToMany(models.User, { through: 'Carts' })
  };

  return Product;
};