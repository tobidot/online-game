/**
Main file
@requires "./ErrorStack.js"
**/

// classes
const BASE_URL = "localhost";
var ErrorStack = require("./ErrorStack.js");

// global variables

// Main - Namespace
var my = (function () {
	return {
	};
})();

// Main function
(function () {
	if (typeof document === "undefined") {
		// testing via node.js
	}
	else {
		document.getElementById("nextPage").onclick = my.nextPage;
		document.getElementById("previousPage").onclick = my.prevPage;
		my.initializeTrackTable();
	}
})();

