// IMPORT PASSWORDS - ZXCVBN
// UNCOMMENT the following for the insertion of zxcvbn passwords

var mongoDb = require('./mongo/helpers/mongodb');
mongoDb.dbConnection('production');

// let linkedinPasswords = require('./mongo/controllers/linkedinPasswords');
let passwordConverter = require('./helpers/passwordConverter');

// passwordConverter.convertPasswordsToJSON('./passwords/linkedin_password_leak_stats.csv')
// .then(passwords => {
//   linkedinPasswords.insertPasswords(passwords)
//   .then(() =>{
//     console.log("Linkedin passwords inserted successfully")
//   })
// }).catch(error => {
//   console.log(error)
// })


// ROCK YOU
// let rockyouPasswords = require('./mongo/controllers/rockyouPasswords');

// passwordConverter.convertPasswordsToJSON('./passwords/rockyou_password_leak_output-500k.csv')
// .then(passwords => {
//   rockyouPasswords.insertPasswords(passwords)
//   .then(() =>{
//     console.log("Rock you passwords inserted successfully")
//   })
// }).catch(error => {
//   console.log(error)
// })

// ALL PASSWORDS
let allPasswords = require('./mongo/controllers/allPasswords');

passwordConverter.convertPasswordsToJSON('./passwords/rockyou_password_leak_output-500k.csv')
.then(passwords => {
  allPasswords.insertPasswords(passwords)
  .then(() =>{
    console.log("Rock you passwords inserted successfully")

    passwordConverter.convertPasswordsToJSON('./passwords/linkedin_password_leak_stats.csv')
    .then(passwords => {
      allPasswords.insertPasswords(passwords)
      .then(() =>{
        console.log("Linkedin passwords inserted successfully")
      })
    }).catch(error => {
      console.log(error)
    })

  })
}).catch(error => {
  console.log(error)
})

