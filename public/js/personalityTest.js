

function personalityTest() {

	// for testing
	// if (dev) {
	// 	setTimeout(function(){
	// 		updatePersonality({"Extraversion":60,"Agreeableness":60,"Conscientiousness":60,"Neuroticism":60,"Intellect/Imagination":80});
	// 	}, 3000)
	// }

	var currentQuestion = 0;
	$('#btnClick').click(function(){
		$(this).hide();
		$('#content').show();
		createQuestion();
	});

	function createQuestion(){

		if (currentQuestion < questions.length){

			answerBubbles = []
			if (dev) console.log(userAnswers)
			$questionRow = $('<h1>', {
				class: "row questionRow"
			})
			$answerRow = $('<div>', {
				class: "row answerRow"
			})

			// add question to the DOM
			$question = $('<div>', {
				text: questions[currentQuestion]
			})


			for (var i = 0; i < answers.length; i++){

				// add answers within bubbles to the DOM
				answerBubbles.push($('<div>', {
					text: answers[i],
					id: (currentQuestion+1)+"-"+(i+1),
					class: "no-text-cursor"
				}))

				$answerRow.append(answerBubbles[i]);

				answerBubbles[i].on('mouseup', function(){

					answerId = $(this).attr("id")
					questionNumber = answerId.split("-")[0]
					answerNumber = answerId.split("-")[1]

					// userAnswers.push(parseInt(answerNumber))
					updateAnswer(currentQuestion, parseInt(answerNumber))
					currentQuestion = currentQuestion + 1;
					$( "#question" ).fadeOut( "fast", function() {
						// Animation complete.
						$(this).empty();
						createQuestion();
						$( "#question" ).fadeIn("fast")
					});

				})
			}

			$questionRow.append($question)

			$('#question').append($questionRow)
			$('#question').append($answerRow)

		} else {
			endPersonalityTest()
		}
	}

	function updateAnswer(currentQuestion_zeroIndexed, userAnswer){
		for (var i = 0; i < userAnswers.length; i++){
			if (userAnswers[i].factor == questionFactors[currentQuestion_zeroIndexed]){
				var userScore, keyed
				var reverseArray = [5,4,3,2,1]

				if (questionReverse[currentQuestion_zeroIndexed] == true){
					// -keyed
					userScore = reverseArray[userAnswer-1]
					keyed = "-keyed"
				} else {
					// +keyed
					userScore = userAnswer
					keyed = "+keyed"
				}
				userAnswers[i].count = userAnswers[i].count + 1
				userAnswers[i].score = userAnswers[i].score + userScore
				// userAnswers[i].percent = userAnswers[i].score / userAnswers[i].count
				userAnswers[i].percent = userAnswers[i].score / 20


				if (dev) {
					consoleUserResult(factor = userAnswers[i].factor, 
						count = userAnswers[i].count, 
						keyed, 
						score = userAnswers[i].score, 
						percent = userAnswers[i].percent)
				}
			}
		}
	}

	function consoleUserResult(factor, count, keyed, score, percent) {
		console.log("factor: " + factor)
		console.log("count: " + count)
		console.log(keyed)
		console.log("score: " + score)
		console.log("percent: " + percent)
	}


	// change displayUserResults flag if wanted to display results at end of personality test
	function endPersonalityTest(displayUserResults = false){

		$('#content').hide();
		$('#results').show();
		var personalities = {};

		for (var i = 0; i < userAnswers.length; i++){
				
				personalities[userAnswers[i].name] = (userAnswers[i].percent*100);

				if (displayUserResults !== undefined && displayUserResults == true){

					$('#results').append($('<h2>', {
						text: userAnswers[i].name + ": " + (userAnswers[i].percent*100) + "%"
					}))
				}

		}

		updatePersonality(personalities, "password-ranking-test");
	}

}