'use strict';

module.exports = function(db, DataTypes) {
    var Subject = db.define('Subject', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        subject: {
            type: DataTypes.STRING,
            allowNull: false
        },
        createdAt:  { type: DataTypes.DATE, defaultValue: DataTypes.NOW, allowNull: false},
        updatedAt:  { type: DataTypes.DATE, defaultValue: DataTypes.NOW, allowNull: false}
    },{
    tableName: 'subjects',
    classMethods: {
      associate: function(models) {
        //User.hasMany(models.Role);
      }
    }
  });

    return Subject;
};