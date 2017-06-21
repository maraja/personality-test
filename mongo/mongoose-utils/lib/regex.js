const _ = require('underscore');

module.exports = {

	isValidString: input => {
		let re = /[-\/\\^$*+?.()|[\]{}]/g;
		return input.match(re);
	}

}