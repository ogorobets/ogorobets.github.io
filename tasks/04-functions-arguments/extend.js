function extend() {
	'use strict';

	var extendedObj = {};

	for (var i = 0; i < arguments.length; i++) {
		var currObj = arguments[i];
		for (var key in currObj) {
			extendedObj[key] = currObj[key];
		}
	}

	return extendedObj;
}