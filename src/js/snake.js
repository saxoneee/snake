(function(){Config={fps:60,player:{width:10,height:10},startPos:{top:200,left:250,direction:'right'},controls:{27:'esc',13:'enter',37:'left',39:'right',40:'down',38:'up'}}
var screenBox;var screen;var width;var height;var controller=null;var player=null;var food=null;var lastPiece=null;var keyChain=[];var points=0;var lastPoints=0;var start=false;var redraw=true;temp={};window.snake_init=function(settings){screenBox=settings.screen;width=screenBox.offsetWidth;height=screenBox.offsetHeight;controller=new Controller();screen=new Layer(width,height);screenBox.appendChild(screen.getCanvas());temp.frames=0;temp.keys={};for(key in Config.controls){temp.keys[key]=false;}
document.body.addEventListener('keydown',function(e){if(typeof temp.keys[e.which]=='undefined'){return;}
if(keyChain.length>0&&keyChain[0]==e.which){return;}
if(e.preventDefault){e.preventDefault();}
keyChain.push(e.which);},false);gameHandle();}
var gameHandle=function(){requestAnimationFrame(gameHandle);temp.frames=(temp.frames<120)?temp.frames+1:1;if(start==true){gameLoop();}else{menuLoop();}}
var menuLoop=function(){if(redraw==true){screen.clear();redraw=false;screen.addText('Zum Starten [Enter] drücken',150,200);if(lastPoints>0){screen.addText('Du hast '+lastPoints+' Punkte erreicht',150,230);}}
if(keyChain.length>0&&keyChain[0]==13){keyChain.shift();screen.clear();start=true;}}
var gameLoop=function(){if(keyChain.length>0&&keyChain[0]==27){keyChain.shift();gameReset();return;}
if(player==null){screen.clear();resetPoints();player=new Player(Config.startPos.top,Config.startPos.left,Config.player.height,Config.player.width,Config.startPos.direction);key=null;food=null;}
if(food==null){food=new Food(Config.player.width,Config.player.height,player.getPieces());screen.add(food);}
if(temp.frames%8==0){if(keyChain.length>0){controller.updatePlayerDirection(keyChain.shift());}
controller.updatePlayer();screen.remove(player.getLast());screen.add(player);if(controller.collide(player,width,height)){player=null;gameReset();return;}
if(controller.hasEaten()){addPoints();player.doChangeColor();player.addPieces(10);food=null;}}}
var gameReset=function(){start=false;redraw=true;player=null;food=null;lastPoints=points;resetPoints();}
var addPoints=function(){points=points+10;document.getElementById('punkte').value=points;}
var resetPoints=function(){points=0;document.getElementById('punkte').value=0;}
function Controller(){this.updatePlayerDirection=function(key){var direction=player.getDirection();if(key!=null){var newD=Config.controls[key];if(newD=='left'&&direction!='right'||newD=='right'&&direction!='left'||newD=='up'&&direction!='down'||newD=='down'&&direction!='up'){direction=newD;}}
player.setDirection(direction);}
this.updatePlayer=function(){var newTop=player.getTop();var newLeft=player.getLeft();switch(player.getDirection()){case'up':newTop=newTop-player.getHeight();break;case'down':newTop=newTop+player.getHeight();break;case'left':newLeft=newLeft-player.getWidth();break;case'right':newLeft=newLeft+player.getWidth();break;}
player.update(newTop,newLeft);}
this.collide=function(player,width,height){if(player.getDirection()=='left'&&player.getLeft()<0){return true;}
if(player.getDirection()=='right'&&player.getLeft()+player.getWidth()>width){return true;}
if(player.getDirection()=='up'&&player.getTop()<0){return true;}
if(player.getDirection()=='down'&&player.getTop()+player.getHeight()>height){return true;}
var playerPieces=player.getPieces();for(var i=0;i<playerPieces.length-1;i++){if(player.getTop()==playerPieces[i][0]&&player.getLeft()==playerPieces[i][1]){return true;}}
return false;}
this.hasEaten=function(){if(player.getTop()==food.getTop()&&player.getLeft()==food.getLeft()){return true;}
return false;}}
function Food(pWidth,pHeight,pPieces){var top=null;var left=null;var img=document.createElement('canvas');img.width=pWidth;img.height=pHeight;var context=img.getContext('2d');context.fillStyle='#98aa22';context.fillRect(0,0,width,height);var sPieces=pPieces.join('|');do{var tempTop=Math.floor(Math.random()*(height-10));tempTop=tempTop-tempTop%10;var tempLeft=Math.floor(Math.random()*(width-10));tempLeft=tempLeft-tempLeft%10;var regex=new RegExp(tempTop+','+tempLeft);}while(sPieces.match(regex));top=tempTop;left=tempLeft;this.getImage=function(){return img;}
this.getTop=function(){return top;}
this.getLeft=function(){return left;}}
function Layer(width,height){var canvas=document.createElement('canvas');canvas.width=width;canvas.height=height;var context=canvas.getContext('2d');this.clear=function(){context.clearRect(0,0,canvas.width,canvas.height);}
this.remove=function(obj){context.clearRect(obj.left,obj.top,obj.width,obj.height);}
this.add=function(obj){context.drawImage(obj.getImage(),obj.getLeft(),obj.getTop());}
this.addImg=function(img,coords){context.drawImage(img,coords.left,coords.top);}
this.addText=function(text,top,left){context.fillStyle='#fff';context.font="12pt Arial";context.textBaseline="top";context.fillText(text,top,left);}
this.replace=function(obj){this.remove(obj);context.drawImage(obj.getImage(),obj.getLeft(),obj.getTop());}
this.addBuffer=function(obj){context.drawImage(obj,0,0);}
this.getCanvas=function(){return canvas;}}
function Player(pTop,pLeft,pHeight,pWidth,pDirection){var pieces=10;var positions=[[pTop,pLeft]];var count=0;var direction=pDirection;var width=pWidth;var height=pHeight;var changeColor=true;var colorSteps=17;var colorR=255;var colorG=0;var colorB=0;var img=document.createElement('canvas');img.width=width;img.height=height;var context=img.getContext('2d');this.getImage=function(){if(changeColor==true){changeColor=false;if(colorR==255&&colorB==0&&colorG<255){colorG=colorG+colorSteps;}
if(colorG==255&&colorB==0&&colorR>0){colorR=colorR-colorSteps;}
if(colorG==255&&colorR==0&&colorB<255){colorB=colorB+colorSteps;}
if(colorR==0&&colorB==255&&colorG>0){colorG=colorG-colorSteps;}
if(colorB==255&&colorG==0&&colorR<255){colorR=colorR+colorSteps;}
if(colorG==0&&colorR==255&&colorB>0){colorB=colorB-colorSteps;}
context.clearRect(0,0,width,height);context.fillStyle='rgba('+colorR+','+colorG+','+colorB+',0.7)';context.fillRect(0,0,width,height);}
return img;}
this.getLast=function(){return{'left':positions[0][1],'width':width,'top':positions[0][0],'height':height};}
this.getTop=function(){return positions[positions.length-1][0];}
this.getLeft=function(){return positions[positions.length-1][1];}
this.getWidth=function(){return width;}
this.getHeight=function(){return height;}
this.getDirection=function(){return direction;}
this.setDirection=function(pDirection){direction=pDirection;}
this.doChangeColor=function(){changeColor=true;}
this.addPieces=function(times){for(var i=0;i<times;i++){var newPos=[positions[0][0],positions[0][1]];positions.reverse();positions.push(newPos);positions.reverse();}}
this.getPieces=function(){return positions;}
this.update=function(pTop,pLeft){if(positions.length>=pieces){positions.shift();}
positions.push([pTop,pLeft]);}}})();