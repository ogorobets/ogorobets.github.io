function every(arr, func) {
	'use strict';

	for (var i = 0; i < arr.length; i++) {
		var everyResult = func(arr[i], i, arr);

		if (!everyResult) {
			return false;
		}
	}

	return true;
}