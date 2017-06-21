const _ = require('underscore');
const Promise = require('bluebird');
const regexHelper = require('./regex');

const enumGender = ['male', 'female'];

module.exports = {

	validString: function(input) {
		if(typeof input === 'string'){
			return input && !regexHelper.isValidString(input);
		} else {
			// array
			return input && true;
		}
	},

	length: function (i) {
		return function(str) {
			return str && str.length >= i;
		};
	},
	
	email: function (email) {
		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		email = email.toLowerCase();
		return email && email.match(re) !== null;
	},

	gender: function(gender) {
	 if (_.contains(enumGender, gender)) return gender && true;
	 else {
			return gender && false;
	 }
	},

	date: function(date) {
		// Date format: mm-dd-yyyy hh:mm am|pm
		var re = /^(((0[13578]|1[02])[-](0[1-9]|[12]\d|3[01])[-]((19|[2-9]\d)\d{2})\s(0[0-9]|1[0-2]):(0[0-9]|[1-59]\d)\s(AM|am|PM|pm))|((0[13456789]|1[012])[-](0[1-9]|[12]\d|30)[-]((19|[2-9]\d)\d{2})\s(0[0-9]|1[0-2]):(0[0-9]|[1-59]\d)\s(AM|am|PM|pm))|((02)[-](0[1-9]|1\d|2[0-8])[-]((19|[2-9]\d)\d{2})\s(0[0-9]|1[0-2]):(0[0-9]|[1-59]\d)\s(AM|am|PM|pm))|((02)[-](29)[-]((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))\s(0[0-9]|1[0-2]):(0[0-9]|[1-59]\d)\s(AM|am|PM|pm)))$/g;
		return date && date.match(re) !== null;
	},

	time: function(time){
		var re = /^([01]\d|2[0-3]):?([0-5]\d)$/;
		return time && time.match(re) !== null;
	}

};