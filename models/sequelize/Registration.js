'use strict';

var bcrypt = require('bcrypt-nodejs');
var crypto = require('crypto');

//HMAC version
// var secrets = require('../config/secrets');
// function createHash(string) {
//   if(!string)
//     return null;

//   var hashKey = secrets.localAuth.hashKey;
//   var hmac = crypto.createHmac(secrets.localAuth.hashMethod, new Buffer(hashKey, 'utf-8'));
//   return hmac.update(new Buffer(string, 'utf-8')).digest('hex');
// }


module.exports = function(db, DataTypes) {
  var Registration = db.define('Registration', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    studentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    classId: DataTypes.INTEGER,
    createdAt:  { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updatedAt:  { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  }, {
    tableName: 'registrations',
    classMethods: {
      associate: function(models) {
      }
    }
  });

  return Registration;
};