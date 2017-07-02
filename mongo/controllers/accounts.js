const accountModel = require('../models/Accounts')();

const config = require('../../config');

// const jwt = require('jsonwebtoken');
const _ = require('underscore');
const Promise = require('bluebird');

module.exports = {

	createAccount: () => {
		return new Promise((resolve, reject) => {
			accountModel.create({
					extraversion: 0,
					agreeableness: 0,
					conscientiousness: 0,
					neuroticism: 0,
					intellect: 0,
					rankedPasswords: []
			}, (err, result) => {
				if (err) {
					return reject(err);
				} else {
					return resolve(result);
				}
			})
		})
	},

	updateQuestionnaire: (userId, questionnaire) => {

		return new Promise((resolve, reject) => {

			accountModel.findOneAndUpdate(
				{ _id: userId }, 
				{
					questionnaire: questionnaire
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
	},

	updatePersonality: (userId, personalities) => {
		console.log("USERID")
		console.log(userId);
		console.log("PERSONALITIES")
		console.log(personalities)

		return new Promise((resolve, reject) => {

			// validate the personalities object
			if(!("Extraversion" in personalities["personalities"]
				&& "Agreeableness" in personalities["personalities"]
				&& "Conscientiousness" in personalities["personalities"]
				&& "Neuroticism" in personalities["personalities"]
				&& "Intellect/Imagination" in personalities["personalities"])){

				return reject(new Error("Incorrect personalities given."));

			}

			accountModel.findOneAndUpdate(
				{ _id: userId }, 
				{
					userAwakeAnswers: personalities["userAwakeAnswers"],
					personalities: {
						// personalities["personalities"]
						extraversion: personalities["personalities"]["Extraversion"],
						agreeableness: personalities["personalities"]["Agreeableness"],
						conscientiousness: personalities["personalities"]["Conscientiousness"],
						neuroticism: personalities["personalities"]["Neuroticism"],
						intellect: personalities["personalities"]["Intellect/Imagination"]
					}
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
	},


	insertRankedPasswords: (userId, passwords, numOfPasswords) => {
		passwords = JSON.parse(passwords)

		console.log("passwords")
		console.log(passwords);


		return new Promise((resolve, reject) => {

			// validate the personalities object
			if(passwords.length == numOfPasswords){

				passwords.forEach(function(password){
					if (password["password"] == undefined || 
						password['realScore'] == undefined || 
						password['userScore'] == undefined){
						return reject(new Error("Incorrect passwords given."));
					}
				})

			}

			accountModel.findOneAndUpdate(
				{ _id: userId }, 
				{
					$push: {
						rankedPasswords: { $each: passwords }
					}
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
	},


	insertTestPassword: (userId, password, fieldName) => {

		console.log(password)
		// password = JSON.parse(password)

		return new Promise((resolve, reject) => {

			// validate the personalities object

			accountModel.findOneAndUpdate(
				{ _id: userId }, 
				{
					[fieldName] : {
						'leak': password['password[leak]'],
						'score': parseInt(password['password[score]']),
						'password': password['password[password]'],
						'justification': password['password[justification]'],
						'_id': password['password[_id]']
					}
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