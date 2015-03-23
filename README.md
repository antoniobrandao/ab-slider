# ab-slider

A simple slider using TranslateX transforms to get GPU-powered smooth animations, made with vanilla JavaScript. 

Touch-enabled, including swipe left and right gestures. Easy to set up and to add prev/next buttons.

Only one dependency (hammer.js - for touch input and gestures)

## Install

With [npm](http://npmjs.org) do:

```bash
$ npm install ab-slider --save-dev
```

## Usage
	
	var ab_slider = require('ab-slider');

	var new_ab_slider = new ab_slider( document.getElementById('my-gallery-slider'),
	{
		// all parameters are optional. See source for full list of available parameters.
		transitionDuration: 0.6,
		transitionDelay: 	5,
		width: 				_width,
		height: 			_height,
		autoPlay: 			true,
		button_next_el: 	document.getElementById('slider-arrow-left'),
		button_prev_el: 	document.getElementById('slider-arrow-right'),
	});

## Roadmap

Apply UMD (wanna do it yourself? Pull requests are welcome)

## License

MIT
