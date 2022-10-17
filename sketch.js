var block, ground, jumpBlock;
var talkBlock, decorationBlock1, decorationBlock2, decorationBlock3, decorationBlock4,evilBlock;
var blockIMG1,blockIMG2, blockIMGAtt, evilBlockIMG1, evilBlockIMG2,backgroundIMG, backgroundIMG2, backgroundIMG3, backgroundIMG4, talkBlockIMG, decorationBlock1IMG, decorationBlock2IMG, decorationBlock3IMG, decorationBlock4IMG;
var edges;
var test = 1; //Andar para todas as entidates
var BlLevel = 1; //Andar do Jogador
var health = 5; // Vida do Jogador
var enemyDied = false; //Se o Inimigo já morreu (Falso)
var Ehealth = 3; //Vida do Inimigo
var testLimit = 4; //Limite de andares

function preload(){
blockIMG1 = loadAnimation("knight1.png"); //Gato parado pra esquerda
blockIMG2 = loadAnimation("knight2.png"); //Gato parado pra direita
blockIMGAtt = loadAnimation("knight1.png", "knightattack.png", "knight1.png"); //Animação de ataque
evilBlockIMG1 = loadAnimation("doge.png"); //Imagem de Inimigo (cão)
evilBlockIMG2 = loadAnimation("doge2.png"); //Imagem de Inimigo porém esqueci de virar
talkBlockIMG = loadAnimation("LilFish.webp"); //Imagem de gato de missão (gato peixe pequeno)
decorationBlock1IMG = loadAnimation("sportdaycat.webp"); //Imagem de decoração (gato do esporte)
decorationBlock2IMG = loadAnimation("piggeback.webp"); //Imagem de decoração (porco de esporte)
decorationBlock3IMG = loadAnimation("tree.webp"); //Imagem de decoração (árvore) 
decorationBlock4IMG = loadAnimation("gift.webp"); //Imagem de decoração (presente perto da árvore) 
//Imagem de fundos
backgroundIMG = loadImage("background.webp");
backgroundIMG2 = loadImage("background1.webp");
backgroundIMG3 = loadImage("background2.webp");
backgroundIMG4 = loadImage("background3.webp");
}

function setup() {
  createCanvas(800,400);
  edges = createEdgeSprites();
  talkBlock = createSprite(700, 270, 50, 50);
  talkBlock.addAnimation("idleTalk", talkBlockIMG);

  decorationBlock1 = createSprite(170, 220, 50, 50);
  decorationBlock1.addAnimation("idleDeco1", decorationBlock1IMG);
  decorationBlock1.scale = 0.6;

  decorationBlock2 = createSprite(70, 210, 50, 50);
  decorationBlock2.addAnimation("idleDeco2", decorationBlock2IMG);
  decorationBlock2.scale = 1.5;

  decorationBlock3 = createSprite(400,160,50,50);
  decorationBlock3.addAnimation("idleDeco3", decorationBlock3IMG);

  decorationBlock4 = createSprite(500,250,50,50);
  decorationBlock4.addAnimation("idleDeco4", decorationBlock4IMG);
  decorationBlock4.scale = 0.7

  evilBlock = createSprite(700, 200, 50, 50);
  evilBlock.addAnimation("idle", evilBlockIMG2);
  evilBlock.addAnimation("testAnim", talkBlockIMG);
  block = createSprite(100, 200, 50, 50);
  block.addAnimation("idle1", blockIMG1);
  block.addAnimation("idle2", blockIMG2);
  block.addAnimation("attack", blockIMGAtt);
  ground = createSprite(400, 320, 800, 20);
  ground.visible = false;
  jumpBlock = createSprite(400, 290, 800, 20);
  jumpBlock.visible = false;
}

function draw() {
  if (test == 1){
    background(backgroundIMG);
    talkBlock.visible = false;
    decorationBlock1.visible = true;
    decorationBlock2.visible = true;
    decorationBlock3.visible = false;
    decorationBlock4.visible = false;
    evilBlock.visible = false;
  }
  if (test == 2){
    background(backgroundIMG2);
    if(block.isTouching(edges[0])) {
      block.position.x = 700
      test = test-1
      BlLevel = BlLevel-1
      
    }
    talkBlock.visible = true;
    decorationBlock1.visible = false;
    decorationBlock2.visible = false;
    decorationBlock3.visible = false;
    decorationBlock4.visible = false;
    evilBlock.visible = false;
  }
  if (test == 3){
    background(backgroundIMG2);
    if(block.isTouching(edges[0])) {
      block.position.x = 700
      test = test-1
      BlLevel = BlLevel-1
    }
    talkBlock.visible = false;
    decorationBlock1.visible = false;
    decorationBlock2.visible = false;
    decorationBlock3.visible = true;
    decorationBlock4.visible = true;
    evilBlock.visible = false;
  }
  if (test == 4){
    background(backgroundIMG3);
    if(block.isTouching(edges[0])) {
      block.position.x = 700
      test = test-1
      BlLevel = BlLevel-1
    }
    talkBlock.visible = false;
    decorationBlock1.visible = false;
    decorationBlock2.visible = false;
    decorationBlock3.visible = false;
    decorationBlock4.visible = false;
    evilBlock.visible = true;
    if(enemyDied == false && evilBlock.visible !== true){
      evilBlock.visible = true;
    }
    else if(Ehealth == 0){
      evilBlock.visible = false;
    }
  }
  drawSprites();
  block.collide(ground);
  evilBlock.collide(ground);
  block.collide(edges[0]);
  block.collide(edges[1]);
  block.velocityY = block.velocityY + 0.5;
  evilBlock.velocityY = evilBlock.velocityY + 0.5;
  if(keyDown("Left_Arrow")) {
    block.changeAnimation("idle2")
    block.position.x = block.position.x-5
  }
  if(keyDown("Right_Arrow")) {
    block.changeAnimation("idle1")
    block.position.x = block.position.x+5
  }
  if(keyDown("space")){
    if(block.isTouching(jumpBlock)){
      block.velocityY = -10; 
    }
  }
  if(keyDown("Q")){
    if(block.isTouching(evilBlock)){
evilBlock.visible = false;
block.changeAnimation("attack");
Ehealth = Ehealth-1;
    }
  }
  if(Ehealth == 0){
    enemyDied == true;
    evilBlock.visible = false;
    evilBlock.position.x = 10000000000;
  }
  if(evilBlock.isTouching(block) && evilBlock.visible == true){
//health = health-1
  }
  if(health == 0){
    block.position.y = 1000;
  }
  if(evilBlock.isTouching(edges[0])){
    evilBlock.position.x = 700;
  }
  if(block.isTouching(edges[1])) {
    if(test !== testLimit){
      block.position.x = 100
      test = test+1
      BlLevel = BlLevel+1
    }
    
  }
  if(BlLevel == 4){
    evilBlock.position.x = evilBlock.position.x-5;
  }
}