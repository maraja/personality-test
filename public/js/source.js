$('#results').hide();

// this flag will send array output to console if set to true
var dev = false;
var userAnswers, userAwakeAnswers;
var err = {};

//Initialization
$(document).ready(function() {
  var page = window.location.pathname.substr(0, window.location.pathname.lastIndexOf('/'));
  page = (page == '') ? window.location.pathname : page;
  var popup;

  init();
  if (dev) createAccount();

  switch(page) {
    case "/":
  		createAccount();
  		createQuestionnaire();
  		break;
  	case "/questionnaire":
  		createQuestionnaire();
  		break;
  	case "/personality":
    	personalityTest();
		break;
    case "/password-ranking-test":
    	passwordRankingTest();
    	break;
    case "/password-bank-selection-test":
    	passwordBankSelectionTest();
    	break;
    case "/password-email-selection-test":
    	passwordEmailSelectionTest();
		break;
    case "/password-bank-creation-test":
    	passwordBankCreationTest();
    	break;
    case "/password-email-creation-test":
    	passwordEmailCreationTest();
    	break;
    default:
		break;
  }
});


function init() {

	userAnswers = [
		{
			factor: 'E',
			name: 'Extraversion',
			count: 0,
			score: 0,
			percent: 0
		},
		{
			factor: 'A',
			name: 'Agreeableness',
			count: 0,
			score: 0,
			percent: 0
		},
		{
			factor: 'C',
			name: 'Conscientiousness',
			count: 0,
			score: 0,
			percent: 0
		},
		{
			factor: 'N',
			name: 'Neuroticism',
			count: 0,
			score: 0,
			percent: 0
		},
		{
			factor: 'I',
			name: 'Intellect/Imagination',
			count: 0,
			score: 0,
			percent: 0
		}
	];


	userAwakeAnswers = [
		{
			question: awakeQuestions[0],
			answer: ""
		},
		{
			question: awakeQuestions[1],
			answer: ""
		},
		{
			question: awakeQuestions[2],
			answer: ""
		}
	]


	$(window).resize(function() {
        var bodyheight = $(this).height();
        $("#test-container").height(bodyheight);
    }).resize();

}




