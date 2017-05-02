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
			case 'zxcvbn':

				let zxcvbnPasswords = require('./mongo/controllers/zxcvbnPasswords');
				let passwordConverter = require('./helpers/passwordConverter');

				console.log("hello")
				passwordConverter.convertPasswordsToJSON('./passwords/linkedin_password_leak_stats.csv')
				.then(passwords => {
				  zxcvbnPasswords.insertPasswords(passwords)
				  .then(() =>{
				    console.log("Passwords inserted successfully")
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