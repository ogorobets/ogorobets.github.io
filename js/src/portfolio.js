(function (doc, $) {
	'use strict';

	function Portfolio () {
		this.tabContainer = $('.tab-container');
		this.taskList = $('.task-list');
		this.body = $('body', doc);
		this.head = $('head', doc);
		this.widgetContent = null;
		this.rootClass = null;
		this.stateDisplayWidget = false;
		this.init();
	}

	/* Code template
	<div class="tab-pane fade" id="{{idCode}}">
		<pre>
			<code></code>
		</pre>
	</div>
	*/
	Portfolio.prototype.createCodeContent = function (taskURI, fileName) {
		var fileURL = taskURI + fileName;
		var idCode = fileName.replace(/[.]/g, '-');
		var codeTemplate = '<div class="tab-pane fade" id="{{idCode}}"><pre><code></code></pre></div>';
		codeTemplate = codeTemplate.replace('{{idCode}}', idCode);
		
		$.get(fileURL).done($.proxy(function (code) {
			var codeContainer = $(codeTemplate);
			codeContainer.find('code').text(code);
			this.tabContainer.find('.tab-content').append(codeContainer);
			var codeEl = codeContainer.find('code')[0];
			hljs.configure({tabReplace: '    '});
			//hljs.configure({languages: ['xml']});
			hljs.highlightBlock(codeEl);
		}, this));

	};

	Portfolio.prototype.createCodeTabs = function (taskFiles, taskURI) { 
		for (var i = 0; i < taskFiles.length; i++) {
			var tabTemplate = '<li><a href="#{{tabHref}}">{{fileName}}</a></li>';
			var fileName = taskFiles[i];
			this.createCodeContent(taskURI, fileName);

			var tabHref = fileName.replace(/[.]/g, '-');
			tabTemplate = tabTemplate.replace('{{tabHref}}', tabHref);
			tabTemplate = tabTemplate.replace('{{fileName}}', fileName);

			var navTab = $(tabTemplate);
			navTab.appendTo(this.navFileTabs);
		}
	};

	Portfolio.prototype.createDisplayTab = function () { 
		var tabTemplate = '<li><a href="#display-widget">Display</a></li>';
		
		var displayTab = $(tabTemplate);
		displayTab.appendTo(this.navFileTabs);

		this.widgetContent = $('<div class="tab-pane fade" id="display-widget"></div>');
		this.tabContainer.find('.tab-content').append(this.widgetContent);
	};

	Portfolio.prototype.createWidget = function () { 
		for (var i = 0; i < this.allTaskFiles.length; i++) {
			var cssRegExp = /\.css$/;
			var jsRegExp = /\.js$/;

			var currFileNames = this.allTaskFiles[i];
			var currURI = this.taskURIs[i];
			for (var j = 0; j < currFileNames.length; j++) {
				if (cssRegExp.test(currFileNames[j])) {
					this.widgetContent.append('<link rel="stylesheet" href="'+ currURI + currFileNames[j] + '">');
				}
				if (jsRegExp.test(currFileNames[j])) {
					this.widgetContent.append('<script src="'+ currURI + currFileNames[j] + '"></script>');
				}
			}

		}	

/* Zoomer markup
	<h1>Набор фоток номер один</h1>
	<div class="gallery-1">
		<img src="tasks/15-zoomer/img/small/birds.jpg" alt="">
		<img src="tasks/15-zoomer/img/small/dog.jpg" alt="">
	</div>

	<h1>Набор фоток номер два</h1>
	<div class="gallery-2">
		<img src="tasks/15-zoomer/img/small/goats.jpg" alt="">
		<img src="tasks/15-zoomer/img/small/hedgehog.jpg" alt="">
		<img src="tasks/15-zoomer/img/small/pigeon.jpg" alt="">
	</div>
*/
		if (this.rootClass !== 'makeZoomable') {
			eval('new ' + this.rootClass + '(this.widgetContent[0])');
		} else {
			var zoomerMarkup = '<h1>Набор фоток номер один</h1><div class="gallery-1"><img src="tasks/15-zoomer/img/small/birds.jpg" alt=""> <img src="tasks/15-zoomer/img/small/dog.jpg" alt=""></div><h1>Набор фоток номер два</h1><div class="gallery-2"><img src="tasks/15-zoomer/img/small/goats.jpg" alt=""> <img src="tasks/15-zoomer/img/small/hedgehog.jpg" alt=""> <img src="tasks/15-zoomer/img/small/pigeon.jpg" alt=""></div>';
			this.widgetContent.append(zoomerMarkup);
			eval('new ' + this.rootClass + '($( ".gallery-1" ))');
			eval('new ' + this.rootClass + '($( ".gallery-2" ))');
		}
	};

	Portfolio.prototype.destroyWidget = function () { 
		this.tabContainer.find('.tab-content #display-widget').empty();
	};

	Portfolio.prototype.createTabs = function (tabFolder) {
		/* Initial tab markup
		<ul class="nav nav-tabs" />
			<li class="active"><a href="#description">Description</a></li>
		</ul>
		*/

		var navDescriptionTab = $('<li class="active"><a href="#description">Description</a></li>');
		this.navFileTabs = $('<ul class="nav nav-tabs" />');
		navDescriptionTab.appendTo(this.navFileTabs);
		this.navFileTabs.appendTo(this.tabContainer);

		/* Initial code content markup
		<div class="tab-content">
			<div class="tab-pane fade active in" id="description"></div>
		</div>
		*/

		var description = $('<div class="tab-pane fade active in" id="description" />');
		var tabContent = $('<div class="tab-content" />');
		description.appendTo(tabContent);
		tabContent.appendTo(this.tabContainer);

		

		var mdURL = 'tasks/' + tabFolder + '/description.md';
		$.get(mdURL).done(function (md) {
			var converter = new Markdown.Converter();
			var descrHtml = converter.makeHtml(md);
			description.html(descrHtml);
		});
		
		/* Navigation tab template
		<li>
			<a href="#{{tabHref}}">{{fileName}}</a>
		</li>
		*/
		var taskConfigURL = 'tasks/' + tabFolder + '/config.json';
		$.getJSON(taskConfigURL).done($.proxy(function (config) {
			var taskFiles = config.files || [];
			var subFolders = config.folders || [];
			var display = config.display || false;
			this.rootClass = config.rootClass || null;

			var initTaskURI = 'tasks/' + tabFolder + '/';
			this.createCodeTabs(taskFiles, initTaskURI);

			this.taskURIs = subFolders.map(function (subFolder) {
				return 'tasks/' + tabFolder + '/' + subFolder + '/';
			});

			this.allTaskFiles = [];

			$.when.apply($, this.taskURIs.map(function (taskURI) {
				return $.getJSON(taskURI + 'config.json');
			}))
			.done($.proxy(function () {
				for (var i = 0; i < arguments.length; i++) {
					var taskFiles = arguments[i][0].files || [];
					this.allTaskFiles.push(taskFiles);
					this.createCodeTabs(taskFiles, this.taskURIs[i]);
				}

				if (display) {
					this.createDisplayTab();
				}
			}, this));
		}, this));
	};

	Portfolio.prototype.createTaskNavigation = function () {
		var rootConfigURL = 'config.json';
		$.getJSON(rootConfigURL).done($.proxy(function (tasks) {		
			var listGroup =	$('<div class="list-group" />');
			this.taskList.append(listGroup);
			var taskTitles = tasks.titles;
			var taskFolders = tasks.folders;
		
			for (var i = 0; i < taskTitles.length; i++) {
				var listGroupItem = $('<a href="#" class="list-group-item" />');
				listGroupItem.text(taskTitles[i]);
				listGroup.append(listGroupItem);
				listGroupItem.data('folder', taskFolders[i]);
			}
			
			listGroup.on('click', 'a.list-group-item', $.proxy(function (event) {
				this.tabContainer.empty();
				var self = $(event.currentTarget);
				$('.list-group .list-group-item').removeClass('active');
				self.addClass('active');
				var folder = self.data('folder');
				this.createTabs(folder);
				event.preventDefault();	
			}, this));
		}, this));
	};

	Portfolio.prototype.addTabHandler = function () {
		$(doc).on('click', '.tab-container > .nav.nav-tabs a', $.proxy(function (event) {
			var self = $(event.currentTarget);
			this.destroyWidget();
			
			if (self.attr('href') === '#display-widget') {
				this.createWidget();
			}

			var fileTabContainer = $('.tab-container > .nav.nav-tabs');

			fileTabContainer.find('li').removeClass('active');
			
			self.closest('li').addClass('active');
			var currContentId = self.attr('href');

			var tabContent = $('.tab-container .tab-content');
			tabContent.find('>div').removeClass('active').removeClass('in');

			tabContent.find(currContentId).addClass('active').addClass('in');

			event.preventDefault();				
		}, this));
	};

	Portfolio.prototype.init = function () {
		this.createTaskNavigation();
		this.addTabHandler();
	};

	window.Portfolio = Portfolio;
}(document, jQuery));