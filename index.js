'use strict';

var hammerjs = require('hammerjs');

function ABSlider(root_element, options)
{
	if (!(this instanceof ABSlider))
	{
		return new ABSlider(root_element, options);
	}
	
	var self 			= this;
	this.root_element 	= root_element;
	this.ss_elements 	= [];
	this.ss_position 	= 0;
	this.skip_slides 	= 0;

	console.log('- - - - - - -');
	console.log('- ab-slider -');
	console.log('- - - - - - -');
	
	this.settings = {
		transitionDelay 	: 5,
		transitionDuration	: 0.5,
		onDeploy 			: null,
		width 				: 100,
		height 				: 100,
		autoPlay			: true,
		size_ratio			: 1.618,
		button_next_el		: null,
		button_prev_el		: null,
		// ease 			: defaultEase,
		// onChange 			: null,
		classes				: [],
		properties 			: {},
	};

	this.settings = this.extend(this.settings, options);

	console.log('this.settings.width: ' + this.settings.width);

	this.root_element.style.overflow = 'hidden';
	this.root_element.style.position = 'relative';

	this.position_center 	= 'translate(0px, 0px)';
	this.position_off_right = 'translate(' + String(this.settings.width) + 'px, 0px)';
	this.position_off_left  = 'translate(' + String(-this.settings.width) + 'px, 0px)';

	for (var i = 0; i < this.root_element.childNodes.length; i++)
	{
		var current_element 					= this.root_element.childNodes[i];

		var new_ss_element 		= {};
		new_ss_element.index 	= i;
		new_ss_element.element 	= current_element;

		this.ss_elements.push(new_ss_element);

		current_element.style.position 			= 'absolute';
		current_element.style.top 				= '0px';

		current_element.style.width  			= this.settings.width;
		current_element.style.height  			= this.settings.height;

		current_element.style.webkitTransition 	= 'none';
		current_element.style.mozTransition 	= 'none';
		current_element.style.msTransition 		= 'none';
		current_element.style.oTransition 		= 'none';

		current_element.style.transform  		= 'translate(' + String(i * this.settings.width) + 'px, 0px)'
		
		var da = current_element;
		var td = self.settings.transitionDuration;
	};

	setTimeout(function()
	{
		for (var i = 0; i < self.root_element.childNodes.length; i++)
		{
			var current_element 		= self.root_element.childNodes[i];
			
			var da = current_element;
			var td = self.settings.transitionDuration;

			da.style.webkitTransition 	= 'all ' + td + 's';
			da.style.mozTransition 		= 'all ' + td + 's';
			da.style.msTransition 		= 'all ' + td + 's';
			da.style.oTransition 		= 'all ' + td + 's';
		};
	}, 50);

	if (this.settings.button_next_el !== null) 
	{
		var next_tap = new hammerjs(this.settings.button_next_el);

		next_tap.on("tap", function(e)
		{
			self.invokeSlide('right');
		});
	};

	var pan_control = new hammerjs(this.root_element);

	pan_control.on("panright", function(e)
	{
		self.invokeSlide('left');
	});

	pan_control.on("panleft", function(e) 
	{
		self.invokeSlide('right');
	});

	if (this.settings.button_prev_el !== null)
	{
		var prev_tap = new hammerjs(this.settings.button_prev_el);

		prev_tap.on("tap", function(e)
		{
			self.invokeSlide('left');
		});
	};

	// console.log('this.settings:');
	// console.dir(this.settings);

	if (self.settings.onDeploy) 
	{
		self.settings.onDeploy(self);
	};

	window.addEventListener('keydown', function(e) 
	{
		switch(e.which)
		{
			case 37: // left
				self.invokeSlide('left');
			break;
			case 39: // right
				self.invokeSlide('right');
			break;

			default: return; // exit this handler for other keys
		}

		e.preventDefault(); // prevent the default action (scroll / move caret)
	});

	if (this.root_element.childNodes.length > 0)
	{
		if (this.settings.autoPlay)
		{
			// setup looping
			setInterval(function()
			{
				if (self.skip_slides === 0)
				{
					self.processNext('left');
				}
				else
				{
					self.skip_slides--;
				}

			}, self.settings.transitionDelay * 1000);
		};
	};


	window.addEventListener('resize', function()
	{
		var _width  = self.root_element.clientWidth;
		var _height = self.root_element.clientWidth / self.settings.size_ratio;
		
		self.settings.width  = _width;
		self.settings.height = _height;

		for (var i = 0; i < self.root_element.childNodes.length; i++)
		{
			current_element.style.width   = self.settings.width;
			current_element.style.height  = self.settings.height;
		};
	});
}


ABSlider.prototype.invokeSlide = function invokeSlide(direction)
{
	this.skip_slides = this.skip_slides + 2;
	if (this.skip_slides > 3) {
		this.skip_slides = 3;
	};
	this.processNext(direction);
}


ABSlider.prototype.processNext = function processNext(direction)
{
	var self = this;
	
	if (direction === 'left') 
	{
		if (this.ss_position < this.ss_elements.length-1) {
			this.ss_position++;
		}
		else
		{
			this.ss_position = 0;
		}
	}
	else
	{
		if (this.ss_position > 0) {
			this.ss_position--;
		}
		else
		{
			this.ss_position = this.ss_elements.length-1;
		}
	}

	for (var i = this.ss_elements.length - 1; i >= 0; i--)
	{
		var current_ss_element = this.ss_elements[i];

		if (current_ss_element.index === this.ss_position) 
		{
			current_ss_element.element.style.webkitTransition 	= 'none';
			current_ss_element.element.style.mozTransition 		= 'none';
			current_ss_element.element.style.msTransition 		= 'none';
			current_ss_element.element.style.oTransition 		= 'none';
			current_ss_element.element.style.zIndex = 2;
	
			if (direction === 'left') 
			{
				current_ss_element.element.style.transform = this.position_off_right;
			}

			if (direction === 'right')
			{
				current_ss_element.element.style.transform = this.position_off_left;
			}
			
			var da = current_ss_element.element;
			var td = self.settings.transitionDuration;
			
			setTimeout(function()
			{
				da.style.webkitTransition 	= 'all ' + td + 's';
				da.style.mozTransition 		= 'all ' + td + 's';
				da.style.msTransition 		= 'all ' + td + 's';
				da.style.oTransition 		= 'all ' + td + 's';
				da.style.transform 			= self.position_center;
			}, 10);
		}

		if (current_ss_element.element.style.transform === this.position_center)
		{
			current_ss_element.element.style.zIndex = 1;

			if (direction === 'left') 
			{
				current_ss_element.element.style.transform = this.position_off_left;
			}
			if (direction === 'right')
			{
				current_ss_element.element.style.transform = this.position_off_right;
			}	
		}		
	};
}



//   ## ##                ######  ##    ##  ######  
//   ## ##               ##    ##  ##  ##  ##    ## 
// #########             ##         ####   ##       
//   ## ##                ######     ##     ######  
// #########                   ##    ##          ## 
//   ## ##               ##    ##    ##    ##    ## 
//   ## ##                ######     ##     ######  



ABSlider.prototype.extend = function extend( defaults, options ) 
{
	var extended = {};
	var prop;

	for (prop in defaults) 
	{
		if (Object.prototype.hasOwnProperty.call(defaults, prop)) {
			extended[prop] = defaults[prop];
		}
	}

	for (prop in options) 
	{
		if (Object.prototype.hasOwnProperty.call(options, prop)) 
		{
			extended[prop] = options[prop];
		}
	}
	return extended;
};

module.exports = ABSlider;
