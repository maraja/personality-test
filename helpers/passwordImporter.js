// TODO: finish this file

// let zxcvbnPasswords = require('./mongo/controllers/zxcvbnPasswords');
// let passwordConverter = require('./helpers/passwordConverter');

// console.log("hello")
// passwordConverter.convertPasswordsToJSON('./passwords/linkedin_password_leak_stats.csv')
// .then(passwords => {
//   zxcvbnPasswords.insertPasswords(passwords)
//   .then(() =>{
//     console.log("Passwords inserted successfully")
//   })
// }).catch(error => {
//   console.log(error)
// })

module.exports = {

	importer: type => {

		switch (type) {
			case 'zxcvbn-linkedin':

				let zxcvbnPasswords = require('./mongo/controllers/zxcvbnPasswords');
				let passwordConverter = require('./helpers/passwordConverter');

				console.log("hello")
				passwordConverter.convertPasswordsToJSON('./passwords/linkedin_password_leak_stats.csv')
				.then(passwords => {
				  zxcvbnPasswords.insertPasswords(passwords)
				  .then(() =>{
				    console.log("Linkedin passwords inserted successfully")
				  })
				}).catch(error => {
				  console.log(error)
				})

				break;
			case 'zxcvbn-rockyou':

				let zxcvbnPasswords = require('./mongo/controllers/zxcvbnPasswords');
				let passwordConverter = require('./helpers/passwordConverter');

				console.log("hello")
				// take this file from the Masters/Experiment/zxcvbn folder. 
				passwordConverter.convertPasswordsToJSON('../../zxcvbn/rockyou/output-50k.csv')
				.then(passwords => {
				  zxcvbnPasswords.insertPasswords(passwords)
				  .then(() =>{
				    console.log("Rockyou passwords inserted successfully")
				  })
				}).catch(error => {
				  console.log(error)
				})

				break;
			default:
				break;
		}

	}

}