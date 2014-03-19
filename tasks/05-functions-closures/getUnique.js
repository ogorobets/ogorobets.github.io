function getUnique(arr) {
	'use strict';

	var uniqueArr = [];

	Array.prototype.forEach.call(arr, function(arrEl) {
		if (uniqueArr.indexOf(arrEl) === -1) {
			uniqueArr.push(arrEl);
		}
	});

	return uniqueArr;
}