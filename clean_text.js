/*
	Clean Text Formatting
	Updated: October 10, 2012

	Plugin to clean formatting from selected text

	For redactor-js (http://redactorjs.com/)

	Usage:
	plugins : ['clean_text:init']

	Copyright (c) 2012 João Sardinha
*/

if (typeof RedactorPlugins === 'undefined') var RedactorPlugins = {};

RedactorPlugins.clean_text = {

	init: function() {

		// Create button
		this.addBtn('clean_text', 'Clean selection formatting', function(redactor, event, button_key) {

			// Grab selected text
			var html = redactor.getSelectedHtml();

			// Strip out html
			html = html.replace(/(<([^>]+)>)/ig,"");

			// Set buffer (allows undo shortcut)
			redactor.setBuffer();

			// Replace selection with clean text
			redactor.insertHtml(html);
			
			// Sync code
			redactor.syncCode();
		});

		// Add separator before button
		this.addBtnSeparatorBefore('clean_text');

		// Add icon to button
		jQuery('a.redactor_btn_clean_text').css({
			backgroundImage : ' url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAQ0lEQVQYV2MMDQ39zwAEq1evZgTR6AAmzwhjYFOMLAc2BZtidDG4dcgSyNbDnITiLnTFyO4mXSFRVhPlGaKDh9gABwAJuDgDsQ44aQAAAABJRU5ErkJggg==)',
			backgroundPosition : '7px 8px'
		});
	}
}