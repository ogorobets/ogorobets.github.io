"use strict";

// BEGIN This part of code was taken from http://learn.javascript.ru/array
if ([].indexOf) {

	var find = function(array, value) {
		return array.indexOf(value);
	}

} else {
	var find = function(array, value) {
		for (var i = 0; i < array.length; i++) {
			if (array[i] === value) return i;
		}
		return -1;
	}
}
// END This part of code was taken from http://learn.javascript.ru/array

function contains(where, what) {
	// if what is an empty array [], then loop doesn't start 
	// and function return true
	for (var i = 0; i < what.length; i++) {
		if (find(where, what[i]) === -1) {
			return false;
		}
	}
	return true;
}