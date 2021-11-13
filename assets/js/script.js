const startHour = 9;
const endHour = 14; // using 24hour time

// gets current time and displays it in the header
function updateTimeInLead() {
	var today = moment().format('dddd, MMMM Do YYYY, h:mm:ss a');

	$('#currentDay').text(today);
}

// sets current time in header and sets interval to update it.
function setTimeInLead() {
	// Set initial time
	updateTimeInLead();
	// update time display periodically
	setInterval(updateTimeInLead, 5000);
}

// changes the background color of the time blocks depending on whether the time is past, present or future
function updateBlockColors() {
	// get current hour in 24 hour time
	var curHour = moment().format('H');
	curHour = 13;
	var timeBlock;

	//Go through all time blocks from 9am to 5pm 24 hour time
	// and change color
	for (var time = startHour; time <= endHour; time++) {
		// TODO Change to jQuery?

        // remove old color classes from all text areas
        $(".description").removeClass("past");
        $(".description").removeClass("preset");       
        $(".description").removeClass("future");

   		timeBlock = document.getElementById(time.toString());


		// check if the time has past or not, set color
		if (curHour == time) {
			//set time block to present color
			// remove others?
			timeBlock.classList.remove('past');
			timeBlock.classList.remove('future');
			timeBlock.classList.add('present');
		} else if (curHour < time) {
			//set time block to future
			timeBlock.classList.remove('present');
			timeBlock.classList.remove('past');
			timeBlock.classList.add('future');
		} else {
			//set time block to past
			timeBlock.classList.remove('present');
			timeBlock.classList.remove('future');
			timeBlock.classList.add('past');
		}
	}
}

// SetBlock Colors changes the background color of the time blocks depending on whether the time is past, present or future and sets interval to periodically check
function setBlockColors() {
	updateBlockColors();

	// set interval to check to change colors on time blocks
	setInterval(updateBlockColors, 60000);
}

// save time block's data in local storage
function saveDescription(event) {
	console.log('clicked s: ' + event.target);
	console.log(event.target.previousElementSibling.id);
	//check if there's any text
	//save to local storage use Id, description

	// Find the associated textarea
	var curTextArea = event.target.previousElementSibling;

	// Remove leading/trailing white space
	text = $(curTextArea).val().trim();

	// save key and user's text to local Storage. The row's time is in the id field.
	localStorage.setItem("PlannerHour " + curTextArea.id, text);
}

// Let's get the ball rolling!
function init() {
	// Set initial time in the header and then set interval to update it periodically
	setTimeInLead();

	// Sets the colors of the text areas depending on whether they are past present or future.
	setBlockColors();
	// Add event listener to all save buttons

	var elements = document.getElementsByClassName('saveBtn');
	for (var i = 0; i < elements.length; i++) {
		elements[i].addEventListener('click', saveDescription);
	}

	// read storage
	// set description

	// // OR
	// var saveButton = $(".saveBtn");
	// saveButton.click(function() {
	// var results = this.
	//  })
}

// Let's 5get the ball rolling
init();
