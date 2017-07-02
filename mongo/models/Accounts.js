var mongoose = require('mongoose');
var utils = require('../mongoose-utils');

module.exports = function() {

  var ObjectId = mongoose.Schema.ObjectId;

  var enumGender = ['male', 'female'];
  var enumHandedness = ['right', 'left'];
  var enumSecurityTraining = ['yes', 'no'];
  var enumPasswordAwareness = ['yes', 'no'];
  var enumAccountHijackingInvolvement = ['yes', 'no'];

  var Accounts = new mongoose.Schema({

    // first_name : { type: String, required:true, index: true, lowercase: true, trim:true, unique: true, validate: [util.validate.email, 'not valid'] },
    // _id : { type: ObjectId, required: true, index: true}
    questionnaire: {
      gender: { type: String, enum: enumGender },
      handedness: { type: String, enum: enumHandedness },
      age: { type: String },
      occupation: { type: String },
      security_training: { type: String, enum: enumSecurityTraining },
      password_awareness: { type: String, enum: enumPasswordAwareness },
      password_awareness_level: { type: Number, min: 1, max: 5 },
      computer_skills_level: { type: Number, min: 1, max: 5 },
      account_hijacking_involvement: { type: String, enum: enumAccountHijackingInvolvement }
    },
    personalities: {
      extraversion: { type: Number },
      agreeableness: { type: Number },
      conscientiousness: { type: Number },
      neuroticism: { type: Number },
      intellect: { type: Number }
    },
    userAwakeAnswers: [{
      answer: { type: String },
      question: { type: String }
    }],
    rankedPasswords: [{
      password: {type: String, default: "" },
      realScore: {type: Number, default: -1},
      userScore: {type: Number, default: -1}
    }],
    'bank-password-selection': {
      score: {type: Number},
      leak: {type: String},
      password: {type: String},
      justification: {type: String},
      _id: {type: ObjectId}
    },
    'bank-password-creation': {
      score: {type: Number},
      leak: {type: String},
      password: {type: String},
      justification: {type: String},
      _id: {type: ObjectId}
    },
    'email-password-selection': {
      score: {type: Number},
      leak: {type: String},
      password: {type: String},
      justification: {type: String},
      _id: {type: ObjectId}
    },
    'email-password-creation': {
      score: {type: Number},
      leak: {type: String},
      password: {type: String},
      justification: {type: String},
      _id: {type: ObjectId}
    }
  }, {strict:true, collection: 'accounts' });

  // Export
  return mongoose.model('Accounts', Accounts);

};
