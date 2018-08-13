// -- NEEDED TO REFRESH VIA WEBPACK
if (module.hot){ module.hot.accept() }

function main(){
	import ('./global/transitions');
}

// https://philipwalton.com/articles/loading-polyfills-only-when-needed/
//
function browserSupportsAllFeatures() {
	return window.Promise 
		&& window.fetch 
		&& window.Symbol;
}

if (browserSupportsAllFeatures()) {
	main();
} else {
	loadjs('https://cdn.polyfill.io/v2/polyfill.min.js?features=Promise,fetch,Symbol', {
		success: main
	});
}
