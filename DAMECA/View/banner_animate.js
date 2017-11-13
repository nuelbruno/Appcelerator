var banneranimate = function(App) {
	
	var loaderImage = Ti.UI.createImageView({
		width:'100%',
		height:GetHeight(81),
		bottom:GetHeight(3),
		//image:Ti.Filesystem.resourcesDirectory+'images/Banners/Banner1.png'
	});

	// add it to your window
	//win.add(loaderImage);

	// set the length of the images you have in your sequence
	var loaderArrayLength = 2;

	// initialize the index to 1
	var loaderIndex = 1;

	// this function will be called by the setInterval
	function loadingAnimation() {
		// set the image property of the imageview by constructing the path with the loaderIndex variable
		loaderImage.image = Ti.Filesystem.resourcesDirectory+'images/Banners/Banner'+loaderIndex+'.png';
		//increment the index so that next time it loads the next image in the sequence
		loaderIndex++;
		// if you have reached the end of the sequence, reset it to 1
		if (loaderIndex === 3)
			loaderIndex = 1;
	}

	// start the setInverval -- adjust the time to make a smooth animation
	var loaderAnimate = setInterval(loadingAnimation, 1700);

	return loaderImage;
};

module.exports = banneranimate; 