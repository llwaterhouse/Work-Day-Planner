const startHour = 9;
const endHour = 17; // using 24hour time

// gets current time and displays it in the header
function updateTimeInLead() {
	var today = moment().format('dddd, MMMM Do YYYY, h:mm a');

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
	
	var timeBlock;
	var timeBlock2;

	// remove old color classes from all text areas
	$('.description').removeClass('past');
	$('.description').removeClass('present');
	$('.description').removeClass('future');

	//Go through all time blocks from startHour to endHour 24 hour time
	// and change color
	for (var time = startHour; time <= endHour; time++) {
		// TODO find out why jQuery not working
		// timeBlock = $("#" + time.toString());
		// console.log(timeBlock.val());
		// if (curHour == time) {
		//     console.log("setting present")
		//     $("#" + time.toString()).addClass("present");

		//     $("#" + time.toString()).attr("class", "present");
		// }

		timeBlock = document.getElementById(time.toString());

		// check if the time has past or not, set color
		if (curHour == time) {
			//set time block to present color
			timeBlock.classList.add('present');
		} else if (curHour < time) {
			//set time block to future
			timeBlock.classList.add('future');
		} else {
			//set time block to past
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

	//check if there's any text
	//save to local storage use Id, description

	// Find the associated textarea

	//Because the save button has an icon in it, sometimes the event has the button, and sometimes it has the icon. Look for the appropriate text area


	if (event.target.classList.contains("fas")) {
		//we got the icon.  Have to look up one more

		curTextArea = event.target.parentElement.previousElementSibling;
	}
	else{
		var curTextArea = event.target.previousElementSibling;
		}

	// Remove leading/trailing white space
	text = $(curTextArea).val().trim();

	// save key and user's text to local Storage. The row's time is in the id field.
	if (text!=""){
	localStorage.setItem('PlannerHour' + curTextArea.id, text);
	}
}

// read storage to see if any saved text and then set text in corresponding time block.
function updateTimeBlockText() {
	var curText;
	var curItem;
	var curTextArea;

	for (var i = startHour; i <= endHour; i++) {
		curItem = 'PlannerHour' + i.toString();
		curText = localStorage.getItem(curItem);

		if (curText != null) {
			// There is a stored key for that id, fill in text area
			curTextArea = document.getElementById(i);
			curTextArea.textContent = curText;

		}
	}
}

// set up header, restore saved text, color code text areas and set up event listeners
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

	// See if there are stored entries and restore them
	updateTimeBlockText();
}

// Let's get the ball rolling!
init();
