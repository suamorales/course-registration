'use strict';
var db = require('../models/sequelize');
var async = require('async');
var _ = require('lodash')

/**
 * GET /
 * Registration Page
 */

exports.getSubjectsView = function(req, res) {
  var subjects;
  var courses;

  db.Subject.findAll().then(function(allSubjects){
    subjects = allSubjects;
  }).then(
	db.Course.findAll().then(function(allCourses) {
    res.render('subjects', { title: "register", subjects:subjects,  courses:allCourses });
	}).catch(
    function(err){
      console.log(err);
    })
	).catch(
    function(err){
      console.log(err);
    });
};

exports.getClassesBySubjectView = function(req, res){
  res.render('subjects', { title: "Class list" });
};

exports.getClassesBySubject = function(req, res) {
  var subjectId = req.params.id;
  var userId = req.user.id;

  db.Registration.findAll({ where: {studentId: userId} }).then(function(registrations){
    registrations = _.map(registrations, 'classId');
    db.Course.findAll({ where: { subjectId: subjectId}}).then(function(courses) {
        res.render('class-list', { title: "Class list", courses: courses, registrations: registrations });
      }).catch(function(err) {
        console.error(err);
      });

  }).catch(function(err){
    res.send('500 Error Occurred');
  });
};

exports.register = function(req, res) {
  var userId = req.user.id;

  db.Registration.create({
    studentId:userId,
    classId : req.params.courseId
  }).then(function(registration) {
    db.Course.findOne({ where: { id: req.params.courseId }}).then(function(course){
      var capacity = course.capacity;
      var id = course.id;
      db.Course.update({ capacity: capacity - 1},
                        { 
                          fields: ['capacity'],
                          where: { id: id }
                        }).then(function() {
          req.flash('success', { msg: 'Registration Successful'});
          res.redirect('/subjects');
        })
    })
  });
};

exports.deregister = function(req, res) {
  var userId = req.user.id;
  
  db.Registration.destroy({ where: {
      classId: req.params.courseId,
      studentId: userId
    }}).then(function(registration) {
    console.log("REGISTRATION", registration);

    db.Course.findOne({ where: { id: req.params.courseId }}).then(function(course){
      var capacity = course.capacity;
      var id = course.id;
      db.Course.update({ capacity: capacity + 1},
                        { 
                          fields: ['capacity'],
                          where: { id: id }
                        }).then(function() {
          req.flash('success', { msg: 'Deregistration Successful'});
          res.redirect('/subjects');
        })
    })
  });
};

exports.getCurrentCourses = function(req, res) {
  var userId = req.user.id;
  db.sequelize.query("SELECT * FROM `registrations` INNER JOIN `courses` ON `registrations`.`classId`=`courses`.id WHERE `studentId`= $1", { bind: [userId], type: db.sequelize.QueryTypes.SELECT }).then(function(currentCourses, metadata) {
    res.render('currentCourses', {title: 'Currently Registered', currentCourses: currentCourses });
  });
};

