(function ($) {
	'use strict';

	var SLIDER_CONTAINER = '.the-slider';
	var SLIDER_NAVIGATION = '.the-slider-navigation';
	var SLIDER_NAVIGATION_CTRL_EL = 'li';
	var SLIDER_VIEWPORT = '.the-slider-viewport';
	var SLIDER_IMG_CONTAINER = '.the-slider-viewport-slides';
	var SLIDER_NAVIGATION_ACTIVE_CTRL_EL = 'active-ctrl-el';

	// Slider class
	function Slider (rootNode, settings) {
		settings = settings || {};

		var defaultSettings = {
			viewportWidth: 600,
			viewportHeight: 227,
			navBarWidth: 250,
			navBarHeight: 227,
			navBarCtrlElHeight: 56,
			animationTime: 1500,
			changeSlidesTime: 2000,
			lastClickTimeout: 5000
		};

		this.settings = $.extend( {}, defaultSettings, settings );

		this.rootNode = $(rootNode);
		this.timerId = null;
		this.lastClickTimerId = null;
		this.currControlEl = null;

		this.init();
	}

	Slider.prototype.setStyleCtrlEl = function(currCtrlEl) {
		currCtrlEl.addClass(SLIDER_NAVIGATION_ACTIVE_CTRL_EL);
		currCtrlEl.find('img').show();

		var nextCtrlEl = currCtrlEl.next();
		var firstCtrlElNum;
		if ( !nextCtrlEl.length ) {
			firstCtrlElNum = 0; 
			this.currControlEl = this.navBarCntrEls.eq(firstCtrlElNum);
		} else {
			this.currControlEl = nextCtrlEl;
		}
	};

	Slider.prototype.animateImg = function(currCtrlEl) {
		this.navBarCntrEls.removeClass(SLIDER_NAVIGATION_ACTIVE_CTRL_EL);
		this.navBarCntrElArrows.hide();

		this.setStyleCtrlEl(currCtrlEl);

		// Calculate offset width
		var ctrlElIndex = currCtrlEl.index();
		var imgContainerOffset = -(ctrlElIndex * this.settings.viewportWidth); 
		
		this.imgContainer.stop().animate({
			left: imgContainerOffset
		}, this.settings.animationTime );
	};

	Slider.prototype.toggleTimer = function(startTimer) {
		if (startTimer) {
			//start timer
			var self = this;
			var timeoutMs = this.settings.changeSlidesTime;
			this.timerId = setTimeout($.proxy(function run() {
				this.animateImg(this.currControlEl);
				this.timerId = setTimeout($.proxy(run, this), timeoutMs);
			}, self), timeoutMs);
		} else {
			//stop timer
			clearTimeout(this.timerId);
		}
	};

	Slider.prototype.restartLastClickTimer = function() {
		//Stop both timers: timer for last click and regular timer
		this.toggleTimer(false);
		clearTimeout(this.lastClickTimerId);
		//start timer
		var self = this;
		var timeoutMs = this.settings.lastClickTimeout;
		this.lastClickTimerId = setTimeout($.proxy(function run() {
			this.animateImg(this.currControlEl);
			//start regular timer
			this.toggleTimer(true);
		}, self), timeoutMs);
	};

	Slider.prototype.animateImgHandler = function(event) {
		// Stop timer
		this.restartLastClickTimer();

		var currTarget = $(event.currentTarget);
	
		this.animateImg(currTarget);
	};

	Slider.prototype.setInitDimensions = function() {
		var viewport = this.rootNode.find(SLIDER_CONTAINER + ' ' + SLIDER_VIEWPORT);
		this.imgContainer = this.rootNode.find(SLIDER_CONTAINER + ' ' + SLIDER_IMG_CONTAINER);
		var navBar = this.rootNode.find(SLIDER_CONTAINER + ' ' + SLIDER_NAVIGATION);
		this.navBarCntrEls = navBar.find(SLIDER_NAVIGATION_CTRL_EL);
		this.navBarCntrElArrows = this.navBarCntrEls.find('img');

		viewport.css({'width': this.settings.viewportWidth, 
						'height': this.settings.viewportHeight});

		var imgContainerWidth = this.settings.viewportWidth * this.settings.imgAmount;
		var imgContainerHeight = this.settings.viewportHeight;

		this.imgContainer.css({'width': imgContainerWidth, 
							'height': imgContainerHeight});
		navBar.css({'width': this.settings.navBarWidth, 
						'height': this.settings.navBarHeight});

		this.navBarCntrEls.height(this.settings.navBarCtrlElHeight);
	};

/* Initial markup
<div class="the-slider">
	<ul class="the-slider-navigation">
		<li><img src="tasks/16-slider/img/nav-arrow.png" alt=""></li>
		<li><img src="tasks/16-slider/img/nav-arrow.png" alt=""></li>
		<li><img src="tasks/16-slider/img/nav-arrow.png" alt=""></li>
		<li><img src="tasks/16-slider/img/nav-arrow.png" alt=""></li>
	</ul><!--
	--><div class="the-slider-viewport">
		<ul class="the-slider-viewport-slides">
			<li><img src="tasks/16-slider/img/image1.jpg" alt=""></li><!--
			--><li><img src="tasks/16-slider/img/image2.jpg" alt=""></li><!--
			--><li><img src="tasks/16-slider/img/image3.jpg" alt=""></li><!--
			--><li><img src="tasks/16-slider/img/image4.jpg" alt=""></li>
		</ul>
	</div>
</div>
*/
	
	Slider.prototype.createInitMarkup = function () {
		var initialMarkup = '<div class="the-slider"><ul class="the-slider-navigation"><li><img src="tasks/16-slider/img/nav-arrow.png" alt=""></li><li><img src="tasks/16-slider/img/nav-arrow.png" alt=""></li><li><img src="tasks/16-slider/img/nav-arrow.png" alt=""></li><li><img src="tasks/16-slider/img/nav-arrow.png" alt=""></li></ul><div class="the-slider-viewport"><ul class="the-slider-viewport-slides"><li><img src="tasks/16-slider/img/image1.jpg" alt=""></li><li><img src="tasks/16-slider/img/image2.jpg" alt=""></li><li><img src="tasks/16-slider/img/image3.jpg" alt=""></li><li><img src="tasks/16-slider/img/image4.jpg" alt=""></li></ul></div></div>'; 
		this.rootNode.append(initialMarkup);
	};

	Slider.prototype.init = function() {
		this.createInitMarkup();
		this.setInitDimensions();
		this.navBarCntrEls.on('click', $.proxy( this.animateImgHandler, this));
		
		var initialCtrlElNum = 0; 
		this.currControlEl = this.navBarCntrEls.eq(initialCtrlElNum);
		this.setStyleCtrlEl(this.currControlEl);
		// Start timer
		this.toggleTimer(true);
	};

	window.Slider = Slider; 
}(jQuery));