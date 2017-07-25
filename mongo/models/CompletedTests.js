var mongoose = require('mongoose');
var utils = require('../mongoose-utils');

module.exports = function() {

  var ObjectId = mongoose.Schema.ObjectId;

  var CompletedTests = new mongoose.Schema({

    // first_name : { type: String, required:true, index: true, lowercase: true, trim:true, unique: true, validate: [util.validate.email, 'not valid'] },
    // _id : { type: ObjectId, required: true, index: true}
    user_id: { type: ObjectId, required: true, index: true},
    claimed: { type: Boolean, required: true, default: false}
  }, {strict:true, collection: 'completed-tests' });

  // Export
  return mongoose.model('CompletedTests', CompletedTests);

};
