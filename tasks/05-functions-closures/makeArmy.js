function makeArmy() {
	'use strict';

	var shooters = [];

	// For each iteration new function is created. And value of shooterNum stores 
	// for each function.
	for (var i = 0; i < 10; i++) {
		var shooter = (function(shooterNum) {
			return function() {
				console.log('shooter number =', shooterNum);
			};
		})(i);

		shooters.push(shooter);
	}
	
	return shooters;
}
