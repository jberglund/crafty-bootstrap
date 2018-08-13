//if (document.documentElement.className.indexOf( "fonts-loaded" ) < 0 ) {

var html = document.documentElement;

if (sessionStorage.fontLoaded) {
	html.className += " fonts-loaded";
} else {
	var Font = new FontFaceObserver("Europa");

	Promise.all([
		Font.load(),
	]).then(function() {
		html.className += " fonts-loaded";
		sessionStorage.fontLoaded = true;
		//Cookie.set('fonts-loaded', 1, { expires: '7D', secure: true });
	});
} 
