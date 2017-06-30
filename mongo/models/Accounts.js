var mongoose = require('mongoose');
var utils = require('../mongoose-utils');

module.exports = function() {

  var ObjectId = mongoose.Schema.ObjectId;

  var Accounts = new mongoose.Schema({

    // first_name : { type: String, required:true, index: true, lowercase: true, trim:true, unique: true, validate: [util.validate.email, 'not valid'] },
    // _id : { type: ObjectId, required: true, index: true}
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
