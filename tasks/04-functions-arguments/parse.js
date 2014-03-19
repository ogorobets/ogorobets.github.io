function parse(queryString) {
	'use strict';
	
	var resultObj = {};
	
	if (queryString === "") {
		return resultObj;
	}
	
	var parsedStrArr = queryString.split("&");
	
	var keyValArr = [];
	for (var i = 0; i < parsedStrArr.length; i++) {
		var currArr = parsedStrArr[i].split("=");
		keyValArr.push(currArr);
	}
	
	for (i = 0; i < keyValArr.length; i++) {
		currArr = keyValArr[i];
		var key = currArr[0];
		var val = currArr[1];

		var isString = parseInt(val, 10).toString() !== val;

		if (!isNaN(parseInt(val, 10)) && !isString) {
			val = parseInt(val, 10);
		} else if (val.toLowerCase() === "false") {
			val = false;
		} else if (val.toLowerCase() === "true") {
			val = true;
		}

		resultObj[key] = val;
	}

	return resultObj;
}