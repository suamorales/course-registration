"use strict";
var db = require('../models/sequelize');

/**
 * GET /
 * Home page.
 */
exports.index = function(req, res) {
	res.render('home', {
		title: 'Home'
	});
};

exports.getCurrentCourses = function(req, res) {
  db.Registration.findAll({
    where: { studentId : userId},
    include: [ { model: Course } ]
  }).then(function(registrations) {
    console.log("registrations >>>>>>>>>>>>>>", registrations);
  });
};