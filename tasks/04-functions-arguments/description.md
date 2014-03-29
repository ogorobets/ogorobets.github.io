Task descriptions
=================

1. Create function `isInArray()` that accepts a variable number of arguments. The function returns `true` if all arguments except the last argument are included in the last one. The last argument always has to be an array.

		isInArray(1, [1]); // true
		isInArray(1, 2, [1]); // false
		isInArray(1, 2, [1,2,2,2]); // true

2. Create function `extend()` that accepts any quantity of objects and returns new object. All key-value pairs have to be gathered in this object.

		extend({foo: true}, {bar: false}); // -> {foo: true, bar: false}
		extend({}, {bar: false}); // -> {bar: false}

3. Create function `every(arr, func)` that accepts two arguments - an array and a function. And function `every` has to call passed function with arguments `arr[i], i, arr`. Funtion `every` returns `true` if for each array element `func(arr[i], i, arr)` returns `true`.

		every([], function () {return true}); // true
		every([NaN, NaN], function (el) {return isNaN(el)}); // true
		every([NaN, 0], function (el) {return isNaN(el)}); // false
		every([1,2,3], function (el, i) {return el > i}); // true
		every([2,3,4], function (el, i) {return el < i}); // false
Created function has to work in ie8.

4. Create function named `summ` that returns sum of all passed arguments. The function has to work with any arguments. The function has to return a number.

5. Create function `parse(string)` that accepts `query string` as an argument and returns an object. Next data types have to be recognized: string, integer, boolean. 

		parse(''); // -> {}
		parse('test=10'); // -> {"test": 10}
		parse('test=bar'); // -> {"test": "bar"}
		parse('test=10&foo=bar'); // -> {"test": 10, foo: "bar"}

