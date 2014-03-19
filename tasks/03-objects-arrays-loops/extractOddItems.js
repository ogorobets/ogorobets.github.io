function extractOddItems(arr) {
	"use strict";

	var oddElsArr = [];

	for (var i = 1; i < arr.length; i += 2) {
		// if element with index "i" of array arr[i] exists
		// then push it to oddElsArr[] array
		if (i in arr) {
			oddElsArr.push(arr[i]);
		}
	}
	return oddElsArr;
}