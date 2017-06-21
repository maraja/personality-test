var mongoose = require('mongoose');
var utils = require('../mongoose-utils');

module.exports = function() {

  var ObjectId = mongoose.Schema.ObjectId;

  var RockyouPasswords = new mongoose.Schema({

    // first_name : { type: String, required:true, index: true, lowercase: true, trim:true, unique: true, validate: [util.validate.email, 'not valid'] },
    // _id : { type: ObjectId, required: true, index: true}
    
    _id : { type: ObjectId, required: true, index: true},
    password: { type: String, required: true, index: true},
    score: { type: String, required: true, index: true},
    guesses: {type: Number, required: true},
    crack_time_seconds_slow_hash: {type: String, required: true},
    crack_time_seconds_fast_hash: {type: String, required: true},
    crack_time_display_slow_hash: {type: String, required: true},
    crack_time_display_fast_hash: {type: String, required: true},
    calc_time: {type: String, required: true},
    guesses_log10: {type: String, required: true},
    leak: {type: String, required: true}

  }, {strict:true, collection: 'rockyou-passwords' });

  // Export
  return mongoose.model('RockyouPasswords', RockyouPasswords);

};
