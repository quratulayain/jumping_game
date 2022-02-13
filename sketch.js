var oceanImg, ocean;
var coinImg, coin, coinGroup;
var climberImg, climber, climbersGroup;
var frog, frogImg;
var gameOver, gameOverImg;
var gameState = "play"
var score = 0;
var x=0;

function preload(){
  oceanImg = loadImage("water.jpg");
  coinImg = loadImage("coin.png");
  climberImg = loadImage("seaweed.png");
  frogImg = loadImage("frog.png");
  gameOver = loadImage("gameOverImg.png")
}

function setup(){
  createCanvas(600,600);
  ocean = createSprite(300,300);
  ocean.addImage("ocean",oceanImg);
  frog = createSprite(200,200,50,50);
  frog.scale = 0.1;
  frog.addImage("frog", frogImg);
  frog.mass=50;
  //create coin group and climber group
  climbersGroup = new Group();
  coinGroup = new Group();
  }

function draw(){
  background("ocean");
  drawSprites();
  textSize(25);
  fill("red")
  text("Score:"+score,400,50);
  if (gameState === "play") {  
    
        
    if (keyDown("space"))
    {
      frog.velocityY = -3+ frog.velocityY * -0.3;
    }
    else{
     frog.velocityY +=  frog.mass*0.015 ; //gravity
    }
    if(keyDown("right") && frog.position.x<500){
      frog.position.x += 6;
      frog.setVelocity(0,0);      
    }
    if (keyDown("left") && frog.position.x>10){
      frog.position.x -=6;
      frog.setVelocity(0,0);
    }
    collideFrog();
   spawnCoin();
   collectCoin();
    
  }
  if(frog.position.y>600){
    gameState=end;
    gameOver;
  }
  if (gameState === "end"){
    //frog.addImage("frog",gameOverImg);
    frog.position.x = 270;
    frog.position.y = 200;
    frog.setVelocity(0,0);
    frog.scale=0.5;
    climbersGroup.destroyEach();
    ocean.setVelocity(0,0);
  }
}

// create the coin and climber in the same function
function spawnCoin() {   
  if (frameCount % 90 === 0) {
    //make the x position of the coin and climber the same
   x =  Math.round(random(100,200));
   climber = createSprite(x,80,200,50);
   climber.addImage("climber",climberImg);
   climber.setVelocity(0,4);
   climber.scale = 0.4;
   climber.lifetime = 130;
   climbersGroup.add(climber);
   coin = createSprite(climber.x,40,50,30);
   coin.addImage("coin",coinImg);
   coin.setVelocity(0,4);
   coin.scale = 0.1;
   coin.lifetime = 130;
   coinGroup.add(coin);
  }
}

function collectCoin(){
  if(frog.isTouching(coinGroup)){ 
    score++;
    coinGroup[0].destroy();      
  }
}

function collideFrog(){
  if(isOnSeaWeed()){
    frog.collide(climbersGroup);
   }
   else{
    setFrogVelocity();
   }
}
function isOnSeaWeed(){
  try {
    var surface= climbersGroup[0];
    var sLeft= surface.position.x;
    var sRight = sLeft+surface.width;
    return frog.position.y<surface.position.y-15 && frog.position.x.between(sLeft,sRight);
  } catch {
    return false;
  }
}

function setFrogVelocity(){
    frog.velocityY +=  frog.mass*0.015;
}
Number.prototype.between = function(a, b) {
  var min = Math.min.apply(Math, [a, b]),
    max = Math.max.apply(Math, [a, b]);
  return this > min && this < max;
};