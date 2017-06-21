const passwordModel = require('../models/AllPasswords')();

const config = require('../../config');

// const jwt = require('jsonwebtoken');
const _ = require('underscore');
const Promise = require('bluebird');
const shuffle = require('shuffle-array');

const zxcvbnMaxScore = 4;

module.exports = {

	insertPasswords: passwords => {
		return new Promise((resolve, reject) => {
			passwordModel.collection.insert(passwords, (err, result) => {
				if (err) {
					return reject(err);
				} else {
					return resolve(result);
				}
			})
		})
	},

	getPasswords: () => {

		getRandomPassword = (score, max, passwords, resolve, reject) => {
			passwordModel.count({"score": score.toString()}).exec(function (err, count) {

				// Get a random entry
				var random = Math.floor(Math.random() * count)

				// Again query all users but only fetch one offset by our random #
				passwordModel.findOne({"score": score.toString()}).skip(random).exec(
				function (err, result) {
					// Tada! random user
					if (err) { return reject(err) }
					else {
						score++;
						passwords.push(result._doc)
						if (score < max) { 
							getRandomPassword(score, max, passwords, resolve, reject) 
						}
						// stopping case
						else { 
							shuffle(passwords);
							return resolve(passwords);
						}
					}
				})
			})
		}

		return new Promise((resolve, reject) => {
			
			return getRandomPassword(0, zxcvbnMaxScore + 1, [], resolve, reject);

		})
	}

}