function createQuestionnaire() {

	// validate that the form has been filled out before moving forward

	$("form[name='questionnaire']").submit(function(e){

		var all_answered = true;

        if ($("input:radio[name='gender']:checked").length == 0 ||
            $("input:radio[name='handedness']:checked").length == 0 ||
            $("input:radio[name='age']:checked").length == 0 ||
            $("input:radio[name='security_training']:checked").length == 0 ||
            $("input:radio[name='password_awareness']:checked").length == 0 ||
            $("input:radio[name='password_awareness_level']:checked").length == 0 ||
            $("input:radio[name='computer_skills_level']:checked").length == 0 ||
            $("input:radio[name='account_hijacking_involvement']:checked").length == 0) {

			e.preventDefault();
			all_answered = false

		}

        if (all_answered == false) {
			swal(
				'Uh Oh!',
				'Please fill out all the information before moving forward',
				'error'
			)
            return false;
        } else {
			// e.preventDefault()/
			$("#questionnaire").hide();
			$(".loader-container").show();
			return true;
        }

	})

}





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
		$('#instructions').hide();
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
						
						switch(currentQuestion){
							case 7:
								createAwakeQuestion(0);
								break;
							case 15:
								createAwakeQuestion(1);
								break;
							case 17:
								createAwakeQuestion(2);
								break;
							default:
								createQuestion();
								break;
						}
						// createQuestion();
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



	function createAwakeQuestion(index){
		answerBubbles = []
		var scopeAnswers;
		switch(index){
			case 0:
				scopeAnswers = awakeAnswers_1;
				break;
			case 1:
				scopeAnswers = awakeAnswers_2;
				break;
			case 2:
				scopeAnswers = awakeAnswers_3;
				break;
			default:
				break;

		}

		if (dev) console.log(userAwakeAnswers)
		$questionRow = $('<h1>', {
			class: "row questionRow"
		})
		$answerRow = $('<div>', {
			class: "row answerRow"
		})

		// add question to the DOM
		$question = $('<div>', {
			text: awakeQuestions[index]
		})


		for (var i = 0; i < scopeAnswers.length; i++){

			// add answers within bubbles to the DOM
			answerBubbles.push($('<div>', {
				text: scopeAnswers[i],
				id: (index+1)+"-"+(i+1),
				class: "no-text-cursor"
			}))

			$answerRow.append(answerBubbles[i]);

			answerBubbles[i].on('mouseup', function(){

				var answerText = $(this).text()

				// userAnswers.push(parseInt(answerNumber))
				updateAwakeAnswer(index, answerText)
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
	}


	function updateAwakeAnswer(index, answerText){
		userAwakeAnswers[index].answer = answerText;
	}


	// change displayUserResults flag if wanted to display results at end of personality test
	function endPersonalityTest(displayUserResults = false){

		if (dev) console.log(userAwakeAnswers)

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

		updatePersonality(personalities, userAwakeAnswers, "complete");
	}

}



// PASSWORD RANKING

function passwordRankingTest(){

	// passwords given from the server are stored here
	if (dev) console.log(passwordsFromServer)

	var counter = 0
	var userPasswords = []
	

	// start the test once user clicks continue
	$('#btnClick').click(function(){
		$(".button-row").hide();
		$('#password-test-content').show();
		$('#prompt-content').show();
	});


	// JQUERY UI

	$('.password-container').each(function(index) {
			var highlightClass = "password-container-highlight";

		    $(this).droppable({
		        accept: ".password",
		        hoverClass: highlightClass,
		        tolerance: "pointer",
		        drop: function(event, ui) {

		        	// only allow containers which are empty to be droppable
		        	if ($(this).html() == "") {

		        		// add dropped class and put password into container
			            $(this).addClass("dropped");
			            $(ui.draggable).appendTo(this);

			            // search for this password in userPasswords array already
			            var found = false;
			            _.map(userPasswords, function(password){
			            	if (password.password == $(ui.draggable).text()) {
			            		found = true;
			            	}
			            })


			            // remove previous ranking of the password using helper function below
			            if (found) removePassword($(this).text())
					    // else increment password counter for showing next button
			            else counter++


			            // show next button if all fields are filled
			            if (counter == passwordsFromServer.length) {
			            	$('#next').show();
			            }

			            // insert password into ranked array
			            insertPassword($(this).text(), index)

		    		} 

		            // console.log($('#passwords-ranking ul').html())

		            // console.log($('#password-containers ul').text())
		        }
		    });
	});

	$('#passwords-ranking').each(function() {
	    $(this).droppable({
	        accept: ".password",
	        tolerance: "pointer",
	        drop: function(event, ui) {

	            counter--;

	            removePassword($(ui.draggable).text())
	            $(ui.draggable).appendTo('#password-list');
	        }
	    });
	});

	$('.password').each(function() {
	    $(this).draggable({
	        opacity: 0.7,
	        helper: 'clone',
	        //appendTo: '#container',
	        //helper: 'original',
	        scroll: true
	    });
	});

	function insertPassword(password, index){
		passwordsFromServer.forEach( function(item) {
			if (password == item.password){
				userPasswords.push({
					password: password,
					realScore: parseInt(item.score),
					userScore: index
				})
			}
		})

		if (dev) {
			console.log("USERPASSWORDS:")
			console.log(userPasswords)
		}
	}

	function removePassword(password){
		userPasswords = _.reject(userPasswords, function(el) { return el.password === password; })

		if (dev) {
			console.log("USERPASSWORDS:")
			console.log(userPasswords)
		}
	}

	$('#next').click(function(){
		if(userPasswords.length == passwordsFromServer.length){
			updatePasswordsFromRanking(userPasswords, "password-bank-selection-test");
		} else {
			swal(
				'Uh Oh!',
				'All passwords not ranked. Please rank them all and continue.',
				'error'
			)
		}
	})
}


// PASSWORD SELECTION

function passwordBankSelectionTest(){

	// passwords given from the server are stored here
	if (dev) console.log(passwordsFromServer)

	// passwordsFromserver = JSON.parse(passwordsFromServer)
	var originalPasswords = $('#password-list').text()
	// console.log(originalPasswords);
	var displayPasswords = []
	var chosenPassword;
	
	$('#btnClick').click(function(){
		$(".button-row").hide();
		$('#password-test-content').show();
		$('#prompt-content').show();
	});

	$('.password').each(function(){

		displayPasswords.push($(this))

		var self = this
		$(this).mousedown(function(){

			// remove selected class from every other password
			displayPasswords.forEach(function(password){
				if (password != self){
					password.removeClass('password-selected')
				}
			})

		    
		    $('#next').show();
			chosenPassword = $(this)
			// console.log(chosenPassword.text())
			$(this).toggleClass('password-selected')

		})
	})

	$('#next').click(function(){

		if (originalPasswords == $('#password-list').text()) {
			// unmodified HTML, continue
			var passwordObj = {}
			passwordsFromServer.forEach(function(pass){
				if (pass.password == chosenPassword.text()){
					passwordObj = pass;
				}
			})
			console.log(passwordObj)
			console.log(chosenPassword.text());

			// get the user justification, then move forward
			swal({
				"title": "Justification",
				"text": "Please enter a brief description as to why you chose this password. Password: " + chosenPassword.text(),
				"input": "textarea"
			}).then(function(text){
				console.log(text)
				if(text === false ) return false;
				if(text === "" ) {
					swal.showInputError("You must give a justification before continuing.")
					return false;
				} else {
					passwordObj["justification"] = text;
					updatePasswordFromBankSelection(passwordObj, "password-email-selection-test")
				}
			})

		} else {
			// HTML tampered with, display alert.
			swal(
				'Uh Oh!',
				'HTML changed, please revert or refresh page to continue.',
				'error'
			)
		}
		// updatePasswords(userPasswords, function(){
		// 	window.location.pathname = "/password-selection-test";
		// })
	})
}



function passwordEmailSelectionTest(){

	// passwords given from the server are stored here
	if (dev) console.log(passwordsFromServer)

	// passwordsFromserver = JSON.parse(passwordsFromServer)
	var originalPasswords = $('#password-list').text()
	// console.log(originalPasswords);
	var displayPasswords = []
	var chosenPassword;
	
	$('#btnClick').click(function(){
		$(".button-row").hide();
		$('#password-test-content').show();
		$('#prompt-content').show();
	});

	$('.password').each(function(){

		displayPasswords.push($(this))

		var self = this
		$(this).mousedown(function(){

			// remove selected class from every other password
			displayPasswords.forEach(function(password){
				if (password != self){
					password.removeClass('password-selected')
				}
			})

		    
		    $('#next').show();
			chosenPassword = $(this)
			// console.log(chosenPassword.text())
			$(this).toggleClass('password-selected')

		})
	})

	$('#next').click(function(){

		if (originalPasswords == $('#password-list').text()) {
			// unmodified HTML, continue
			var passwordObj = {}
			passwordsFromServer.forEach(function(pass){
				if (pass.password == chosenPassword.text()){
					passwordObj = pass;
				}
			})
			console.log(passwordObj)
			console.log(chosenPassword.text());



			// get the user justification, then move forward
			swal({
				"title": "Justification",
				"text": "Please enter a brief description as to why you chose this password. Password: " + chosenPassword.text(),
				"input": "textarea"
			}).then(function(text){
				console.log(text)
				if(text === false ) return false;
				if(text === "" ) {
					swal.showInputError("You must give a justification before continuing.")
					return false;
				} else {
					passwordObj["justification"] = text;
					// submit and route to next test
					updatePasswordFromEmailSelection(passwordObj, "password-bank-creation-test")
				}
			})
		} else {
			// HTML tampered with, display alert.
			swal(
				'Uh Oh!',
				'HTML changed, please revert or refresh page to continue.',
				'error'
			)
		}
	})
}


function passwordBankCreationTest(){

	// passwords given from the server are stored here
	if (dev) console.log(passwordsFromServer)

	// passwordsFromserver = JSON.parse(passwordsFromServer)
	// console.log(originalPasswords);
	var displayPasswords = []
	var typedPassword = "";
	
	$('#btnClick').click(function(){
		$(".button-row").hide();
		$('#password-test-content').show();
		$('#prompt-content').show();
	});

	$('.password-input').focus(function(){

	    $('#next').show();
	})

	$('.password-input').blur(function(){
		
		if ($('.password-input').val() != ""){
		    typedPassword = $('.password-input').val()
		}
	})

	$('#next').click(function(){

		if (dev) {
			console.log("typed password: " + typedPassword)
		}

		if (typedPassword === "") {
			swal(
				'Uh Oh!',
				'Activity incomplete, please finish the activity before continuing.',
				'error'
			)
		} else {

			var passwordObj = {}
			passwordObj['calc_time'] = "";
			passwordObj['crack_time_display_fast_hash'] = "";
			passwordObj['crack_time_display_slow_hash'] = "";
			passwordObj['crack_time_seconds_fast_hash'] = "";
			passwordObj['crack_time_seconds_slow_hash'] = "";
			passwordObj['guesses'] = "";
			passwordObj['guesses_log10'] = "";
			passwordObj['leak'] = "";
			passwordObj['password'] = typedPassword;
			passwordObj['score'] = -1;
			// passwordObj['leak'] = "";

			if (dev) {
				console.log(passwordObj);
				console.log(typedPassword);
			}

			updatePasswordFromBankCreation(passwordObj, "password-email-creation-test")
			// submit and route to next test
			// updatePasswordFromBankCreation(passwordToSend, "complete")
		}

	})
}



function passwordEmailCreationTest(){

	// passwords given from the server are stored here
	if (dev) console.log(passwordsFromServer)

	// passwordsFromserver = JSON.parse(passwordsFromServer)
	// console.log(originalPasswords);
	var displayPasswords = []
	var typedPassword = "";
	
	$('#btnClick').click(function(){
		$(".button-row").hide();
		$('#password-test-content').show();
		$('#prompt-content').show();
	});

	$('.password-input').focus(function(){

	    $('#next').show();
	})

	$('.password-input').blur(function(){
		
		if ($('.password-input').val() != ""){
		    typedPassword = $('.password-input').val()
		}
	})

	$('#next').click(function(){

		if (dev) {
			console.log("typed password: " + typedPassword)
		}

			if (typedPassword === "") {
				swal(
					'Uh Oh!',
					'Activity incomplete, please finish the activity before continuing.',
					'error'
				)
			} else {

				var passwordObj = {}
				passwordObj['calc_time'] = "";
				passwordObj['crack_time_display_fast_hash'] = "";
				passwordObj['crack_time_display_slow_hash'] = "";
				passwordObj['crack_time_seconds_fast_hash'] = "";
				passwordObj['crack_time_seconds_slow_hash'] = "";
				passwordObj['guesses'] = "";
				passwordObj['guesses_log10'] = "";
				passwordObj['leak'] = "";
				passwordObj['password'] = typedPassword;
				passwordObj['score'] = -1;
				// passwordObj['leak'] = "";

				if (dev) {
					console.log(passwordObj);
					console.log(typedPassword);
				}

				updatePasswordFromEmailCreation(passwordObj, "personality")
				// submit and route to next test
				// updatePasswordFromBankCreation(passwordToSend, "complete")
		}

	})
}






// HELPERS

function createAccount() {
	$.ajax({
      url: "/account",
      type: "POST",
      dataType: "json"
    }).done(function(data) {
      // alert(data);
      if (dev) console.log(data)

    }).fail(function(error) {
      if (dev) console.log(error)

    });
}

function updatePersonality(personalities, userAwakeAnswers, nextPath) {
	$.ajax({
      url: "/personality",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify({
      	personalities: personalities,
      	userAwakeAnswers: userAwakeAnswers
      })
    }).done(function(data) {
      // alert(data);
      continueToNextPage(nextPath);
      if (dev) console.log(data)

    }).fail(function(error) {
      // alert(error);
      window.location.pathname = "error";
      err = error;
      if (dev) console.log(error)

    });
}

function updatePasswordsFromRanking(passwords, nextPath) {
	if(dev) console.log(passwords)
	// alert()
	$.ajax({
      url: "/password-ranking-test",
      type: "POST",
      dataType: "json",
      data: {
      	passwords: JSON.stringify(passwords)
      }
    }).done(function(data) {
      // alert(data);
      continueToNextPage(nextPath);
      if (dev) console.log(data)

    }).fail(function(error) {
      // alert(error);
      window.location.pathname = "error";
      err = error;
      if (dev) console.log(error)

    });
}

function updatePasswordFromBankSelection(password, nextPath){
	if(dev) console.log(password)
	// alert()
	$.ajax({
      url: "/password-bank-selection-test",
      type: "POST",
      dataType: "json",
      data: {
      	password: password
      }
    }).done(function(data) {
      // alert(data);
      continueToNextPage(nextPath);
      if (dev) console.log(data)

    }).fail(function(error) {
      // alert(error);
      window.location.pathname = "error";
      err = error;
      if (dev) console.log(error)

    });
}


function updatePasswordFromEmailSelection(password, nextPath){
	if(dev) console.log(password)
	// alert()
	$.ajax({
      url: "/password-email-selection-test",
      type: "POST",
      dataType: "json",
      data: {
      	password: password
      }
    }).done(function(data) {
      // alert(data);
      continueToNextPage(nextPath);
      if (dev) console.log(data)

    }).fail(function(error) {
      // alert(error);
      window.location.pathname = "error";
      err = error;
      if (dev) console.log(error)

    });
}

function updatePasswordFromBankCreation(password, nextPath){
	if(dev) console.log(password)
	// alert()
	$.ajax({
      url: "/password-bank-creation-test",
      type: "POST",
      dataType: "json",
      data: {
      	password: password
      }
    }).done(function(data) {
      // alert(data);
      continueToNextPage(nextPath);
      if (dev) console.log(data)

    }).fail(function(error) {
      // alert(error);
      window.location.pathname = "error";
      err = error;
      if (dev) console.log(error)

    });
}


function updatePasswordFromEmailCreation(password, nextPath){
	if(dev) console.log(password)
	// alert()
	$.ajax({
      url: "/password-email-creation-test",
      type: "POST",
      dataType: "json",
      data: {
      	password: password
      }
    }).done(function(data) {
      // alert(data);
      continueToNextPage(nextPath);
      if (dev) console.log(data)

    }).fail(function(error) {
      // alert(error);
      window.location.pathname = "error";
      err = error;
      if (dev) console.log(error)

    });
}


function continueToNextPage(nextPath){
	swal({
	  title: 'Great!',
	  text: "Thank you for completing this portion of the test.",
	  type: 'success',
	  allowOutsideClick: false,
	  // confirmButtonColor: '#3085d6',
	  confirmButtonText: 'Continue'
	}).then(function() {
		console.log("HELLO")
		$("#test-container").toggle();
		$(".loader-container").toggle();
	  window.location.pathname = nextPath;
	})
}
