if (!Array.prototype.every) {
	Array.prototype.every = function(fun /*, thisArg */ ) {
		'use strict';

		if (this === void 0 || this === null)
			throw new TypeError();

		var t = Object(this);
		var len = t.length >>> 0;
		if (typeof fun !== 'function')
			throw new TypeError();

		var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
		for (var i = 0; i < len; i++) {
			if (i in t && !fun.call(thisArg, t[i], i, t))
				return false;
		}

		return true;
	};
}


(function(doc) {
	'use strict';

	// Helper functions
	function hasClass(node, classToCheck) {

		var nodeClasses = node.className.split(' ');

		var hasNoClass = nodeClasses.every(function(currClass) {
			return (currClass !== classToCheck);
		});

		return !hasNoClass;
	}

	function addClass(node, classToAdd) {

		if (!hasClass(node, classToAdd)) {
			var nodeClasses = node.className.split(' ');
			nodeClasses.push(classToAdd);
			node.className = nodeClasses.join(' ');
		}
	}

	function closest(node, testFunc) {

		var currentNode = node || null;
		while (currentNode) {
			if (testFunc(currentNode) === true) {
				return currentNode;
			}
			currentNode = currentNode.parentNode;
		}
		return null;
	}

	//Class CreateCounter;
	function CreateCounter(initialValue) {
		this.counter = initialValue || 0;
	}

	CreateCounter.prototype.inc = function(num) {
		var incVal;

		if (num === undefined) {
			incVal = 1;
		} else {
			incVal = num;
		}

		this.counter += incVal;

	};

	CreateCounter.prototype.dec = function(num) {
		var decVal;

		if (num === undefined) {
			decVal = 1;
		} else {
			decVal = num;
		}

		this.counter -= decVal;
	};

	CreateCounter.prototype.get = function() {
		return this.counter;
	};


	//Class Timer
	function Timer(rootContainer) {
		this.rootEl = rootContainer;
		this.init();
		this.startButton.addEventListener('click', this.toggleStartButton.bind(this), false);
		this.lapButton.addEventListener('click', this.lapButtonProcessing.bind(this), false);
		this.lapContainer.addEventListener('click', this.deleteLap.bind(this), false);
		this.resetButton.addEventListener('click', this.resetButtonProcessing.bind(this), false);
		this.timerNode.addEventListener('mouseover', this.setCurrentTimerId.bind(this), false);

		this.setTimerId();

		this.currentTimerTimeMs = 0;

		if (!Timer.prototype._globalInitDone) {
			this.globalInit();
			Timer.prototype._globalInitDone = true;
		}
	}

	Timer.prototype.init = function() {
		var timerMarkup = '<div class="col-xs-4"> <h2 class="stopwatch-current"><div>00:00:00:000</div></h2> <div class="stopwatch-laps"> </div> </div> <div class="col-xs-4 stopwatch-controls"> <div class="btn-group btn-group-lg"> <button class="btn btn-primary">Start</button> <button class="btn btn-info">Lap</button> </div> <button class="btn btn-danger btn-sm">Reset</button> </div>';
		this.timerNode = doc.createElement('div');
		this.timerNode.className = 'row';
		this.timerNode.innerHTML = timerMarkup;

		var timerContainer = this.rootEl;

		if (!timerContainer) {
			timerContainer = doc.createElement('div');
			timerContainer.className = 'container';
			timerContainer.appendChild(this.timerNode);
			var body = doc.body;
			body.insertBefore(timerContainer, body.firstChild);
		}

		timerContainer.appendChild(this.timerNode);

		this.startButton = this.timerNode.querySelector('.btn.btn-primary');
		this.lapButton = this.timerNode.querySelector('.btn.btn-info');
		this.resetButton = this.timerNode.querySelector('.btn.btn-danger.btn-sm');
		this.currentTimeField = this.timerNode.querySelector('.stopwatch-current');
		this.lapContainer = this.timerNode.querySelector('.stopwatch-laps');

		Timer.prototype._objLinks.push(this);

	};

	Timer.prototype.globalInit = function() {
		window.addEventListener('keydown', Timer.prototype.parseKeyPressing, false);
	};

	Timer.prototype.parseKeyPressing = function(event) {
		var KEY_CODE_OF_BUTTON_S = 83;
		var KEY_CODE_OF_BUTTON_L = 76;
		var KEY_CODE_OF_BUTTON_R = 82;

		var currentTimerId = Timer.prototype._currentTimerId;
		var objLinks = Timer.prototype._objLinks;
		var currentTimer = objLinks[currentTimerId];
		var currKeyCode = event.keyCode;

		if (currKeyCode === KEY_CODE_OF_BUTTON_S) {
			currentTimer.toggleStartButton.call(currentTimer);
		}

		if (currKeyCode === KEY_CODE_OF_BUTTON_L) {
			currentTimer.lapButtonProcessing.call(currentTimer);
		}

		if (currKeyCode === KEY_CODE_OF_BUTTON_R) {
			currentTimer.resetButtonProcessing.call(currentTimer);
		}
	};

	Timer.prototype._nextTimerId = 0;
	Timer.prototype._currentTimerId = 0;
	Timer.prototype._objLinks = [];
	Timer.prototype._globalInitDone = false;

	Timer.prototype.setTimerId = function() {
		var counter = new CreateCounter(Timer.prototype._nextTimerId);
		this.timerObjId = counter.get();
		counter.inc();
		Timer.prototype._nextTimerId = counter.get();
	};

	Timer.prototype.setCurrentTimerId = function() {
		Timer.prototype._currentTimerId = this.timerObjId;
	};


	Timer.prototype.lapButtonProcessing = function() {
		var currentLapMarkup = '<div>{{currentTime}}</div> <span class="label label-danger">×</span>';
		var currentLapNode;
		var currnetTimerDateTime = new Date(this.currentTimerTimeMs);
		var currentTimeStr = this.getCurrTimerTimeStr(currnetTimerDateTime);

		currentLapNode = doc.createElement('div');
		currentLapNode.className = 'alert alert-info';
		currentLapNode.innerHTML = currentLapMarkup.replace('{{currentTime}}', currentTimeStr);

		this.lapContainer.appendChild(currentLapNode);
	};

	Timer.prototype.isCloseLapEl = function(node) {
		return hasClass(node, 'alert') && hasClass(node, 'alert-info');
	};

	Timer.prototype.deleteLap = function(event) {
		var closeLapEl;
		var currNode = event.target;
		closeLapEl = closest(currNode, this.isCloseLapEl);

		if (closeLapEl) {
			closeLapEl.parentNode.removeChild(closeLapEl);
		}
	};

	Timer.prototype.resetButtonProcessing = function() {
		this.currentTimeField.innerHTML = '<div>00:00:00:000</div>';
		this.lapContainer.innerHTML = '';
		this.currentTimerTimeMs = 0;
		this.startButton.innerHTML = 'Start';
		clearTimeout(this.timerId);
	};

	Timer.prototype.toggleStartButton = function() {
		var startTimer;

		// start timer
		if (this.startButton.innerHTML === 'Start') {
			this.startButton.innerHTML = 'Stop';
			startTimer = true;
		} else {
			//stop timer
			this.startButton.innerHTML = 'Start';
			startTimer = false;
		}

		this.toggleTimer(startTimer);
	};

	Timer.prototype.getCurrTimerTimeStr = function(timerDateTime) {
		var hours = timerDateTime.getUTCHours();
		var minutes = timerDateTime.getUTCMinutes();
		var seconds = timerDateTime.getUTCSeconds();
		var milliseconds = timerDateTime.getUTCMilliseconds();
		var currTimeStr = '';

		if (parseInt(hours)) {
			if (hours.toString().length === 1) {
				hours = '0' + hours;
			}
			currTimeStr = currTimeStr + hours + ':';
		}

		if (parseInt(hours) || parseInt(minutes)) {
			if (minutes.toString().length === 1) {
				minutes = '0' + minutes;
			}
			currTimeStr = currTimeStr + minutes + ':';
		}

		if (parseInt(hours) || parseInt(minutes) || parseInt(seconds)) {
			if (seconds.toString().length === 1) {
				seconds = '0' + seconds;
			}
			currTimeStr = currTimeStr + seconds + ':';
		}

		if (parseInt(hours) || parseInt(minutes) || parseInt(seconds) || parseInt(milliseconds)) {
			if (milliseconds.toString().length === 1) {
				milliseconds = '00' + milliseconds;
			} else if (milliseconds.toString().length === 2) {
				milliseconds = '0' + milliseconds;
			}
			currTimeStr = currTimeStr + milliseconds;
		} else {
			currTimeStr = milliseconds.toString();
		}

		return currTimeStr;
	};

	Timer.prototype.toggleTimer = function(startTimer) {
		if (startTimer) {
			//start timer
			this.lastStartTimeMs = Date.now();

			var self = this;
			var timeoutMs = 115;
			this.timerId = setTimeout(function run() {
				self.updateTimer.call(self);
				self.timerId = setTimeout(run, timeoutMs);
			}, timeoutMs);
		} else {
			//stop timer
			clearTimeout(this.timerId);
		}
	};

	Timer.prototype.updateTimer = function() {
		var timeNow = Date.now();
		var deltaTime = timeNow - this.lastStartTimeMs;
		this.lastStartTimeMs = timeNow;

		this.currentTimerTimeMs += deltaTime;
		var currentTimerDateTime = new Date(this.currentTimerTimeMs);

		this.currentTimeField.innerHTML = '<div>' + this.getCurrTimerTimeStr(currentTimerDateTime) + '</div>';
	};

	window.CreateTimer = Timer;
}(document));