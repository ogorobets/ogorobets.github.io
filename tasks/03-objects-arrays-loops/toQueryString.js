function toQueryString(obj) {
	"use strict";

	var queryString = "";
	for (var key in obj) {
		queryString += key.toString() + "=" + obj[key].toString() + "&";
	}
	//delete last "&" from queryString
	queryString = queryString.substr(0, queryString.length - 1);

	return queryString;
}