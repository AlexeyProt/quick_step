var tabsScript = new TemplateScript('/js/modules/Tabs.js');
function EditorTabs ( editor ) {
	this.editor = editor;
	this.containerId = 'tabsContainer';
}

EditorTabs.prototype.setContainerId = function () {
	for ( var i = 0; this.editor.dom.get(this.containerId); i++ ) {
		this.containerId = 'tabsContainer' + i;
	}
};

EditorTabs.prototype.createTabs = function ( tabs ) {
	var ul = document.createElement('ul'),	  
		li = document.createElement('li'),
		div = document.createElement('div'),
		tabsContainer = document.createElement('div'),
		tabsContent = [];
	this.setContainerId();	
	tabsContainer.id = this.containerId;
	tabsContainer.className = "tabsContainer";
	ul.className = "tabs";
	for ( var i = 0; i < tabs.length; i++ ) {
		li = li.cloneNode(true);
		li.innerHTML = tabs[i].title;
		ul.appendChild(li);
		tabContent = div.cloneNode(true);
		tabContent.dataset.tab = tabs[i].title;
		tabsContent[tabsContent.length] = tabContent;
	}
	tabsContainer.appendChild(ul);
	for ( var i = 0; i < tabsContent.length; i++ ) {
		tabsContainer.appendChild(tabsContent[i]);
	}		
	return tabsContainer;	
};

EditorTabs.prototype.addTab = function () {
	var self = this;
	// Add a button that opens a window
	this.editor.addButton('addTab', {
		text: 'Добавить вкладку',
		icon: false,
		onclick: function() {
			// Open window
			self.editor.windowManager.open({
				title: 'myplugin plugin',
				body: [
					{type: 'textbox', name: 'title', label: 'Title'}
				],
				onsubmit: function(e) {
					var tab = document.createElement('li'),
						tabs = self.tabsContainer.querySelector('.tabs'),
						tabContent = document.createElement('div');
					tab.innerHTML = e.data.title;
					tabContent.dataset.tab = e.data.title;
					tabs.appendChild(tab);
					self.tabsContainer.appendChild(tabContent);
					console.log(self.tabsContainer);
				}
			});
		}
	});	
};

EditorTabs.prototype.setTabsContainer = function ( tabs ) {
	this.editor.selection.setNode( this.createTabs( tabs ) );
	this.tabsContainer = this.editor.dom.get( this.containerId );
	new Tabs( this.tabsContainer );
	this.addTab();
	this.editor.addContextToolbar('#'+this.containerId, 'addTab');
};

tinymce.PluginManager.add('myplugin', function(editor, url) {
	var editorsTabs = [];
	// Adds a menu item to the tools menu
	editor.addMenuItem('myplugin', {
		text: 'myplugin plugin',
		context: 'tools',
		onclick: function() {
			// Open window with a specific url
			editor.windowManager.open({
				title: 'myplugin plugin',
				body: [
					{type: 'textbox', name: 'title', label: 'Title'}
				],
				onsubmit: function(e) {
					editorsTabs[editorsTabs.length] = new EditorTabs(editor);
					console.log(editorsTabs);
					editorsTabs[editorsTabs.length-1].setTabsContainer( [ { title: e.data.title } ] );
					// Insert content when the window form is submitted

/* 					var tabsContainer = createTabs([ { title: e.data.title } ]);
					
					editor.selection.setNode(tabsContainer);
					var tabs = new Tabs(editor.dom.get('tabsContainer'));			 */		
				}
			});
		}
	});
});