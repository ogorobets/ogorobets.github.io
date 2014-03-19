(function(doc, $){
	'use strict';

	function makeZoomable(node) {
		this.rootEl = node;
		this.init();
	}

	makeZoomable.prototype.changeImgSize = function () {
		if (this._largeImgShown) {
			var imgSizeMultiplier = 0.9;
			var imgEl = this.zoomerEl.find('img');
			var windowWidth = $( window ).width();
			var windowHeight = $( window ).height();
		
			var newImgWidth = Math.floor(imgSizeMultiplier * windowWidth);
			var newImgHeight = Math.floor(imgSizeMultiplier * windowHeight);

			imgEl.css( 'max-width', newImgWidth + 'px' );
			imgEl.css( 'max-height', newImgHeight + 'px' );
		}
	}; 

	makeZoomable.prototype.hidePopup = function () {
		this.zoomerEl.hide();
		this._largeImgShown = false;
	};

	makeZoomable.prototype.showPopup = function (event) {
		var imgSrc = $(event.target).attr('src');
		var largeImgSrc = imgSrc.replace('small', 'large');
		var largeImgEl = this.zoomerEl.find( 'img' );
		largeImgEl.attr('src', largeImgSrc);
		
		this._largeImgShown = true;
		this.changeImgSize();
		this.zoomerEl.show();
	};


	/* Zoomer markup
	<div class="zoomer_container">
		<div class="zoomer_content_container">
			<div class="zoomer_inner_container">
			 	<div class="zoomer_img_container"> 
					<img src="" alt="">
					<div class="zoomer_close_btn">&times;</div>	
				</div> 	
			</div>
		</div>
		<div class="zoomer_bg"></div>
	</div>
*/
	makeZoomable.prototype.init = function () {
		var self = this;
		this._largeImgShown = false;
		var zoomerMarkup = '<div class="zoomer_container"> <div class="zoomer_content_container"> <div class="zoomer_inner_container"> <div class="zoomer_img_container"> <img src="" alt=""> <div class="zoomer_close_btn">&times;</div> </div> </div> </div> <div class="zoomer_bg"></div> </div>';
		this.zoomerEl = $(zoomerMarkup);
		this.zoomerEl.appendTo( 'body' ).hide();

		$( this.rootEl ).on( 'click', 'img', $.proxy(this.showPopup, this) );

		$( this.zoomerEl ).on( 'click', '.zoomer_close_btn', $.proxy(this.hidePopup, this));

		$( window ).on( 'resize', $.proxy(this.changeImgSize, this));

		$( doc ).on( 'keyup', function(event) {
			var KEY_CODE_ESC = 27;

			if (self._largeImgShown && event.keyCode === KEY_CODE_ESC) {
				self.hidePopup();
			}
		});

	};

	window.makeZoomable = makeZoomable;
}(document, jQuery));