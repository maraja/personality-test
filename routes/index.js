var express = require('express');
var router = express.Router();

var accounts = require('../mongo/controllers/accounts')
let zxcvbnPasswords = require('../mongo/controllers/zxcvbnPasswords');
let tracker = require('../helpers/tracker');

// let dev = true;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Start Pilot' });
});

router.get('/error', function(req, res, next) {
	console.log(req.session.error)
  res.render('error', { title: 'Something went wrong.', error: req.session.error });
});

router.post('/personality', function(req, res, next) {

	accounts.updatePersonality(req.session.accountId, req.body)
	.then(result => {

		req.session.personalityTestComplete = true;
		res.status(200).json({ result: result })

	}).catch(error => {

		req.session.personalityTestComplete = false;
		req.session.error = error;
		res.status(500).json({error: error})

	})
})

router.post('/account', function(req, res, next) {

	if(req.session.accountId === undefined){
		accounts.createAccount()
		.then(result => {

			req.session.accountId = result._id;
			req.session.personalityTestComplete = false;
			req.session.passwordRankingTestComplete = false;
			req.session.passwordSelectionBankTestComplete = false;
			req.session.passwordSelectionEmailTestComplete = false;

			console.log("SESSION:")
			console.log(req.session)
			res.status(200).json({ result: result })
		}).catch(error => {
			// cannot continue as no account is created
			req.session.error = error;
			res.status(500).json({name: error.name, message: error.message})
		})
	} else {
		req.session.error = {name: "ACCOUNT_EXISTS", message: "An account already exists."}
		res.status(400).json(req.session.error)
	}
})



// PASSWORD ROUTES

router.get('/password-ranking-test', [tracker.trackProgress], function(req, res, next) {


	zxcvbnPasswords.getPasswords()
	.then(passwords => {
		// testing
		// console.log("Password: " + passwords[0].password)
		// console.log(Object.keys(passwords[0]))
		res.status(200).render('password-ranking-test', { title: 'Continue Pilot', passwords: passwords });
	}).catch(error => {

		req.session.error = error;
		res.status(500).redirect('/error')

	})

});

router.post('/password-ranking-test', [tracker.trackProgress], function(req, res, next) {

	accounts.insertRankedPasswords(req.session.accountId, req.body.passwords, 5)
	.then(result => {

		console.log("Result: ")
		console.log(result)
		req.session.passwordRankingTestComplete = true;
		res.status(200).json({result: result})

	}).catch(error => {

		req.session.passwordRankingTestComplete = false;
		req.session.error = error;
		res.status(500).json({name: error.name, message: error.message})

	})
});

router.get('/password-bank-selection-test', [tracker.trackProgress], function(req, res, next) {

	zxcvbnPasswords.getPasswords()
	.then(passwords => {
		res.status(200).render('password-bank-selection-test', { title: 'Continue Pilot', passwords: passwords });
	}).catch(error => {

		req.session.error = error;
		res.status(500).redirect('/error')

	})

});


router.post('/password-bank-selection-test', [tracker.trackProgress], function(req, res, next) {

	// console.log("BODY")
	// console.log(req.body)
	accounts.insertBankPassword(req.session.accountId, req.body)
	.then(result => {

		req.session.passwordSelectionBankTestComplete = true;
		res.status(200).json({result: result})

	}).catch(error => {

		console.log("ERROR")
		console.log(error)
		req.session.passwordSelectionBankTestComplete = false;
		req.session.error = error;
		res.status(500).json({name: error.name, message: error.message})

	})
});

router.get('/password-email-selection-test', [tracker.trackProgress], function(req, res, next) {

	zxcvbnPasswords.getPasswords()
	.then(passwords => {
		res.status(200).render('password-bank-selection-test', { title: 'Continue Pilot', passwords: passwords });
	}).catch(error => {

		req.session.error = error;
		res.status(500).redirect('/error')

	})

});


module.exports = router;
