var lifeguard , birdy , cloud , sea; 
var lifeguardImage , seaImage;
var invisibleGround;
var bluebird , greenbird , purplebird;
var gameState = "play";
var gameover , gameoverImage;
var distance = 0;

function preload(){
  lifeguardImage = loadImage("images/lifeguard.png");
  seaImage = loadImage("images/sea.jpg");
  sharkImage = loadImage("images/shark.png");
  cloudsImage = loadImage("images/clouds.png");
  bluebird = loadImage("images/bluebird.png");
  greenbird = loadImage("images/greenbird.png");
  purplebird = loadImage("images/purplebird.png");
  gameoverImage = loadImage("images/gamerover.png");
}

function setup() {
  var canvas =  createCanvas(1500,700);

  birdsGroup = createGroup();
  sharksGroup = createGroup();

  lifeguard = createSprite(275 , 400);
  lifeguard.addImage("lifeguardImage" , lifeguardImage);
  lifeguard.scale = 0.9;

  invisbleGround = createSprite(700,550,1500,20);
  invisbleGround.visible = false;
}

function draw() {

  if(gameState === "play"){
    background("white");
    image(seaImage ,-700,500, 16000000 , 400);

    lifeguard.velocityY = lifeguard.velocityY + 0.8;

    lifeguard.collide(invisbleGround)

    lifeguard.setCollider("rectangle" , 0 , 0 , 400 , 220);
    //lifeguard.debug = true;



    spawnShark();
    spawnClouds();
    spawnBirds();

    if(keyDown("space") && (lifeguard.y > 440)){
      lifeguard.velocityY = -15;

    } 
  
    if(keyDown("right_arrow")){
      lifeguard.x = lifeguard.x+20;
      distance += 10;
    }
  
    if(keyDown("left_arrow")){
      lifeguard.x = lifeguard.x-20;
      distance -= 10;
    }
  
    invisbleGround.x = lifeguard.x;
  
    camera.position.x = lifeguard.x;

    if(lifeguard.isTouching(birdsGroup) || lifeguard.isTouching(sharksGroup)){
      gameState = "end";
    }

    drawSprites();
  }
  else if(gameState === "end"){
    background(gameoverImage);
    lifeguard.velocityY = 0;
    sharksGroup.setVelocityXEach(0);
    sharksGroup.setLifetimeEach(-1);
    birdsGroup.setVelocityXEach(0);
    birdsGroup.setLifetimeEach(-1);
   }

   textSize(25);
   fill("black");
   text("Distance: "+distance +" millilitres" , camera.position.x-700 , 50);  

   console.log(lifeguard.y);
  

  
}

function spawnShark(){
  if(frameCount%150 === 0){
    var shark = createSprite(1600 + lifeguard.x, 520);
    shark.setCollider("rectangle" , 0 , 0 , 150 , 150);
    //.debug = true;

    shark.addImage(sharkImage);
    shark.velocityX = -10;
    shark.scale = random(0.3 , 0.7);
    shark.lifetime = 260;
    sharksGroup.add(shark);
  }
}

function spawnClouds(){
  if(frameCount%40 === 0){
    var clouds = createSprite(1600 + lifeguard.x , 75);
    clouds.addImage(cloudsImage);
    clouds.velocityX = -10;
    clouds.scale = random(0.5 , 0.9);
    clouds.lifetime = 260;
    lifeguard.depth = clouds.depth + 1;
  }
}

function spawnBirds(){
  if(frameCount%180 === 0){
    var bird = createSprite(1600 + lifeguard.x, 60 , 80 , 60);
    bird.y = random(50 , 200)
    bird.velocityX = -10;
    var rand = Math.round(random(1,3));
    bird.lifetime = 260;
    bird.scale = 0.7;
    //bird.debug = true;
    lifeguard.depth = bird.depth + 1;
    switch(rand){
      case 1 : bird.addImage(bluebird);
      break;
      case 2 : bird.addImage(greenbird);
      break;
      case 3 : bird.addImage(purplebird);
      break;
    }
    birdsGroup.add(bird);
  }

}
