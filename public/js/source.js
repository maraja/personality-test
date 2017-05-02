$('#results').hide();

// this flag will send array output to console if set to true
var dev = false;
var userAnswers;

//Initialization
$(document).ready(function() {
  var page = window.location.pathname.substr(0, window.location.pathname.lastIndexOf('/'));
  page = (page == '') ? window.location.pathname : page;
  var popup;

  createAccount();
  init();

  switch(page) {
    case "/":
    	personalityTest();
      break;
    case "/password-ranking-test":
    	passwordTest();
    	break;
    case "/personality-test":
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

}


function personalityTest() {

	// for testing
	if (dev) {
		setTimeout(function(){
			updatePersonality({"Extraversion":60,"Agreeableness":60,"Conscientiousness":60,"Neuroticism":60,"Intellect/Imagination":80});
		}, 3000)
	}

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
			endPersonalityTest(true)
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

		updatePersonality(personalities, function(){
			window.location.pathname = "password-ranking-test";
		})
	}

}



function passwordTest(){

	// passwords given from the server are stored here
	if (dev) console.log(passwordsFromServer)

	var counter = 0
	var userPasswords = []
	
	$('#btnClick').click(function(){
		$(this).hide();
		$('#password-test-content').show();
	});


	// JQUERY UI

	$('#password-containers ul').each(function(index) {
			var highlightClass = "password-container-highlight";
		    $(this).droppable({
		    	over: function(event, ui){
		    		// Enable all the .droppable elements
				    $('#password-containers ul').droppable('enable');
					// highlightClass = "password-container-highlight";

				    // If the droppable element we're hovered over already contains a .draggable element, 
				    // don't allow another one to be dropped on it
				    if($(this).hasClass('dropped')) {
				    	// highlightClass = "password-container-disabled"
				        $(this).droppable('disable');
				    }
		    	},
		    	out: function(event, ui){
		            $(this).removeClass("dropped");
		    		// console.log("hello")
		    	},
		        accept: ".password",
		        hoverClass: highlightClass,
		        tolerance: "pointer",
		        drop: function(event, ui) {
		        	// alert()
		            $(this).addClass("dropped");
		            $(ui.draggable).appendTo(this);
				    	// highlightClass = "password-container-disabled"

		            counter++

		            if (counter == passwordsFromServer.length) {
		            	$('#next').show();
		            }

		            insertPassword($(this).text(), index)

		            // console.log($('#passwords ul').html())

		            // console.log($('#password-containers ul').text())
		        }
		    });
	});

	$('#passwords').each(function() {
	    $(this).droppable({
	        accept: ".password",
	        tolerance: "pointer",
	        drop: function(event, ui) {
	        	// alert()
	            // $(this).addClass("cell-dropped");

	            counter--;

	            removePassword($(ui.draggable).text())
	            $(ui.draggable).appendTo('#passwords ul');
	        }
	    });
	});

	$('#passwords ul li').each(function() {
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
		updatePasswords(userPasswords, function(){
			window.location.pathname = "/";
		})
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
      // console.log(data)

    }).fail(function(error) {
      alert(error);
      console.log(error)

    });
}

function updatePersonality(personalities, windowRelocation) {
	$.ajax({
      url: "/personality",
      type: "POST",
      dataType: "json",
      data: personalities
    }).done(function(data) {
      // alert(data);
      windowRelocation();
      console.log(data)

    }).fail(function(error) {
      // alert(error);
      console.log(error)

    });
}

function updatePasswords(passwords, windowRelocation) {
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
      windowRelocation();
      console.log(data)

    }).fail(function(error) {
      // alert(error);
      console.log(error)

    });
}
