var express = require('express');
var router = express.Router();

var accounts = require('../mongo/controllers/accounts')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/personality', function(req, res, next) {
	console.log("ACCOUNTID")
	console.log(req.session.accountId)
	accounts.updatePersonality(req.session.accountId, req.body)
	.then(result => {
		res.status(200).json({ result: result })
	}).catch(err => {
		res.status(500).render('error', { error: err })
	})
})

router.post('/account', function(req, res, next) {
	accounts.createAccount()
	.then(result => {
		req.session.accountId = result._id;
		console.log("SESSION:")
		console.log(req.session)
		res.status(200).json({ result: result })
	}).catch(err => {
		res.status(500).render('error', { error: err })
	})
})

module.exports = router;
