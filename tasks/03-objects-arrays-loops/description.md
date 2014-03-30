Task descriptions
=================

1. Empty array is a subset of each array. Create function `contains`. If array `where` contains elements of array `what` then the function returns true, otherwise false. 

2. Create function `extractOddItems(arr)` that accepts array or array-like object as an argument. The function returns new array which only consists of elements with odd indexes.


3. Create function `createObject(keys, values)` that accepts two arrays as arguments. The function returns an object where key values are taken from array `keys` and values corresponding the keys are taken from array `values`. If amount of keys is less than amount of values then redundant values have to be ignored. If amount of keys is more than amount of values then these values set to `undefined`.

        createObject(['name', 'age'], ['Vasiliy', 45]); // {name: 'Vasiliy', age: '45'}
        createObject(['name', 'age'], ['Vasiliy']); // {name: 'Vasiliy', age: undefined}
        createObject(['name'], ['Vasiliy', 45]); // {name: 'Vasiliy'}
        createObject([], []); // {}

4. Create function `toMatrix(data, rowSize)` that accepts array and number as arguments. The function return new array. The argument `rowSize` defines number of elements in subarrays. Elements for subarrays are taken from array `data`. Original array has to stay immutable.

        toMatrix([1,2,3,4,5,6,7,8,9], 3); // [[1,2,3], [4,5,6], [7,8,9]]
        toMatrix([1,2,3,4,5,6,7], 3); // [[1,2,3], [4,5,6], [7]]
        toMatrix([1,2,3], 5); // [[1,2,3]]
        toMatrix([], 3); // []

5. Create function`toQueryString(obj)` that accepts object as an argument and returns string.   For example:

        toQueryString({}); // -> ''
        toQueryString({test: true}); // -> 'test=true'
        toQueryString({test: true, foo: 'bar'}); // -> 'test=true&foo=bar'
