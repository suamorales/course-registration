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
  var Course = db.define('Course', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    professorId: DataTypes.INTEGER,
    subjectId: DataTypes.INTEGER,
    description: DataTypes.STRING,
    name: DataTypes.STRING,
    number: DataTypes.STRING,
    fall: DataTypes.BOOLEAN,
    spring: DataTypes.BOOLEAN,
    summer: DataTypes.BOOLEAN,
    createdAt:  { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updatedAt:  { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  }, {
    tableName: 'courses',
    classMethods: {
      associate: function(models) {
        //User.hasMany(models.Role);
      }
    }
  });

  return Course;
};