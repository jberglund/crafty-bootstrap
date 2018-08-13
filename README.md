# The Crafty Scaffold

## CSS Features:
* Critical CSS extraction
* Preloading CSS. 

## JS Features
* Async modules via dynamic import with Webpack
* Hot module replacement, no need for full refresh of the page.
* Service worker for caching
* ES6 -> ES5. Transpiling or whatever it's called.
 
## Fonts
* Solid fontloading technique. FOUT should only occur on first load.
* Preloading woff2 optional.

## Craft niceness
* Srcset macro. It's extendable and makes use of Craft 3's newly added focal point.
*	Clean template structure (depending who you ask) 

Nice to have: 
* WebP-support

Things to note:
* Webpack wont build JS-files unless you run the production task. When dev mode is running files are being stored in memory.

This is needed in the servers nginx config:
```
	# Performance additions
  # enabled to check for cookies
  ssi on; 

  # Added this to have revision numbers ignored and point to regular css file.
  location ~* (.+)\.(?:\d+)\.(js|css|png|jpg|jpeg|gif)$ {
    try_files $uri $1.$2;
  }
```

or you could use Craft to look for them cookies. Choice is yours.
