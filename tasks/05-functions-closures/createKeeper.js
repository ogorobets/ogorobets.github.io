function createKeeper() {
	'use strict';

	var keeper = [];

	return {
		put: function(key, value) {
			for (var i = 0; i < keeper.length; i++) {
				if (keeper[i]['key'] === key) {
					keeper[i]['value'] = value;
					return;
				}
			}

			var objToAdd = {key: key, value: value};	
			keeper.push(objToAdd);
		},
		get: function(key) {
			for (var i = 0; i < keeper.length; i++) {
				if (keeper[i]['key'] === key) {
					return keeper[i]['value'];
				}
			}

			return null;
		}
	};
}