var screenBox;
var screen;
var width;
var height;

var controller = null;
var player = null;
var food = null;
var lastPiece = null;

var keyChain = [];
var points = 0;
var lastPoints = 0;

var start = false;
var redraw = true;

temp = {};

window.snake_init = function(settings){
	// Spielfläche erfassen
	screenBox = settings.screen;
	width = screenBox.offsetWidth;
	height = screenBox.offsetHeight;
	
	controller = new Controller();
	
	screen = new Layer(width,height);
	screenBox.appendChild(screen.getCanvas());
	
	temp.frames = 0; 
	
	// Tastenüberwachung
	temp.keys = {};
	for(key in Config.controls){
		temp.keys[key] = false;
	}

	document.body.addEventListener('keydown',function(e){ 
		if(typeof temp.keys[e.which] == 'undefined'){
			return;
		}
		if (e.preventDefault) {
			e.preventDefault();
		}
		
		keyChain.push(e.which);
	},false);

	gameHandle();
}
/**
 * void start()
 * 
 * die Schleife
 */
var gameHandle = function(){
	requestAnimationFrame(gameHandle);
	temp.frames = (temp.frames < 120) ? temp.frames+1 : 1;
	
	if(start == true){
		gameLoop();
	}else{
		menuLoop();
	}
}

var menuLoop = function(){
	if(redraw == true){
		screen.clear();
		redraw = false;
		screen.addText('Zum Starten [Enter] drücken',150,200);
		if(lastPoints > 0){
			screen.addText('Du hast ' + lastPoints + ' Punkte erreicht',150,230);
		}
	}
	if(keyChain.length > 0 && keyChain[0] == 13){
		keyChain.shift();
		screen.clear();
		start = true;
	}
}

/**
 * void gameLoop()
 * 
 * Spielausführung
 */
var gameLoop = function(){
	
	if(keyChain.length > 0 && keyChain[0] == 27){
		keyChain.shift();
		gameReset();
		return;
	}
	// Neustart
	if(player == null){
		screen.clear();
		resetPoints();
		player = new Player(Config.startPos.top,Config.startPos.left,Config.player.height,Config.player.width,Config.startPos.direction);
		key = null;
		food = null;
	}
	
	if(food == null){
		food = new Food(Config.player.width,Config.player.height,player.getPieces());
		screen.add(food);
	}
	
	
	// Schlange
	if(temp.frames%8 == 0){
		if(keyChain.length > 0){
			controller.updatePlayerDirection(keyChain.shift());
		}
		controller.updatePlayer();
		screen.remove(player.getLast());
		screen.add(player);
		
		if(controller.collide(player,width,height)){
			player = null;
			gameReset();
			return;
		}
		
		if(controller.hasEaten()){
			addPoints();
			player.doChangeColor();
			player.addPieces(10);
			food = null;
		}
	}
}

var gameReset = function(){
	start = false;
	redraw = true;
	player = null;
	food = null;
	lastPoints = points;
	resetPoints();
}

var addPoints = function(){
	points = points + 10;
	document.getElementById('punkte').value=points;
}
 var resetPoints = function(){
	points = 0;
	document.getElementById('punkte').value=0;
}
