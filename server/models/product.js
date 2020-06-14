'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    price: DataTypes.FLOAT
  }, {});
  Product.associate = function(models) {
    // associations can be defined here
  };
  return Product;
};