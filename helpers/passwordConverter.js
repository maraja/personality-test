// const csvFilePath = '../myfile.csv';
const csv = require('csvtojson');
const Promise = require('bluebird')

let passwords = []

module.exports = {

	convertPasswordsToJSON: filepath => {
		let file = filepath
		return new Promise((resolve, reject) => {
			csv()
			.fromFile(filepath)
			.on('json', jsonObj =>{
			    // combine csv header row and csv line to a json object 
			    // jsonObj.a ==> 1 or 4 
			    // console.log(jsonObj)
			    passwords.push(jsonObj)
			})
			.on('done', error =>{
				if (error) { return reject(error) }
				else { return resolve(passwords) }
			    console.log('passwords successfully converted')
			})
		})
	}

}