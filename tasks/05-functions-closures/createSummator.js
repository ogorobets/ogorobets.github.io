function createSummator(initialValue) {
	'use strict';
	var summator;
	
	if (initialValue === undefined) {
		summator = 0;
	} else {
		summator = initialValue;
	}

	return {
		inc: function(num) {
			var incVal;

			if (num === undefined) {
				incVal = 1;
			} else {
				incVal = num;
			}

			summator += incVal;

		},
		dec: function(num) {
			var decVal;

			if (num === undefined) {
				decVal = 1;
			} else {
				decVal = num;
			}

			summator -= decVal;
		},
		get: function() {
			return summator;
		}
	};
}