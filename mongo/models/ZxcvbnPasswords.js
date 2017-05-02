var mongoose = require('mongoose');
var utils = require('../mongoose-utils');

module.exports = function() {

  var ObjectId = mongoose.Schema.ObjectId;

  var ZxcvbnPasswords = new mongoose.Schema({

    // first_name : { type: String, required:true, index: true, lowercase: true, trim:true, unique: true, validate: [util.validate.email, 'not valid'] },
    // _id : { type: ObjectId, required: true, index: true}
  }, {strict:true, collection: 'zxcvbn-passwords' });

  // Export
  return mongoose.model('ZxcvbnPasswords', ZxcvbnPasswords);

};
