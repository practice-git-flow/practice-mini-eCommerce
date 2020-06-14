'use strict';
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize

  class User extends Model{}

  User.init({
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: false,
          msg: 'Wrong email format'
        },
        notEmpty: {
          args: false,
          msg: ` Email can't be empty`
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: false,
          msg: ` Password can't be empty`
        },
        len: {
          args: [8,20],
          msg: ` Password at least 8 characters and maximum 20 characters`
        }
      }
    },
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: false,
          msg: ` Name can't be empty`
        },
        len: {
          args: [8,50],
          msg: ` Name at least 2 characters and maximum 50 characters`
        }
      }
    },
    balance: DataTypes.FLOAT
  }, {
    hooks: {
      beforeCreate: (instance) => {
        instance.balance = 0
      }
    }, 
    sequelize });

  User.associate = function(models) {
    User.belongsToMany(models.Product, { through: 'Carts' })
  };

  return User;
};