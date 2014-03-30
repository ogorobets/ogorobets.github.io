Task descriptions
=================

1. Create function `getUnique(arr)` that accepts array or array-like object as single argument. The function returns array with unique set of elements.  Passed argument has to stay immutable. Order of elements in result array has to coincide with one in passed argument.
It isn't necessarily to process value `NaN` in a special way. 

		var a = {};
		var b = {};

		var u = getUnique([a,b,b,a]);
		console.log(u[0] === a); // true
		console.log(u[1] === b); // true
		console.log(u.length === 2); // true

2. Create function `createCachable(func)` that accepts another function as an argument. Function `createCachable(func)` returns new function that returns result of execution `func`. This new function remembers result of execution `func` and returns cached result if some set of argumets were passed to `func` earlier. `createCachable(func)` can create any amount of cached function versions. 

		// This funtion returns second power of argument. 
		// But its execution time equals one second
		function longTimeMultiplier(num) { 
		var now = new Date().getTime();
		  while (new Date().getTime() < now + 1000); 
		  return num * num;
		}

		var cachableMultiplier = createCachable(longTimeMultiplier);

		// First call of the cached function lasts as long as call of the original function
		var mul10 = cachableMultiplier(10);

		// Next calls of the cached function with the same argument are practically instant
		var mul10_1 = cachableMultiplier(10);
		var mul10_2 = cachableMultiplier(10);
		var mul10_3 = cachableMultiplier(10);


3. Create function `createKeeper()` that returns object with two methods `put(key, value)` and `get(key)`. Method `get(key)` has to return data that were stored using method `put` if it's called with the same value of `key` as method `put` previously. Keys can be both objects and primitives. 
Don't process value `NaN` in a special way.
If `put` was called with a key value used previously then corresponding old value is rewritten by the new one.
Access to keys and corresponding values has to be granted only using methods `put` and `get`.

		var keeper = createKeeper();
		var key1 = {};
		var key2 = {};
		var key1Copy = key1;

		keeper.put(key1, 999)
		keeper.put(key2, [1,2,3])
		console.log(keeper.get(key1)); // 999
		console.log(keeper.get(key2)); // [1,2,3]
		console.log(keeper.get(key1Copy)); // 999
		console.log(keeper.get({})); // null
		keeper.put(key1, key2);
		console.log(keeper.get(key1Copy) === key2); // true

4. Create function `createSummator(initialValue)` with optional first argument that is starting point of the counter. If the argument `initialValue` wasn't passed then counting starts from `0`. Each call of the function returns object with methods `inc(num)`, `dec(num)`, `get()`. Function `createSummator(initialValue)` can return any amount of objects.
Implementation of function `createSummator(initialValue)` has to allow manipulation with counter value only using these methods.
 - Call of method `inc(num)` increases value of the counter by value of argument `num`. If the method was called without an argument then counter value increases by `1`.
 - Call of method `dec(num)` decreases value of the counter by value of argument `num`. If the method was called without an argument then counter value decreases by `1`. 
 - Call of method `get()` returns current value of the counter. 

	Exapmles of usage: 

		var s1 = createSummator();
		s1.inc();
		s1.inc();
		s1.inc();
		console.log(s1.get()); // 3

		var s2 = createSummator(10);
		s2.inc(2);
		s2.inc(3);
		s2.inc(4);
		console.log(s2.get()); // 19

		var s3 = createSummator(5);
		s3.inc(5);
		s3.dec(10);
		console.log(s3.get()); // 0

5. Following code creates array of functions-shooters `shooters`. The idea is that each shooter has to show its own id.

		function makeArmy() {
		  var shooters = [];
		 
		  for(var i=0; i<10; i++) {
		    var shooter = function() { // functions-shooter
		      alert(i); // shows its own id
		    };
		    shooters.push(shooter);
		  }

		  return shooters;
		}
		 
		var army = makeArmy();
		 
		army[0](); // shooter shows id 10 instead of 0
		army[5](); // shooter shows id 10...
		// .. all shooters show id 10 instaead of 0,1,2...9
Why function-shooters show all the same? Please correct the code to shooters worked as planned.

