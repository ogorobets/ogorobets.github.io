function isInArray() {
	'use strict';

	var elsToVerify = [];
	for (var i = 0; i < arguments.length - 1; i++) {
		var currVal = arguments[i];
		elsToVerify.push(currVal);
	}

	var arrToVerify = arguments[arguments.length - 1];

	for (i = 0; i < elsToVerify.length; i++) {
		currVal = elsToVerify[i];
		if (arrToVerify.indexOf(currVal) === -1) {
			return false;
		}
	}

	return true;
}