let dev = (process.env.NODE_ENV=='production'?false:true);

module.exports = { 

	trackProgress: (req, res, next) => {
		console.log(req.route.path)
		switch(req.route.path){


			case '/':
				if (req.method == "GET"){
					return next();
					// res.redirect('/password-ranking-test')
				} else if (req.method == "POST"){
					req.session.error = {name:"UNAUTHORIZED", message:"Unauthorized to make this call."}
					res.status(400).json(req.session.error)
				}
				break;

			case '/questionnaire':
				if (!req.session.questionnaireComplete){
					return next();
				} else {
					if (req.method == "GET"){
						res.redirect('/password-ranking-test')
					} else if (req.method == "POST"){
						req.session.error = {name:"UNAUTHORIZED", message:"Unauthorized to make this call."}
						res.status(400).json(req.session.error)
					}
				}
				break;


			case '/personality':
				if (!req.session.personalityTestComplete){
					return next();
				} else {
					if (req.method == "GET"){
						res.redirect('/password-ranking-test')
					} else if (req.method == "POST"){
						req.session.error = {name:"UNAUTHORIZED", message:"Unauthorized to make this call."}
						res.status(400).json(req.session.error)
					}
				}
				break;

			case '/password-ranking-test':
				if (dev) req.session.personalityTestComplete = true;

				if (req.session.personalityTestComplete 
					&& !req.session.passwordRankingTestComplete){

					return next();
				} else {
					if (req.method == "GET"){
						res.redirect('/password-bank-selection-test')
					} else if (req.method == "POST"){
						req.session.error = {name:"UNAUTHORIZED", message:"Unauthorized to make this call."}
						res.status(400).json(req.session.error)
					}
				}
				break;

			case '/password-bank-selection-test':
				if (dev) req.session.personalityTestComplete = true;
				if (dev) req.session.passwordRankingTestComplete = true;

				if (req.session.personalityTestComplete 
					&& req.session.passwordRankingTestComplete
					&& !req.session.passwordSelectionBankTestComplete){

					return next();
				} else {
					if (req.method == "GET"){
						res.redirect('/password-email-selection-test')
					} else if (req.method == "POST"){
						req.session.error = {name:"UNAUTHORIZED", message:"Unauthorized to make this call."}
						res.status(400).json(req.session.error)
					}
				}
				break;

			case '/password-email-selection-test':
				if (dev) req.session.personalityTestComplete = true;
				if (dev) req.session.passwordRankingTestComplete = true;
				if (dev) req.session.passwordSelectionBankTestComplete = true;

				if (req.session.personalityTestComplete 
					&& req.session.passwordRankingTestComplete
					&& req.session.passwordSelectionBankTestComplete
					&& !req.session.passwordSelectionEmailTestComplete){

					return next();
				} else {
					if (req.method == "GET"){
						res.redirect('/password-bank-selection-test-2')
					} else if (req.method == "POST"){
						req.session.error = {name:"UNAUTHORIZED", message:"Unauthorized to make this call."}
						res.status(400).json(req.session.error)
					}
				}
				break;


			case '/password-bank-creation-test':
				if (dev) req.session.personalityTestComplete = true;
				if (dev) req.session.passwordRankingTestComplete = true;
				if (dev) req.session.passwordSelectionBankTestComplete = true;
				if (dev) req.session.passwordSelectionEmailTestComplete = true;

				if (req.session.personalityTestComplete 
					&& req.session.passwordRankingTestComplete
					&& req.session.passwordSelectionBankTestComplete
					&& req.session.passwordSelectionEmailTestComplete
					&& !req.session.passwordCreationBankTestComplete){

					return next();
				} else {
					if (req.method == "GET"){
						res.redirect('/')
					} else if (req.method == "POST"){
						req.session.error = {name:"UNAUTHORIZED", message:"Unauthorized to make this call."}
						res.status(400).json(req.session.error)
					}
				}
				break;


			case '/password-email-creation-test':
				if (dev) req.session.personalityTestComplete = true;
				if (dev) req.session.passwordRankingTestComplete = true;
				if (dev) req.session.passwordSelectionBankTestComplete = true;
				if (dev) req.session.passwordSelectionEmailTestComplete = true;
				if (dev) req.session.passwoCreationBankTestComplete = true;

				if (req.session.personalityTestComplete 
					&& req.session.passwordRankingTestComplete
					&& req.session.passwordSelectionBankTestComplete
					&& req.session.passwordSelectionEmailTestComplete
					&& req.session.passwordCreationBankTestComplete
					&& !req.session.passwordCreationEmailTestComplete){

					return next();
				} else {
					if (req.method == "GET"){
						res.redirect('/')
					} else if (req.method == "POST"){
						req.session.error = {name:"UNAUTHORIZED", message:"Unauthorized to make this call."}
						res.status(400).json(req.session.error)
					}
				}
				break;


			case '/complete':

				if (req.session.personalityTestComplete 
					&& req.session.passwordRankingTestComplete
					&& req.session.passwordSelectionBankTestComplete
					&& req.session.passwordSelectionEmailTestComplete
					&& req.session.passwordCreationBankTestComplete
					&& req.session.passwordCreationEmailTestComplete){

					return next();
				} else {
					if (req.method == "GET"){
						res.redirect('/')
					} else if (req.method == "POST"){
						req.session.error = {name:"UNAUTHORIZED", message:"Unauthorized to make this call."}
						res.status(400).json(req.session.error)
					}
				}
				break;

			default:
				break;
		}
	}

}