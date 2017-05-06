let dev = true;

module.exports = { 

	trackProgress: (req, res, next) => {
		console.log(req.route.path)
		switch(req.route.path){
			case '/password-ranking-test':
				if (dev) req.session.personalityTestComplete = true;

				if (req.session.personalityTestComplete 
					&& !req.session.passwordRankingTestComplete){

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

			case '/password-bank-selection-test':
				if (dev) req.session.personalityTestComplete = true;
				if (dev) req.session.passwordRankingTestComplete = true;

				if (req.session.personalityTestComplete 
					&& req.session.passwordRankingTestComplete
					&& !req.session.passwordSelectionBankTestComplete){

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