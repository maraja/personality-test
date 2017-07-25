const completedTestsModel = require('../models/CompletedTests')();

const config = require('../../config');

// const jwt = require('jsonwebtoken');
const _ = require('underscore');
const Promise = require('bluebird');

module.exports = {

	addToCompletedTests: id => {

		return new Promise((resolve, reject) => {
			completedTestsModel.create({
				user_id: id
			}, (err, result) => {
				if (err) {
					return reject(err);
				} else {
					return resolve(result);
				}
			})
		})

	}

}