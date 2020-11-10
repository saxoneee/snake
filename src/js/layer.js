function Layer(width,height){
	var canvas = document.createElement('canvas');
		canvas.width = width;
		canvas.height = height;
	var context = canvas.getContext('2d');
	
	this.clear = function(){
		context.clearRect(0,0,canvas.width,canvas.height);
	}
	
	this.remove = function(obj){
		context.clearRect(obj.left,obj.top,obj.width,obj.height);
	}
	
	this.add = function(obj){
		context.drawImage(obj.getImage(),obj.getLeft(),obj.getTop());
	}
	
	this.addImg = function(img,coords){
		context.drawImage(img,coords.left,coords.top);
	}
	
	this.addText = function(text,top,left){
		context.fillStyle = '#fff';
		context.font = "12pt Arial";
		context.textBaseline = "top";
		context.fillText(text,top,left);
	}
	
	this.replace = function(obj){
		this.remove(obj);
		context.drawImage(obj.getImage(),obj.getLeft(),obj.getTop());
	}
	this.addBuffer = function(obj){
		context.drawImage(obj,0,0);
	}
	
	this.getCanvas = function(){
		return canvas;
	}
}