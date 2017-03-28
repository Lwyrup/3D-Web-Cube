window.addEventListener("load", function(){

	WEEKDAYS = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
	MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

	function Box(element){

		// Box properties.
		this.faces = element.children;
		this.style = element.style;
		this.zoomZ = 0;
		this.rotationX = 0;
		this.rotationY = 0;
		this.mode = new Mode(49);

		// Zooms (actually transZ) the box on the page.
		//
		// deltaZoom - Integer can be positive or negitive.
		this.zoom = function(deltaZoom){
			this.zoomZ += deltaZoom;
			this.update();
		};

		// Rotates the box.
		//
		// axis  - String of the axis to rotate on.
		// value - Integer representing degrees.
		this.rotate = function(valueX, valueY){
			this.rotationX = valueX;
			this.rotationY = valueY;
			this.update();
		};

		// Changes the mode of the box.
		//
		// newMode - Integer corresponding with a mode.
		this.setMode = function(newMode){
			this.mode = newMode;

		};

		// Resets all properties of the box.
		this.resetZoom = function(){
			this.zoomZ = 0;
			this.update();
		};

		// Private

		// Updates the the literal box with the new properties.
		this.update = function(){
			this.style.transform = this.packageQualities();
		};

		// Assembles all the properties into a single string.
		this.packageQualities = function(){
			return this.zoomStyle() + this.rotateXStyle() + this.rotateYStyle();
		};

		// Pairs the value of zoomZ with its css rule.
		this.zoomStyle = function(){
			return " translateZ(" + this.zoomZ + "px) ";
		};

		// Pairs the value with its css rule in a string.
		this.rotateXStyle = function(){
			return " rotateX(" + this.rotationX + "deg) ";
		};

		// Pairs the value with its css rule.
		this.rotateYStyle = function(){
			return " rotateY(" + this.rotationY + "deg) ";
		};
	};



	function Mode(num){

		this.key = num;

		// Changes the key to the new assigned mode.
		//
		// modeNew - Integer of representing the new mode.
		this.changeMode = function(modeNew){
			this.key = modeNew;
			this.update();
		};

		// Determines what mode to use based on the key.
		this.update = function(){
			switch (this.key){
				case 49:
					this.default();
					break;
				case 50:
					this.solid();
					break;
				case 51:
					this.nothing();
					break;
				case 52:
					this.minecraft();
					break;
				case 53:
					this.rainbow();
					break;
				case 54:
					this.clock();
					break;
				case 55:
					this.house();
					break;
			};
		};

		// Clears all stylings affected.
		this.clearAll = function(){
			var noColors = ["transparent", "transparent", "transparent", "transparent", "transparent", "transparent"];
			var noText = ["", "", "", "", "", ""];
			if ("rainbowToggle" in window){
				clearInterval(rainbowToggle);
			};
			if ("timer" in window){
				clearInterval(timer);
			};
			this.changeText(noText);
			this.changeColor(noColors);
			this.background("");
			this.border("");
		};



		// Sets the box properties to the default.
		this.default = function(){
			this.clearAll();
			var defaultText = ["Front", "Back", "Left", "Right", "Top", "Bottom"];
			var defaultColors = [
				"rgba(255, 255,   0, 0.5)",
				"rgba(  0, 128,   0, 0.5)",
				"rgba(255,   0,   0, 0.5)",
				"rgba(  0,   0, 255, 0.5)",
				"rgba(255, 192, 203, 0.5)",
				"rgba(128,   0, 128, 0.5)"
			];
			this.changeText(defaultText);
			this.changeColor(defaultColors);
			this.border("2px solid black");
		};



		// Colors the box in solid color.
		this.solid = function(){
			this.default();
			var solidColors = [
				"rgb(255, 255,   0)",
				"rgb(  0, 128,   0)",
				"rgb(255,   0,   0)",
				"rgb(  0,   0, 255)",
				"rgb(255, 192, 203)",
				"rgb(128,   0, 128)"
			];
			this.changeColor(solidColors);
		};



		// Removes colors and text from box.
		this.nothing = function(){
			this.clearAll();
			var noColors = ["transparent", "transparent", "transparent", "transparent", "transparent", "transparent"];
			var noText = ["", "", "", "", "", ""];
			this.changeText(noText);
			this.changeColor(noColors);
			this.border("10px solid black");
		};



		// Make the cube a minecraft block.
		this.minecraft = function(){
			this.clearAll();
			this.background("url(images/mcwood.png)");
		};


		// Makes the cube cycle between colors.
		this.rainbow = function(){
			this.default();
			rainbowToggle = setInterval( function(){
				for (var i = 0; i < box.faces.length; i++){
					randomColor = "rgba(" + Math.ceil(Math.random()*250) + "," + Math.ceil(Math.random()*250) + "," + Math.ceil(Math.random()*250) + ",0.8)";
					box.faces[i].style.backgroundColor = randomColor;
				};
			},
			900);
		};


		// Turns cube into clock.
		this.clock = function(){
			this.clearAll();
			bg = ["black","black","black","black","black",""];
			this.changeColor(bg);
			timer = setInterval( function(){
				text = box.mode.createCounter();
				box.mode.changeText(text);
			},10);
			this.border("2px solid white")
		};

		// privatey methods

		// Creates an array of current time properties.
		this.createCounter = function(){
			date = new Date();
			day = WEEKDAYS[date.getDay()];
			month = MONTHS[date.getMonth()];
			dayN = date.getDate();
			time = date.toLocaleTimeString().replace(/..$/, "");
			year = date.getFullYear();
			return [day, month, dayN, time, year, ""];
		};

		// Changes box faces colors one by one.
		//
		// arrayOfColors - Array with valid css color values.
		this.changeColor = function(arrayOfColors){
			for (var i = 0; i < arrayOfColors.length; i++){
				box.faces[i].style.backgroundColor = arrayOfColors[i];
			};
		};

		// Changes box faces texts.
		//
		// arrayOfText - Array of Strings.
		this.changeText = function(arrayOfText){
			for(var i = 0; i < arrayOfText.length; i++){
				box.faces[i].textContent = arrayOfText[i];
			};
		};

		// Checks to see if the view is inside the box.
		this.checkView = function(){
			if (this.key == 55 && box.zoomZ > 899){
				console.log("inside the home");
			}
		};

		// Changes the faces borders.
		//
		// borderStyle - String of css border rule.
		this.border = function(borderStyle){
			for(var i = 0; i < box.faces.length; i++){
				box.faces[i].style.border = borderStyle;
			};
		};

		this.background = function(bgStyle){
			for(var i = 0; i < box.faces.length; i++){
				box.faces[i].style.background = bgStyle;
			};
		};

	};



	box = new Box(document.getElementsByClassName('box')[0]);
	box.mode.update();

	var stage = document.getElementsByClassName('stage')[0];
	stage.addEventListener("mousedown", giveUserControl );

	// Givers the user controls to modify the cube and thier view.
	//
	// e - Event of mouse down on stage.
	function giveUserControl(e){
		stage.addEventListener("mousemove", rotateCube);
		document.addEventListener("keydown", determineAction);
	};

	// Rotates the cube using the box class.
	//
	// e - event of mouse moving on the stage.
	function rotateCube(e){
		var x = e.pageX - this.offsetLeft + 1 - 400;
		var y = e.pageY - this.offsetTop + 1 - 250;

		var xDeg = y/-2.777777777;
		var yDeg = x/1.11111111;

		box.rotate(xDeg, yDeg);
	};	

	// Determines what to do based on the key pressed.
	//
	// e - Event of any keydown.
	function determineAction(e){
		switch (e.which){
			// - key
			case 189:
				box.zoom(-30);
				box.mode.checkView();
				break;
			// + key
			case 187:
				box.zoom(30);
				box.mode.checkView();
				break;
			// 0 key
			case 48:
				box.resetZoom();
				break;
			// Any other key
			default:
				box.mode.changeMode(e.which);
				console.log("mode = " +  box.mode.key);
		};
	};
});