'use strict';
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize

  class Cart extends Model{}

  Cart.init({
    UserId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER,
    total_price: DataTypes.FLOAT,
    tax: DataTypes.FLOAT,
    quantity: {
      type: DataTypes.INTEGER,
      validate: {
        min: {
          args: 1,
          msg: ` Please input quantity`
        }
      }
    }
  }, { sequelize });

  Cart.associate = function(models) {
    Cart.belongsTo(models.User, { foreignKey: 'UserId', targetKey: 'id' })
    Cart.belongsTo(models.Product, { foreignKey: 'ProductId', targetKey: 'id' })
  };
  
  return Cart;
};