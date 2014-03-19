function createObject(keys, values) {
	"use strict";
	
	var createdObject = {};
	for (var i = 0; i < keys.length; i++) {
		var key = keys[i];
		if (i in values) {
			createdObject[key] = values[i];
		} else {
			createdObject[key] = undefined;
		}
	}
	return createdObject;
}