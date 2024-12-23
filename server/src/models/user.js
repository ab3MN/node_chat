'use strict';

const { DataTypes, UUIDV4 } = require('sequelize');

const { sequelize } = require('../utils/db.js');

const User = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: 'users',
  },
);

module.exports = {
  User,
};
