var MIN_YEAR = 1900;
var MAX_YEAR = 2000;

$(document).ready(function() {
	$("#generate").click(function() {
		var dataDisplay = document.getElementById("data_display");
		var recValue = document.getElementById("num_records").value.trim();
		
		if(recValue != "" && !isNaN(recValue) && recValue.indexOf(".") == -1) { //make sure we're getting only integers in our data field
			dataDisplay.innerHTML = "";
			
			var data = generateData(recValue);
			var str = "";
			for(var i = 0; i < data.length; ++i) {
				str = data[i].lastName + "," + data[i].firstName + "," + data[i].birthYear + "," + data[i].deathYear;
				dataDisplay.innerHTML += str + "<br />";
			} //end for
		} //end if
		else alert("Please enter an integer value.");
	}); //end click
}); //end ready

function generateData(numToGenerate) {
	var people = new Array();

	var fnLength = FIRST_NAMES.length; //first and last names arrays are defined in names.js
	var lnLength = LAST_NAMES.length;
	var middleYear = Math.round((MAX_YEAR + MIN_YEAR) / 2); //birth years will be the first half of the year range and death years will be the latter half of the year range just to make things easy
	for(var i = 0; i < numToGenerate; ++i) {
		//create randomly generated person
		var p = new Person();
		p.firstName = FIRST_NAMES[getRandomNumber(0, fnLength - 1)];
		p.lastName = LAST_NAMES[getRandomNumber(0, lnLength - 1)];
		p.birthYear = getRandomNumber(MIN_YEAR, middleYear);
		p.deathYear = getRandomNumber(middleYear + 1, MAX_YEAR);
		
		//add to our list
		people.push(p);
	} //end for
	
	return people;
} //end function generateData

function getRandomNumber(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
} //end method getRandomNumber

/**
 * Person class definition
 */
function Person() {};
Person.prototype = {
	firstName : "",
	lastName : "",
	birthYear : -1,
	deathYear : -1
};

String.prototype.trim = function() { return this.replace(/^\s+|\s+$/g,""); }
