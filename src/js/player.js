function Player(pTop, pLeft, pHeight, pWidth, pDirection) {
	var pieces = 10;
	var positions = [
		[pTop, pLeft]
	];
	var count = 0;
	var direction = pDirection;
	var width = pWidth;
	var height = pHeight;
	var changeColor = true;
	var colorSteps = 10;
	var colorR = 255;
	var colorG = 0;
	var colorB = 0;

	var img = document.createElement('canvas');
	img.width = width;
	img.height = height;
	var context = img.getContext('2d');

	this.getImage = function() {
		if (changeColor == true) {
			changeColor = false;
			if (colorR == 255 && colorB == 0 && colorG < 255) {
				colorG = colorG + colorSteps;
			}
			if (colorG == 255 && colorB == 0 && colorR > 0) {
				colorR = colorR - colorSteps;
			}
			if (colorG == 255 && colorR == 0 && colorB < 255) {
				colorB = colorB + colorSteps;
			}
			if (colorR == 0 && colorB == 255 && colorG > 0) {
				colorG = colorG - colorSteps;
			}
			if (colorB == 255 && colorG == 0 && colorR < 255) {
				colorR = colorR + colorSteps;
			}
			if (colorG == 0 && colorR == 255 && colorB > 0) {
				colorB = colorB - colorSteps;
			}
			context.clearRect(0, 0, width, height);

			context.fillStyle = 'rgba(' + colorR + ',' + colorG + ',' + colorB + ',0.7)';
			context.fillRect(0, 0, width, height);
		}
		return img;
	}

	this.getLast = function() {
		return {
			'left': positions[0][1],
			'width': width,
			'top': positions[0][0],
			'height': height
		};
	}

	this.getTop = function() {
		return positions[positions.length - 1][0];
	}
	this.getLeft = function() {
		return positions[positions.length - 1][1];
	}
	this.getWidth = function() {
		return width;
	}
	this.getHeight = function() {
		return height;
	}
	this.getDirection = function() {
		return direction;
	}
	this.setDirection = function(pDirection) {
		direction = pDirection;
	}
	this.doChangeColor = function() {
		changeColor = true;
	}
	this.addPieces = function(times) {
		for (var i = 0; i < times; i++) {

			var newPos = [positions[0][0], positions[0][1]];
			positions.reverse();
			positions.push(newPos);
			positions.reverse();
		}
	}
	this.getPieces = function() {
		return positions;
	}

	this.update = function(pTop, pLeft) {
		if (positions.length >= pieces) {
			positions.shift();
		}
		positions.push([pTop, pLeft]);
	}
}