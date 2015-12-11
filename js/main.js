var MIN_YEAR = 1900;
var MAX_YEAR = 2000;

var generateBtn, dataDisplay, numRecordsField, processBtn, resultsDisplay;
var data = new Array();
var results = new Array();

$(document).ready(function() {
	generateBtn = document.getElementById("generate");
	dataDisplay = document.getElementById("data_display");
	numRecordsField = document.getElementById("num_records");
	processBtn = document.getElementById("process");
	resultsDisplay = document.getElementById("results_display");

	//add onclick listener for "Generate data set" button
	$(generateBtn).click(function() {
		var recValue = numRecordsField.value.trim();
		
		if(recValue != "" && !isNaN(recValue) && recValue.indexOf(".") == -1 && recValue > 0) { //make sure we're getting only positive integers in our data field
			dataDisplay.innerHTML = "";
			
			data = generateData(recValue);
			var str = "";
			for(var i = 0; i < data.length; ++i) {
				str = data[i].lastName + "," + data[i].firstName + "," + data[i].birthYear + "," + data[i].deathYear;
				dataDisplay.innerHTML += str + "<br />";
			} //end for
		} //end if
		else alert("Please enter a positive integer value.");
	}); //end click

	//add onclick listener for "Process data set" button
	$(processBtn).click(function() {
		if(data && data.length > 0) {
			results = processData();

			resultsDisplay.innerHTML = "Maximum number of people alive: " + results.max + "<br />" + "Years with max people alive:<br />";
			for(var i = 0; i < results.years.length; ++i)
				resultsDisplay.innerHTML += "&nbsp;&nbsp;&nbsp;&nbsp;" + results.years[i] + "<br />";
		} //end if
		else alert("Please generate a dataset before attempting to process.");
	}); //end click

	$(generateBtn).click(); //generate an initial set of data
}); //end ready

/**
 * Helper function for generating random data set
 */
function generateData(numToGenerate) {
	var people = new Array();

	var fnLength = FIRST_NAMES.length; //first and last names arrays are defined in names.js
	var lnLength = LAST_NAMES.length;
	for(var i = 0; i < numToGenerate; ++i) {
		//create randomly generated person
		var p = new Person();
		p.firstName = FIRST_NAMES[getRandomNumber(0, fnLength - 1)];
		p.lastName = LAST_NAMES[getRandomNumber(0, lnLength - 1)];
		p.birthYear = getRandomNumber(MIN_YEAR, MAX_YEAR);
		p.deathYear = getRandomNumber(p.birthYear, MAX_YEAR);
		
		//add to our list
		people.push(p);
	} //end for
	
	return people;
} //end function generateData

/**
 * Helper function for processing generated data
 */
function processData() {
	var resultsArr = new Array();
	var years = new Object();

	//count up how many times each year appears in the data set
	var person = null;
	for(var i = 0; i < data.length; ++i) {
		person = data[i];
		for(var j = person.birthYear; j <= person.deathYear; ++j)
			if(years[j] == null)
				years[j] = 1;
			else years[j] += 1;
	} //end foreach

	//find the years with the largest counts
	var maxCount = 0;
	var yearsArr = new Array();
	for(var year in years) {
		if(years[year] > maxCount) {
			maxCount = years[year]; //take note of the current max count
			yearsArr = new Array(); //start a new list of years with max count of people alive
			yearsArr.push(year);
		} //end if
		else if(years[year] == maxCount)
			yearsArr.push(year); //add to list of years with max count of people alive
	} //end foreach

	return { max: maxCount, years: yearsArr };
} //end function processData

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
