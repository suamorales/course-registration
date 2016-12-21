var db = require('../models/sequelize');

exports.getCourses = function(req, res) {
  db.Course.findAll().then(function(docs) {
    res.json(docs);
  });
};