function createCachable(func) {
	'use strict';

	var cashedFuncResults = [];

	return function() {
		var fisrtFuncArg = arguments[0];

		// Look for cashed results of function calls
		for (var i = 0; i < cashedFuncResults.length; i++) {
			if (cashedFuncResults[i]['funcArgument'] === fisrtFuncArg) {

				return cashedFuncResults[i]['funcRes'];
			}
		}

		// if none of results found then cash result and return one
		cashedFuncResults.push({
			funcArgument: fisrtFuncArg,
			funcRes: func(fisrtFuncArg)
		});
		return cashedFuncResults[cashedFuncResults.length - 1]['funcRes'];
	};
}