var express = require('express');
var router = express.Router();

var accounts = require('../mongo/controllers/accounts')
let allPasswords = require('../mongo/controllers/allPasswords');
let completedTests = require('../mongo/controllers/completedTests');
let tracker = require('../helpers/tracker');

// let dev = true;

/* GET home page. */
router.get('/', [tracker.trackProgress], function(req, res, next) {
	res.render('questionnaire', { title: 'Start Pilot' });
});

router.get('/error', function(req, res, next) {
	console.log(req.session.error)
	res.render('error', { title: 'Something went wrong.', error: req.session.error });
});

router.get('/complete', [tracker.trackProgress], function(req, res, next) {
	
	completedTests.addToCompletedTests(req.session.accountId)
	.then(() => {
		res.render('complete', { title: 'Finished' });
	}).catch(error => {
		req.session.error = error;
		res.status(400).render('error', { error: error })
	})

});

// for testing
// router.get('/complete', function(req, res, next) {
	
// 	completedTests.addToCompletedTests(req.session.accountId)
// 	.then(() => {
// 		res.render('complete', { title: 'Finished', userId: req.session.accountId });
// 	}).catch(error => {
// 		req.session.error = error;
// 		res.status(400).render('error', { error: error })
// 	})
	
// });


router.get('/questionnaire', [tracker.trackProgress], function(req, res, next) {
	res.render('questionnaire', { title: 'Continue' });
});

router.post('/questionnaire', function(req, res, next) {
	console.log("QUESTIONNAIRE:")
	console.log(req.body)

	accounts.updateQuestionnaire(req.session.accountId, req.body)
	.then(result => {

		req.session.questionnaireComplete = true;
		res.status(200).redirect('/password-ranking-test')

	}).catch(error => {
		req.session.questionnaireComplete = false;
		req.session.error = error;
		res.status(400).render('error', { error: error })
	})
});


router.get('/personality', [tracker.trackProgress], function(req, res, next) {
	res.render('personality-test', { title: 'Continue' });
});


router.post('/personality', function(req, res, next) {

	accounts.updatePersonality(req.session.accountId, req.body)
	.then(result => {

		req.session.personalityTestComplete = true;
		res.status(200).json({ result: result })

	}).catch(error => {

		req.session.personalityTestComplete = false;
		req.session.error = error;
		res.status(400).json({error: error})

	})
})

router.post('/account', function(req, res, next) {

	if(req.session.accountId === undefined){
		accounts.createAccount()
		.then(result => {

			req.session.accountId = result._id;
			req.session.questionnaireComplete = false;
			req.session.personalityTestComplete = false;
			req.session.passwordRankingTestComplete = false;
			req.session.passwordSelectionBankTestComplete = false;
			req.session.passwordSelectionEmailTestComplete = false;
			req.session.passwordCreationBankTestComplete = false;
			req.session.passwordCreationEmailTestComplete = false;

			console.log("SESSION:")
			console.log(req.session)
			res.status(200).json({ result: result })
		}).catch(error => {
			// cannot continue as no account is created
			console.log("ERR")
			console.log(error)
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


	allPasswords.getPasswords()
	.then(passwords => {
		// testing
		// console.log("Password: " + passwords[0].password)
		// console.log(Object.keys(passwords[0]))
		res.status(200).render('password-ranking-test', { title: 'Continue', passwords: passwords });
	}).catch(error => {

		req.session.error = error;
		res.status(400).redirect('/error')

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
		res.status(400).json({name: error.name, message: error.message})

	})
});

router.get('/password-bank-selection-test', [tracker.trackProgress], function(req, res, next) {

	allPasswords.getPasswords()
	.then(passwords => {
		res.status(200).render('password-bank-selection-test', { title: 'Continue', passwords: passwords });
	}).catch(error => {

		console.log(error)
		req.session.error = error;
		res.status(400).redirect('/error')

	})

});


router.post('/password-bank-selection-test', [tracker.trackProgress], function(req, res, next) {

	// console.log("BODY")
	// console.log(req.body)
	accounts.insertTestPassword(req.session.accountId, req.body, 'bank-password-selection')
	.then(result => {

		req.session.passwordSelectionBankTestComplete = true;
		res.status(200).json({result: result})

	}).catch(error => {

		console.log("ERROR")
		console.log(error)
		req.session.passwordSelectionBankTestComplete = false;
		req.session.error = error;
		res.status(400).json({name: error.name, message: error.message})

	})
});

router.get('/password-email-selection-test', [tracker.trackProgress], function(req, res, next) {

	allPasswords.getPasswords()
	.then(passwords => {
		res.status(200).render('password-email-selection-test', { title: 'Continue', passwords: passwords });
	}).catch(error => {

		req.session.error = error;
		res.status(400).redirect('/error')

	})

});


router.post('/password-email-selection-test', [tracker.trackProgress], function(req, res, next) {

	// console.log("BODY")
	// console.log(req.body)
	accounts.insertTestPassword(req.session.accountId, req.body, 'email-password-selection')
	.then(result => {

		req.session.passwordSelectionEmailTestComplete = true;
		res.status(200).json({result: result})

	}).catch(error => {

		console.log("ERROR")
		console.log(error)
		req.session.passwordSelectionEmailTestComplete = false;
		req.session.error = error;
		res.status(400).json({name: error.name, message: error.message})

	})
});



router.get('/password-bank-creation-test', [tracker.trackProgress], function(req, res, next) {

	allPasswords.getPasswords()
	.then(passwords => {
		res.status(200).render('password-bank-creation-test', { title: 'Continue', passwords: passwords });
	}).catch(error => {

		req.session.error = error;
		res.status(400).redirect('/error')

	})

});


router.post('/password-bank-creation-test', [tracker.trackProgress], function(req, res, next) {

	// console.log("BODY")
	// console.log(req.body)
	accounts.insertTestPassword(req.session.accountId, req.body, 'bank-password-creation')
	.then(result => {

		req.session.passwordCreationBankTestComplete = true;
		res.status(200).json({result: result})

	}).catch(error => {

		console.log("ERROR")
		console.log(error)
		req.session.passwordCreationBankTestComplete = false;
		req.session.error = error;
		res.status(400).json({name: error.name, message: error.message})

	})
});


router.get('/password-email-creation-test', [tracker.trackProgress], function(req, res, next) {

	allPasswords.getPasswords()
	.then(passwords => {
		res.status(200).render('password-email-creation-test', { title: 'Continue', passwords: passwords });
	}).catch(error => {

		req.session.error = error;
		res.status(400).redirect('/error')

	})

});


router.post('/password-email-creation-test', [tracker.trackProgress], function(req, res, next) {

	// console.log("BODY")
	// console.log(req.body)
	accounts.insertTestPassword(req.session.accountId, req.body, 'email-password-creation')
	.then(result => {

		req.session.passwordCreationEmailTestComplete = true;
		res.status(200).json({result: result})

	}).catch(error => {

		console.log("ERROR")
		console.log(error)
		req.session.passwordCreationEmailTestComplete = false;
		req.session.error = error;
		res.status(400).json({name: error.name, message: error.message})

	})
});


module.exports = router;
