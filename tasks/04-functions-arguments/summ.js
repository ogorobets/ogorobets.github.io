function summ() {
	'use strict';

	var summ = 0;
	for (var i = 0; i < arguments.length; i++) {
		summ += parseFloat(arguments[i]);
	}

	return summ;
}