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

function updatePersonality(personalities, nextPath) {
	$.ajax({
      url: "/personality",
      type: "POST",
      dataType: "json",
      data: personalities
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

function updatePasswordFromBankSelection2(password, nextPath){
	if(dev) console.log(password)
	// alert()
	$.ajax({
      url: "/password-bank-selection-test-2",
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
	  // confirmButtonColor: '#3085d6',
	  confirmButtonText: 'Continue'
	}).then(function () {
		$("#test-container").toggle();
		$(".loader-container").toggle();
	  window.location.pathname = nextPath;
	})
}