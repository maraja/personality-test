const accountModel = require('../models/Accounts')();

const config = require('../../config');

// const jwt = require('jsonwebtoken');
const _ = require('underscore');
const Promise = require('bluebird');

module.exports = {

	createAccount: () => {
		return new Promise((resolve, reject) => {
			accountModel.create({}, (err, result) => {
				if (err) {
					return reject(err);
				} else {
					return resolve(result);
				}
			})
		})
	},

	updatePersonality: (userId, personalities) => {
		console.log("USERID")
		console.log(userId);
		return new Promise((resolve, reject) => {
			accountModel.findOneAndUpdate(
				{ _id: userId }, 
				{
					extraversion: personalities["Extraversion"],
					agreeableness: personalities["Agreeableness"],
					conscientiousness: personalities["Conscientiousness"],
					neuroticism: personalities["Neuroticism"],
					intellect: personalities["Intellect/Imagination"]
				},
				{ new: true, upsert: true },
				(err, result) => {
				if (err) {
					return reject(err);
				} else {
					return resolve(result);
				}
			})
		})
	}

}