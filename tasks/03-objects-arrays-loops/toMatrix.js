function toMatrix(data, rowSize) {
	"use strict";

	var matrix = [];
	if (data.length === 0) {
		return matrix;
	} else if (data.length <= rowSize) {
		matrix.push(data);
		return matrix;
	}

	var processedDataEls = data.length;
	var calcRowSize = rowSize;
	var i = 0;
	while (processedDataEls > 0) {
		var matrixRow = [];

		if (processedDataEls < rowSize) {
			calcRowSize = processedDataEls;
		}

		for (var j = 0; j < calcRowSize; j++) {
			matrixRow.push(data[i * rowSize + j]);
		}
		i++;

		processedDataEls -= rowSize;
		matrix.push(matrixRow);
	}

	return matrix;
}