var express = require('express');
var router = express.Router();

var accounts = require('../mongo/controllers/accounts')
let zxcvbnPasswords = require('../mongo/controllers/zxcvbnPasswords');

let dev = true;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Start Pilot' });
});

router.post('/personality', function(req, res, next) {
	console.log("ACCOUNTID")
	console.log(req.session.accountId)
	accounts.updatePersonality(req.session.accountId, req.body)
	.then(result => {
		req.session.personalityTestComplete = true;
		res.status(200).json({ result: result })
	}).catch(err => {
		req.session.personalityTestComplete = false;
		res.status(500).render('error', { error: err })
	})
})

router.post('/account', function(req, res, next) {

	console.log("SESSION")
	console.log(req.session)
	if(req.session.accountId === undefined){
		accounts.createAccount()
		.then(result => {
			req.session.accountId = result._id;
			req.session.personalityTestComplete = false;
			req.session.passwordRankingTestComplete = false;
			console.log("SESSION:")
			console.log(req.session)
			res.status(200).json({ result: result })
		}).catch(err => {
			res.status(500).render('error', { error: err })
		})
	} else {
		res.status(400).json({ error: "An account already exists" })
	}
})



// PASSWORD ROUTES

router.get('/password-ranking-test', function(req, res, next) {

	if (dev) req.session.personalityTestComplete = true;

	if (req.session.personalityTestComplete && !req.session.passwordRankingTestComplete){

		zxcvbnPasswords.getPasswords()
		.then(passwords => {
			// testing
			// console.log("Password: " + passwords[0].password)
			// console.log(Object.keys(passwords[0]))
			res.status(200).render('password-ranking-test', { title: 'Continue Pilot', passwords: passwords });
		}).catch(error => {
			console.log("An error occured")
			res.status(500).render('error', { error: error })
		})
	} else {
		res.redirect('/')
	}
});

router.post('/password-ranking-test', function(req, res, next) {

	if (dev) req.session.personalityTestComplete = true;
	req.session.passwordRankingTestComplete = false;

	if (req.session.personalityTestComplete && !req.session.passwordRankingTestComplete){

		console.log("hello")
		accounts.insertRankedPasswords(req.session.accountId, req.body.passwords, 5)
		.then(result => {
			console.log("Result: ")
			console.log(result)
			req.session.passwordRankingTestComplete = true;
			res.status(200).render('index', { title: 'Continue Pilot' });
		}).catch(error => {
			console.log("An error occured")
			req.session.passwordRankingTestComplete = false;
			res.status(500).render('error', { error: error })
		})
	} else {
		res.redirect('/')
	}
});

module.exports = router;
