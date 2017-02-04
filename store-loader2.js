/**************************************************************************************

Loader file (JO1)

***************************************************************************************/

//----------------------------------- LOADER VALUES -----------------------------------

if (!window.location.origin) {	//For Iexplorer compatibility
	window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
}
storedomain = window.location.origin + '/';
actual_page = location.href;

//----------------------------------- LOADER FUNCTIONS -----------------------------------

//Show the value if it is enabled
function show_if_enabled(data) {
	if (data.toLowerCase() === 'false' || data.toLowerCase() === 'no' || typeof(data) === 'undefined' || typeof(data) === null || data === false || data === 0 || data === '0' || data === '-' || data.replace(/ /g,'') === '' || data.replace(/ /g,'') === ' ') { return false }
	else { return data }
}
//Show the value if it is enabled

// File loader
function include_js_ajax(path_file) {
	if (show_if_enabled(path_file) !== false) { $.ajax({ type: 'get', url: path_file, async: false, cache: false }); }
}
function include_js_label(path_file) {
	if (show_if_enabled(path_file) !== false) { document.write('<script src="' + path_file + '" type="text/javascript"/><\/script>'); } 
}
function include_css(path_file) {
	if (show_if_enabled(path_file) !== false) { document.write('<link href="' + path_file + '" rel="stylesheet" type="text/css"></link>') }
}
// File loader

// Get the Blogger page type
function get_pagetype() {
	if (storedomain.replace(/\//g,'') == actual_page.replace(/\//g,'')) { return 'homepage'; }
	else if (actual_page.length !== actual_page.split(storedomain + '?').pop().length){ return 'homepage'; }
	else if (actual_page.length !== actual_page.split(storedomain + '#').pop().length){ return 'homepage'; }
	else if (actual_page.match(storedomain + 'p/')){ return 'static page'; }
	else if (actual_page.match(storedomain + 'search')){ return 'index'; }
	else { return 'item'; }
}
// Get the Blogger pagetype

//----------------------------------- LOADING FILES -----------------------------------

//System values
$.ajax({
    type: 'get',
    url: 'https://spreadsheets.google.com/feeds/list/' + databaseID + '/3/public/values?alt=json',
    dataType: 'json',
    async: false,
    success: function(data) {
		customerID = data.feed.entry[0].gsx$importantforthesystem.$t;
		core_file_paths = data.feed.entry[1].gsx$importantforthesystem.$t;
		core_folder_paths = data.feed.entry[2].gsx$importantforthesystem.$t;
		templateID = data.feed.entry[3].gsx$importantforthesystem.$t.split('Template ').pop().toLowerCase();
		basic_settings_db_path = data.feed.entry[4].gsx$importantforthesystem.$t;
		language_db_path = data.feed.entry[5].gsx$importantforthesystem.$t;
	},
	error: function() {	alert('Database error'); }
});

//General files
include_css('https://ivorybrand.github.io/ivorybrand-website/general/general-style-' + templateID +'.css');
include_css('//fonts.googleapis.com/css?family=Droid+Serif:400,700|Oswald:700,400');
include_js_label('https://ivorybrand.github.io/ivorybrand-website/general/init.js');

//Index and homepage files
if (get_pagetype() === 'index' || get_pagetype() === 'homepage') {
	include_css('https://ivorybrand.github.io/ivorybrand-website/index/index-style-' + templateID +'.css');
}

//Static page files
if (get_pagetype() === 'static page') {
	include_css('https://ivorybrand.github.io/ivorybrand-website/static-page/static-page-style-' + templateID +'.css');
}

//Item files
if (get_pagetype() === 'item') {
	include_css('https://ivorybrand.github.io/ivorybrand-website/item/item-style-' + templateID +'.css');
}
