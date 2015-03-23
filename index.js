'use strict';

//   ## ##               #### ##    ## #### ######## 
//   ## ##                ##  ###   ##  ##     ##    
// #########              ##  ####  ##  ##     ##    
//   ## ##                ##  ## ## ##  ##     ##    
// #########              ##  ##  ####  ##     ##    
//   ## ##                ##  ##   ###  ##     ##    
//   ## ##               #### ##    ## ####    ##    

function ABSlider(root_element, options)
{
	if (!(this instanceof ABSlider))
	{
		return new ABSlider(root_element, options);
	}
	
	var self 			= this;
	this.root_element 	= root_element;

	console.log('AB SLIDER');
	console.log('AB SLIDER');
	console.log('AB SLIDER');
	console.log('AB SLIDER');
	console.log('AB SLIDER');
	console.log('AB SLIDER');
	console.log('AB SLIDER');
	console.log('- - - - - ');
	console.log('- - - - - ');

	console.log('this.root_element:');
	console.dir(this.root_element);
	
	this.settings = {
		root_element 		: null,
		transition_delay 	: null,
		transition_duration	: null,
		onDeploy 			: null,
		width 				: 100,
		height 				: 100,
		classes				: [],
		properties 			: {},
	};

	this.settings = this.extend(this.settings, options);

	// console.log('this.settings:');
	// console.dir(this.settings);

	if (self.settings.onDeploy) 
	{
		self.settings.onDeploy(self);
	};

	// if (this.settings.onTap)
	// {
	// 	this.onTap(this.settings.onTap);
	// };

	$(document).keydown(function(e) 
	{
		switch(e.which)
		{
			case 37: // left
				console.log('pressed left');
			break;
			case 39: // right
				console.log('presse right');
			break;

			default: return; // exit this handler for other keys
		}

		e.preventDefault(); // prevent the default action (scroll / move caret)
	});
}



//   ## ##               ########   #######  ##     ##     ######   #######  ##    ## ######## ########   #######  ##       
//   ## ##               ##     ## ##     ## ###   ###    ##    ## ##     ## ###   ##    ##    ##     ## ##     ## ##       
// #########             ##     ## ##     ## #### ####    ##       ##     ## ####  ##    ##    ##     ## ##     ## ##       
//   ## ##               ##     ## ##     ## ## ### ##    ##       ##     ## ## ## ##    ##    ########  ##     ## ##       
// #########             ##     ## ##     ## ##     ##    ##       ##     ## ##  ####    ##    ##   ##   ##     ## ##       
//   ## ##               ##     ## ##     ## ##     ##    ##    ## ##     ## ##   ###    ##    ##    ##  ##     ## ##       
//   ## ##               ########   #######  ##     ##     ######   #######  ##    ##    ##    ##     ##  #######  ######## 


ABSlider.prototype.addToParent = function addToParent(parent)
{
	this.settings.parent = parent;
	this.settings.parent.add(this.surface_modifier).add(this.surface);
}

ABSlider.prototype.setContent = function setContent(new_content)
{
	this.surface.setContent(new_content);
}



//   ## ##                  ###     ######  ######## ####  #######  ##    ##  ######  
//   ## ##                 ## ##   ##    ##    ##     ##  ##     ## ###   ## ##    ## 
// #########              ##   ##  ##          ##     ##  ##     ## ####  ## ##       
//   ## ##               ##     ## ##          ##     ##  ##     ## ## ## ##  ######  
// #########             ######### ##          ##     ##  ##     ## ##  ####       ## 
//   ## ##               ##     ## ##    ##    ##     ##  ##     ## ##   ### ##    ## 
//   ## ##               ##     ##  ######     ##    ####  #######  ##    ##  ######  



ABSlider.prototype.hide = function hide()
{
	if (this.is_visible === true) 
	{
		this.is_visible = false;

		this.opacity_transitionable.set( 0, { curve : 'linear', duration : 300 } );
	};
}

ABSlider.prototype.show = function show()
{
	if (this.is_visible === false) 
	{
		this.is_visible = true;
		
		this.opacity_transitionable.set( 1, { curve : 'linear', duration : 300 } );
	};
}


//   ## ##                ######   ######## ######## ######## ######## ########   ######  
//   ## ##               ##    ##  ##          ##       ##    ##       ##     ## ##    ## 
// #########             ##        ##          ##       ##    ##       ##     ## ##       
//   ## ##               ##   #### ######      ##       ##    ######   ########   ######  
// #########             ##    ##  ##          ##       ##    ##       ##   ##         ## 
//   ## ##               ##    ##  ##          ##       ##    ##       ##    ##  ##    ## 
//   ## ##                ######   ########    ##       ##    ######## ##     ##  ######  




Object.defineProperty(ABSlider.prototype, 'x', {
    // get: function() { return this.transform.translate.state[0] },
    // set: function(value) { this.transform.setTranslate([value, this.transform.translate.state[1], this.transform.translate.state[2] ]) },
});



// // // INTERACTION
// // // INTERACTION
// // // INTERACTION
// // // INTERACTION
// // // INTERACTION
// // // INTERACTION
// // // INTERACTION
// // // INTERACTION
// // // INTERACTION


ABSlider.prototype.onTap = function onTap( handlerCallback ) 
{
	var self 		= this;
	self.callBack 	= handlerCallback;
};



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
