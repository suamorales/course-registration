'use strict';
var db = require('../models/sequelize');
var async = require('async');

/**
 * GET /
 * Registration Page
 */

exports.getRegistrationView = function(req, res) {
  var subjects;
  var courses;

  db.Subject.findAll().then(function(allSubjects){
    subjects = allSubjects;
  }).then(
	db.Course.findAll().then(function(allCourses) {
    res.render('register', { title: "register", subjects:subjects,  courses:allCourses });
	}).catch(
    function(err){
      console.log(err);
    })
	).catch(
    function(err){
      console.log(err);
    });
};

exports.register = function(req, res) {
  
};
