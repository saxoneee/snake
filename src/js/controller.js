function Controller(){
	/**
	* void registerKeyCode(eventObject e)
	*
	* Speichert die gerade gedrückten Tasten
	*/
	
		
	this.updatePlayerDirection = function(key){
		var direction = player.getDirection();
		
		if(key != null){
			var newD = Config.controls[key];
			
			if(newD == 'left' && direction != 'right' || newD == 'right' && direction != 'left' || newD == 'up' && direction != 'down' || newD == 'down' && direction != 'up'){
				direction = newD;
			}
		}
		player.setDirection(direction);
	}
	
	this.updatePlayer = function(){
		
		
		var newTop = player.getTop();
		var newLeft = player.getLeft();
		switch(player.getDirection()){
			case 'up' : 
				newTop = newTop - player.getHeight(); 
			break;
			case 'down' : 
				newTop = newTop + player.getHeight(); 
			break;
			case 'left' : 
				newLeft = newLeft - player.getWidth(); 
			break;
			case 'right' :
				newLeft = newLeft + player.getWidth(); 
			break;
		}
		player.update(newTop,newLeft);
	}
	
	this.collide = function(player,width,height){
		if(player.getDirection() == 'left' && player.getLeft() < 0){
			return true;
		}
		if(player.getDirection() == 'right' && player.getLeft()+player.getWidth() > width){
			return true;
		}
		if(player.getDirection() == 'up' && player.getTop() < 0){
			return true;
		}
		if(player.getDirection() == 'down' && player.getTop()+player.getHeight() > height){
			return true;
		}
		
		var playerPieces = player.getPieces();
		for(var i = 0; i < playerPieces.length-1; i++){
			if(player.getTop() == playerPieces[i][0] && player.getLeft() == playerPieces[i][1]){
				return true;
			}
		}
		
		return false;
	}
	
	this.hasEaten = function(){
		if(player.getTop() == food.getTop() && player.getLeft() == food.getLeft()){
			return true;
		}
		return false;
	}
	
}