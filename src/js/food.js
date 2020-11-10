function Food(pWidth,pHeight,pPieces){
	var top = null;
	var left = null;
	var img = document.createElement('canvas');
			img.width = pWidth;
			img.height = pHeight;
	
	var context = img.getContext('2d');
			context.fillStyle = '#98aa22';
			context.fillRect(0,0,width,height);
	
	var sPieces = pPieces.join('|');
	do{
		var tempTop = Math.floor(Math.random() * (height-10));
			tempTop = tempTop - tempTop%10;
		var tempLeft = Math.floor(Math.random() * (width-10));
			tempLeft = tempLeft - tempLeft%10;
		var regex = new RegExp(tempTop + ',' + tempLeft);
	}while(sPieces.match(regex));
	
	top = tempTop;
	left = tempLeft;

	// Methoden
	this.getImage = function(){
		return img;
	}
	this.getTop = function(){
		return top;
	}
	this.getLeft = function(){
		return left;
	}
}