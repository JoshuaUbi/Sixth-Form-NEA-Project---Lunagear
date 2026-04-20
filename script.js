let BTNStart;
let BTNInstr;
let BTNCred;
let BTNQuit;
let BTNBack;
let level = 1;
let rooms = 1;

let player;
let ground;
let walls;
let floors;
let platforms;
let deathzone;
let enemies;
let bullet = [];
let pickups;
let map;
let enemyAtk = [];

let lives = 3;
let score = 0;
let health = 180;
let charge = 0;
let bomberHealth = 4;
let gunnerHealth = 7;
let jumperHealth = 3;

let edge = 78;

//Main menu scrolling
let bg1 = 0;
let bg2;
let bg3 = 0;
let bg4;
let bg5 = 0;
let bg6;
let bg7 = 0;
let bg8;

//level bg scrolling
let x1 = 0;
let x2;
let x3 = 0;
let x4;
let starsScroll = 0.8;
let scrollSpeed = 1;
let scrollSpeed2 = 2;

//credits scrolling
let cr1;
let credscr = 1.5;

let menuVGM;
let stageVGM;
let selectSFX;
let exitSFX;
let jumpSFX;
let shootSFX;
let hitSFX;
let coinSFX;
let deadSFX;


let collisionHurt = false;
  
function preload() {
  HUDtext = loadFont("SquareaRegular.ttf");
  Maintext = loadFont("OriginTech.ttf");
                        
  playerIdle = loadImage("player/idle.png");
  playerShoot = loadImage("player/shoot.png");
  smallBullet = loadImage("bullet/0.png");
  mediumBullet = loadImage("bullet/1.png");
  bigBullet = loadImage("bullet/2.png");
  playerMove = loadAnimation(
    "player/run1.png",
    "player/run2.png",
    "player/run3.png",
    "player/run4.png"
  )
  playerMove.frameDelay = 6;
  MoveAndShoot = loadAnimation(
    "player/player-shoot1.png",
    "player/player-shoot2.png",
    "player/player-shoot3.png",
    "player/player-shoot4.png"
  )
  MoveAndShoot.frameDelay = 6;
  playerJump = loadImage("player/jump.png");
  playerCharge = loadAnimation("effects/charging/Charge0.png"
    , {frameSize: [128, 32], frames: 4});

  bombersAni = loadAnimation(
    "enemy/enemy1.png",
    "enemy/enemy2.png"
  )
  bombersAni.frameDelay = 6;

  gunnerIdle = loadImage("enemy/gunguy/0.png");
  gunnerWalk = loadAnimation(
    "enemy/gunguy/1.png",
    "enemy/gunguy/2.png",
    "enemy/gunguy/3.png",
    "enemy/gunguy/4.png",
    "enemy/gunguy/5.png",
    "enemy/gunguy/6.png",
    "enemy/gunguy/7.png",
    "enemy/gunguy/8.png"
  )
  bombAni = loadAnimation(
    "enemy/gunguy/9.png",
    "enemy/gunguy/10.png",
    "enemy/gunguy/11.png",
    "enemy/gunguy/12.png"
  )

  deadEnemy = loadAnimation(
    "effects/explosion/explosion1.png",
    "effects/explosion/explosion2.png",
    "effects/explosion/explosion3.png"
  )
  deadEnemy.frameDelay = 3;

  smallhealthAni = loadAnimation(
    "tiles/pickups/smallhealth1.png",
    "tiles/pickups/smallhealth2.png"
  ) 
  smallhealthAni.frameDelay = 3;
  largehealthAni = loadAnimation(
    "tiles/pickups/largehealth1.png",
    "tiles/pickups/largehealth2.png"
  )
  largehealthAni.frameDelay = 3;

  Title = loadImage("Startscreen/Title.png");
  Instr = loadImage("controls.png")
  menuBG = loadImage("backgrounds/mainmenu/parallax-space-background.png");
  menuStars = loadImage("backgrounds/mainmenu/parallax-space-stars.png");
  menuRing = loadImage("backgrounds/mainmenu/parallax-space-ring-planet.png");
  menuFar = loadImage("backgrounds/mainmenu/parallax-space-far-planets.png");
  menuPlanet = loadImage("backgrounds/mainmenu/parallax-space-big-planet.png");
  menuCursor = loadImage("Startscreen/Cursor.png");
  
  stageBG = loadImage("backgrounds/Stage/far-buildings.png");
  stageBG2 = loadImage("backgrounds/Stage/back-buildings.png");
  stageBG3 = loadImage("backgrounds/Stage/foreground.png");

  Healthbar1 = loadImage("HUDstuff/Healthbar-0.png");
  Healthbar2 = loadImage("HUDstuff/Healthbar-1.png");
  lifeIcon = loadImage("HUDstuff/lifeicon.png");
  
  menuVGM = loadSound("audio/music/ObservingTheStar.mp3");
  stageVGM = loadSound("audio/music/UrbanTheme.mp3");
  selectSFX = loadSound("audio/sfx/menu/Select 1.wav");
  exitSFX = loadSound("audio/sfx/menu/Exit 1.wav");
  jumpSFX = loadSound("audio/sfx/player/Jump 1.wav");
  shootSFX = loadSound("audio/sfx/player/Shoot 1.wav");
  hitSFX = loadSound("audio/sfx/player/Hit 1.wav");
  coinSFX = loadSound("audio/sfx/player/Coin 1.wav");
  deadSFX = loadSound("audio/sfx/enemy/Explosion 1.wav");

  credits = loadImage("credits.png");
}

function setup() {
  createCanvas(960, 540);
  background(menuBG);

  //if (!HUDtext) HUDtext = 'Arial';
  //if (!Maintext) Maintext = 'Courier New';

  bg2 = width;
  bg4 = width;
  bg6 = width;
  bg8 = width;

  x2 = width;
  x4 = width;

  cr1 = height;
  
  //creating butttons
  BTNStart = new Sprite(width/2, 335, 2500, 590, 'k');
  BTNStart.img = "Startscreen/NG.png";
  BTNStart.scale = 0.08;
  BTNCred = new Sprite(width/2, 445, 2500, 590, 'k');
  BTNCred.img = "Startscreen/Cred.png";
  BTNCred.scale = 0.08;
  BTNQuit = new Sprite(width/2, 500, 2500, 590, 'k');
  BTNQuit.img = "Startscreen/Quit.png";
  BTNQuit.scale = 0.08;
  BTNInstr = new Sprite(width/2, 390, 2500, 590, 'k');
  BTNInstr.img = "Startscreen/Instr.png";
  BTNInstr.scale = 0.08;
  
  BTNBack = new Sprite(80, 45, 2780, 1250, 'k');
  BTNBack.img = "Startscreen/Back.png";
  BTNBack.scale = 0.06;
  BTNBack.visible = false;
  BTNBack.collider = "n";

  world.gravity.y = 13;

  player = new Sprite (110, 100, 30.165);
  player.rotationLock = true;
  player.pixelPerfect = true;
  player.color = "green";
  player.collider = "s";
  player.scale = 1.8;
  player.bounciness = 0;
  player.visible = false;
  player.addAni("idle", playerIdle)
  player.addAni("run", playerMove)
  player.addAni("jump", playerJump)
  player.addAni("shoot", playerShoot)
  player.addAni("runShoot", MoveAndShoot)
  
  ground = new Group();
  ground.w = 55;
  ground.h = 55;
  ground.collider = "static";
  ground.visible = false;
    
  floors = new ground.Group();
  floors.tile = "#";
  floors.img = "tiles/floortile.png";
  
  walls = new ground.Group();
  walls.tile = "=";
  walls.img = "tiles/walltile.png";

  spring = new ground.Group();
  spring.w = 50;
  spring.h = 20;
  spring.tile = "s";

  deathzone = new ground.Group();
  deathzone.w = 25;
  deathzone.h = 25;
  deathzone.color = "black";
  deathzone.tile = "x";
  deathzone.collider = "static";
  deathzone.image = "tiles/spikes.png";
  deathzone.scale = 1.75;

  items = new Group();
  items.diameter = 25;
  items.collider = "static";
  items.image = "tiles/gem.png";
  items.tile = "o";

  bullet = new Group();
  bullet.speed = 6;
  bullet.diameter = 8;
  bullet.scale = 2
  bullet.collider = "k";
  bullet.life = 40;
  bullet.damage = 0;
  bullet.addAni("small", smallBullet);
  bullet.addAni("medium", mediumBullet);
  bullet.addAni("big", bigBullet);

  enemies = new Group();
  enemies.rotationLock = true;
  enemies.visible = false;
  enemies.addAni("death", deadEnemy);

  bombers = new enemies.Group();
  bombers.w = 40;
  bombers.h = 40;
  bombers.scale = 1.7;
  bombers.collider = "d";
  bombers.tile = 'b';
  bombers.addAni("show", bombersAni);

  gunners = new enemies.Group();
  gunners.w = 30;
  gunners.h = 30;
  gunners.collider = "d";
  gunners.scale = 1.7;
  gunners.tile = "g";
  gunners.addAni("g-idle", gunnerIdle);
  gunners.addAni("g-walk", gunnerWalk);
  
  bomb = new Group();
  bomb.collider = "k";
  bomb.diameter = 18;
  bomb.life = 105;
  bomb.scale = 2.2;
  bomb.addAni("bombfired", bombAni);

  pickups = new Group();
  pickups.collider = "k";
  pickups.rotationLock = true;

  smallHealth = new pickups.Group();
  smallHealth.w = 20;
  smallHealth.h = 20;
  smallHealth.scale = 1.5;
  smallHealth.addAni("smallH", smallhealthAni);
  smallHealth.tile = "z";

  largeHealth = new pickups.Group();
  largeHealth.w = 20;
  largeHealth.h = 20;
  largeHealth.scale = 2;
  largeHealth.addAni("largeH", largehealthAni);
  largeHealth.tile = "v";

  extralife = new pickups.Group();
  extralife.w = 20;
  extralife.h = 20;
  extralife.scale = 2.2;
  extralife.image = "tiles/pickups/extralife.png";
  extralife.tile = "c";

  lunagear = new pickups.Group();
  lunagear.w = 60;
  lunagear.h = 60;
  lunagear.image = "tiles/pickups/levelend.png";
  lunagear.tile = "l";
  lunagear.collider = "s";

  player.overlaps(items,collect);

  player.overlaps(pickups, getPickup);

  bullet.overlaps(enemies,takeDamage);

  
  map = new Tiles(
    ["......................................=.....................b.................................................................................................=",
     "......................................=.......................................................................................................................=",
     "...........................b..........=.......................................................................................................................=",
     "................................o..#..=.......................................................................................................................=",
     "..............................o.#..=..=..............oooo...#.................................................................................................=",
     "..............................#....=..=.........o....####...=..............o........b............b............................................................=",
     ".................ooo...o...#.......=.......oo..###..........=..............#........................................#......................................l..=",
     ".............#.........#...=......s=.......##..............s=....oo....#................oooooo...............ooo...#v.....g....ooooo...........oooooooo.......=",
     "#################...######################.........##########################..#######################...############################..o#######################",
     "=================...........................................................=...........................#..............................o=......................",
     "=================...........................................................=..........................#...............................o=......................",
     "=================...........................................................=......g..z.....g.........#................................o=......................",
     "=================...........................................................#####################..###.......b................g........s=......................",
     "=================.....v......................s..................................................=...................ooo...##############=......................",
     "=================############...................................................................=..................#####................=......................",
     "=============================...................................................................#################..=====................=......................",
     "=============================....oooo....s.........z..............ooo......b.......................................=====................=......................",
     "=============================###########.........#######....s....#####....####................g.....ooo....c......s=====................=......................",
     "=============================...................................................###...#############################=====................=......................",
     "=============================....................................................=.................................=====................=......................",
     "=============================xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx=====xxxxxxxxxxxxxxxx=xxxxxxxxxxxxxxxxxxxxxx",
     "=============================####################################################=#################################=====################=######################",
     "===============================================================================================================================================================",
     "===============================================================================================================================================================",
     "==============================================================================================================================================================="
    ],
    50,50,ground.w, ground.h
  )
  map.layer = 1;
}

function changeLevel() {
  map.removeAll();
  if(rooms == 1){
    map = new Tiles(
    ["......................................=.....................b.................................................................................................=",
     "......................................=.......................................................................................................................=",
     "...........................b..........=.......................................................................................................................=",
     "................................o..#..=.......................................................................................................................=",
     "..............................o.#..=..=..............oooo...#.................................................................................................=",
     "..............................#....=..=.........o....####...=..............o........b............b............................................................=",
     ".................ooo...o...#.......=.......oo..###..........=..............#........................................#......................................l..=",
     ".............#.........#...=......s=.......##..............s=....oo....#................oooooo...............ooo...#v.....g....ooooo...........oooooooo.......=",
     "#################...######################.........##########################..#######################...############################..o#######################",
     "=================...........................................................=...........................#..............................o=......................",
     "=================...........................................................=..........................#...............................o=......................",
     "=================...........................................................=......g..z.....g.........#................................o=......................",
     "=================...........................................................#####################..###.......b................g........s=......................",
     "=================.....v......................s..................................................=...................ooo...##############=......................",
     "=================############...................................................................=..................#####................=......................",
     "=============================...................................................................#################..=====................=......................",
     "=============================....oooo....s.........z..............ooo......b.......................................=====................=......................",
     "=============================###########.........#######....s....#####....####................g.....ooo....c......s=====................=......................",
     "=============================...................................................###...#############################=====................=......................",
     "=============================....................................................=.................................=====................=......................",
     "=============================xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx=====xxxxxxxxxxxxxxxx=xxxxxxxxxxxxxxxxxxxxxx",
     "=============================####################################################=#################################=====################=######################",
     "===============================================================================================================================================================",
     "===============================================================================================================================================================",
     "==============================================================================================================================================================="
    ],
    50,50,ground.w, ground.h
  )
  map.layer = 1;
  }
  if(rooms == 2){
    map = new Tiles(
    [
    ".......xxxxxxxxxxxxxxxxxx......................................................................................................................................=",
    ".......==================......................................................................................................................................=",
    ".......===............===.................b.............................................................................b......................................=",
    ".......===............===.........v........................................................................................................oooo................=",
    "###....===............===......########.o...................................................................oooooooo....................#########..............=",
    "===....===............===............==##.o.................................................b..........##################...............=.......=..............=",
    "===....==================............====##.o.........oooo..........................z.............##....................................=....................l.=",
    "===....==================s...g.......======##...............g...ooo.......g.......####..........##=z......g.........g..........oooo....s=v.....................=",
    "===....#########################...o.=################....######################........####################################################....################",
    "===................................o.=...............=....=.....................................................................................=...............",
    "===.................b..............o.=...............=....=............................b........................................................=...............",
    "===............b...............o...s.=...............=....=.................................................................................o..s=...............",
    "===..oooo......................o.....=...............=....=........................#######...o...............................b.............o#...=...............",
    "===########........##......g...o.....=...............=....=........b..............#..........o.........................g...................#=...=...............",
    "===========....#.........####..s.....=.....................................zz....#...........o...................o....##########....s....####...=...............",
    "===========..........................=................o.o.o.o............######..=...........s.....c...#####...####.............................=...............",
    "===========..........................=...............##########....ss......==....=................###...........................................=...............",
    "===========..........................=.....................................==....=..............................................................=...............",
    "===========xxxxxxxxxxxxxxxxxxxxxxxxxx=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx==xxxx=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx=xxxxxxxxxxxxxxx",
    "================================================================================================================================================================",
    "================================================================================================================================================================",
    "================================================================================================================================================================"
    ],
      50,50,ground.w, ground.h
    )
  }
  if(rooms >= 3){
    rooms = 1;
    showAll();
    startGame();
  }
}

function showHUD() {

  //healthbar
  image(Healthbar1,14,80,194,30);
  image(Healthbar2,21,80,health,30);

  //Charge meter
  fill("grey");
  rect(15,500,200,20);
  fill("yellow");
  rect(15,500,charge,20);

  fill(255);
  textSize(20);
 textFont(HUDtext);
  text("Lives: " + lives, 15, 70);
  
  fill(255);
  textSize(20);
  textFont(HUDtext);
  text("Score: " + score, 15, 140);
}

function collect(player, item) {
  score = score + 50;
  item.remove();
  coinSFX.play();
}

function getPickup(player, pickup){
  if(player.overlaps(smallHealth)){
    health += 5;
  }
  if(player.overlaps(largeHealth)){
    health += 20;
  }
  if(player.overlaps(extralife)){
    lives += 1;
  }
  if(player.overlaps(lunagear)){
    rooms += 1;
    player.pos = {x:100, y:100};
    changeLevel();
  }
  pickup.remove();
  coinSFX.play();
}

function hurt() {
  health = health - 10;

  
  // if(frameCount % 60 <= 0){
  //   player.collider = "k";
  // } else if(frameCount % 60 == 0){
  //   player.collider = "d";
  // }
  //if(player.mirror.x == true){
    //player.move(10, 'right', 6);
  //} 
  //else if (player.mirror.x == false){
    //player.move(10, 'left', 6);
  //}
  //player.vel.y = -3;
}

function shoot(){
  let b = new bullet.Sprite();
  b.pos = player.pos;
  if(player.mirror.x == true){
    b.mirror.x = true;
    b.vel.x = -19;
  }
  else if(player.mirror.x == false){
    b.mirror.x = false;
    b.vel.x = 19;
  }
  
  if(b.overlaps(player)){
    b.collider = 'k';
  } 

  if(charge >= 200){
        b.ani = "big";
        b.damage = 3;
        charge = 0;
      } 
      else if(charge == 100){
        b.ani = "medium";
        b.damage = 2;
        charge = 0;
      } 
      else {
      b.ani = "small";
        b.damage = 1;
      }
  shootSFX.play();
}

//function enemyShoot() {
  //if(frameCount % 150 == 0){
    //let m = new bomb.Sprite();
    //m.vel.x -= 11;
  //}
//}
function gunnerWalk() {
  
}

function takeDamage(bullet, enemy){
  bomberHealth = bomberHealth - bullet.damage;
  if(bomberHealth <= 0){
    enemy.collider = "n";
    enemy.changeAni("death");
    enemy.remove();
    bomberHealth = 4;
    score += 15;
    }
  bullet.remove();
  exitSFX.play();
}

function shootAnim() {
  if(frameCount < 35){
    player.ani = "idle";
  }
  else {
    player.ani = "shoot";
  }
}

function enemyControl() {
  if(framecount % 40 == 0){
    
  }
}


function draw() {
  clear();

  if(kb.presses("1")){
    let fs = fullscreen();
    fullscreen(!fs);
  }

  if(level == 1) {
    background(menuBG)
    camera.x = 480;
    camera.y = 270;
    image(menuStars, bg1, 0, width, height);
    image(menuStars, bg2, 0, width, height);
    image(menuFar, bg3, 40, 740, 460);
    image(menuFar, bg4, 40, 740, 460);
    image(menuRing, bg5, 10, 160, 370);
    image(menuRing, bg6, 10, 160, 370);
    image(menuPlanet, bg7 + 520, 280, 250, 250);
    image(menuPlanet, bg8 + 520, 280, 250, 250);
    image(Title, 125, 8, 700, 300);

      bg1 += starsScroll;
      bg2 += starsScroll;
      bg3 += scrollSpeed;
      bg4 += scrollSpeed;
      bg5 += scrollSpeed2;
      bg6 += scrollSpeed2;
      bg7 += scrollSpeed2;
      bg8 += scrollSpeed2;

      if(bg1 > width){
        bg1 = -width;
      }
      if(bg2 > width){
        bg2 = -width;
      }
      if(bg3 > width){
        bg3 = -width;
      }
      if(bg4 > width){
        bg4 = -width;
      }
    if(bg5 > width){
        bg5 = -width;
      }
      if(bg6 > width){
        bg6 = -width;
      }
      if(bg7 > width){
        bg7 = -width;
      }
      if(bg8 > width){
        bg8 = -width;
      }

    //stageVGM.stop();
    //menuVGM.play();
    //menuVGM.loop();

    if(BTNStart.mouse.hovering()) image(menuCursor, 300, 300, 65, 65);
    if(BTNInstr.mouse.hovering()) image(menuCursor, 250, 355, 65, 65);
    if(BTNCred.mouse.hovering()) image(menuCursor, 300, 410, 65, 65);
    if(BTNQuit.mouse.hovering()) image(menuCursor, 300, 465, 65, 65);
    
    if(BTNStart.mouse.presses()){
      selectSFX.play();
      hideAll();
      startGame();
    }
    if(BTNInstr.mouse.presses()){
      selectSFX.play();
      hideAll();
      startGame();
    }
    if(BTNCred.mouse.presses()){
      selectSFX.play();
      hideAll();
      startGame();
    }
    if(BTNQuit.mouse.presses()){
      selectSFX.play();
      hideAll();
      startGame();
    }
  }

  if(level == 2) {
  background(stageBG);
  image(stageBG2, x1, 0, width, height);
  image(stageBG2, x2, 0, width, height);
  image(stageBG3, x3, 0, width, height);
  image(stageBG3, x4, 0, width, height);
    
  camera.zoom = 1;
  camera.x = player.x;
  camera.y = player.y;

    //menuVGM.stop();
    //stageVGM.play();
    //stageVGM.loop();
    

    showHUD()
 
    if(kb.presses("p")){
      showAll();
      startGame();
    }

    //bomber enemy
    bombers.vel.y = cos(frameCount * 2.2) * 1.8;

    //gunner 
    //enemyShoot();
    //if(bomb.collides(player)){
      //hurt();
      //bomb.remove();
    //}
    
    if(kb.presses(" ") && player.colliding(floors)){
      player.vel.y = -6;
      jumpSFX.play();
    }
    
    if(kb.presses("j")){
    shoot();
    }
    if(kb.pressing("j")){
      if(frameCount % 85 == 0){
        charge += 100;
      }

      if(charge >= 200){
        charge = 200;
      }
    }

    if(kb.released("j")){
      if(charge >= 100){
        shoot();
      }
      charge = 0;
    }
    
    if(kb.pressing("a") && kb.pressing("d")){
      player.x += 0;
      player.x -= 0;
      if(kb.pressed("j")){
        player.ani = "shoot";
      }
      else {
        player.ani = "idle";
      }
    }
    else if(kb.pressing("a")){
      player.x -= 4.45;
      player.mirror.x = true;
      if(kb.pressing("j")){
      player.ani = "runShoot";
      } else {
      player.ani = "run";
      }

      if(player.colliding(walls) || player.x <= 100){
        x1 == 0;
        x2 == 0;
        x3 == 0;
        x4 == 0;
      } else {
      x1 += scrollSpeed;
      x2 += scrollSpeed;
      x3 += scrollSpeed2;
      x4 += scrollSpeed2;

      if(x1 >= width){
        x1 = -width;
      }
      if(x2 >= width){
        x2 = -width;
      }
      if(x3 >= width){
        x3 = -width;
      }
      if(x4 >= width){
        x4 = -width;
      }
      }
    }
    else if(kb.pressing("d")){
      player.x += 4.45;
      player.mirror.x = false;
      if(kb.pressing("j")){
      player.ani = "runShoot";
      } else {
      player.ani = "run";
      }
      
      if(player.colliding(walls) || player.x <= 110){
        x1 == 0;
        x2 == 0;
        x3 == 0;
        x4 == 0;
      } else {
      x1 -= scrollSpeed;
      x2 -= scrollSpeed;
      x3 -= scrollSpeed2;
      x4 -= scrollSpeed2;

      if(x1 < -width){
        x1 = width - 1;
      }
      if(x2 < -width){
        x2 = width - 1;
      }
      if(x3 < -width){
        x3 = width - 1;
      }
      if(x4 < -width){
        x4 = width - 1;
      }
      }
    }
    else {
      if(kb.pressing("j")){
        player.ani = "shoot";
      } else {
        player.ani = "idle";
      }
    }
    
    if(!player.colliding(floors)){
      if(player.vel.y > 0.2 || player.vel.y < 0){
        player.ani = "jump";
      }
    }
    if(player.collides(floors)){
      if(player.vel.y < 2){
        player.vel.y = 0;
      }
    } 

    if(health >= 180){
      health = 180;
    }

    if(player.collides(spring)){
      player.vel.y = -10;
      player.vel.x = 0;
    }

    if(player.colliding(deathzone)){
      lifeLost();
    }
    
    if(health <= 0){
      lifeLost();
      deadSFX.play();
    } 
    if(lives == 0){
      gameOver();
    }
    
    if(player.colliding(enemies)){
      collisionHurt = true;      
    }

    if(collisionHurt == true){
      if(!player.colliding(enemies)){
            hurt();
            hitSFX.play();
            collisionHurt = false;  
      }
    }

    if(player.x <= edge){
      player.x = edge;
    }
  }

  if(level == 3) {
    background(menuBG);
    image(menuStars, bg1, 0, width, height);
    image(menuStars, bg2, 0, width, height);
    image(menuFar, bg3, 40, 740, 460);
    image(menuFar, bg4, 40, 740, 460);
    image(menuRing, bg5, 10, 160, 370);
    image(menuRing, bg6, 10, 160, 370);
    image(menuPlanet, bg7 + 520, 280, 250, 250);
    image(menuPlanet, bg8 + 520, 280, 250, 250);

      bg1 += starsScroll;
      bg2 += starsScroll;
      bg3 += scrollSpeed;
      bg4 += scrollSpeed;
      bg5 += scrollSpeed2;
      bg6 += scrollSpeed2;
      bg7 += scrollSpeed2;
      bg8 += scrollSpeed2;

      if(bg1 > width){
        bg1 = -width;
      }
      if(bg2 > width){
        bg2 = -width;
      }
      if(bg3 > width){
        bg3 = -width;
      }
      if(bg4 > width){
        bg4 = -width;
      }
    if(bg5 > width){
        bg5 = -width;
      }
      if(bg6 > width){
        bg6 = -width;
      }
      if(bg7 > width){
        bg7 = -width;
      }
      if(bg8 > width){
        bg8 = -width;
      }

    //stageVGM.stop();
    //menuVGM.play();
    //menuVGM.loop();

      image(credits,0, cr1, width, 3832);
      cr1 -= credscr;

      if(cr1 <= -3832){
        cr1 = height;
      }

      if(BTNBack.mouse.presses()) {
        cr1 = height;
        selectSFX.play();
        showAll();
      }
    }

  if(level == 5) {
    background(menuBG);
    image(menuStars, bg1, 0, width, height);
    image(menuStars, bg2, 0, width, height);
    image(menuFar, bg3, 40, 740, 460);
    image(menuFar, bg4, 40, 740, 460);
    image(menuRing, bg5, 10, 160, 370);
    image(menuRing, bg6, 10, 160, 370);
    image(menuPlanet, bg7 + 520, 280, 250, 250);
    image(menuPlanet, bg8 + 520, 280, 250, 250);

      bg1 += starsScroll;
      bg2 += starsScroll;
      bg3 += scrollSpeed;
      bg4 += scrollSpeed;
      bg5 += scrollSpeed2;
      bg6 += scrollSpeed2;
      bg7 += scrollSpeed2;
      bg8 += scrollSpeed2;

      if(bg1 > width){
        bg1 = -width;
      }
      if(bg2 > width){
        bg2 = -width;
      }
      if(bg3 > width){
        bg3 = -width;
      }
      if(bg4 > width){
        bg4 = -width;
      }
    if(bg5 > width){
        bg5 = -width;
      }
      if(bg6 > width){
        bg6 = -width;
      }
      if(bg7 > width){
        bg7 = -width;
      }
      if(bg8 > width){
        bg8 = -width;
      }

    //stageVGM.stop();
    //menuVGM.play();
    //menuVGM.loop();
                  
    image(Instr, 205, 60, 590, 440);

    if(BTNBack.mouse.presses()) {
        cr1 = height;
        selectSFX.play();
        showAll();
      }
  }
}

function hideAll() {
  BTNStart.visible = false;
  BTNStart.collider = "n";
  BTNInstr.visible = false;
  BTNInstr.collider = "n";
  BTNCred.visible = false;
  BTNCred.collider = "n";
  BTNQuit.visible = false;
  BTNQuit.collider = "n";
  if(BTNStart.mouse.presses()){
  level = 2;
  }
  if(BTNCred.mouse.presses()){
  level = 3;
  }
  if(BTNQuit.mouse.presses()){
  level = 4;
  }
  if(BTNInstr.mouse.presses()){
  level = 5;
  }
}

function showAll(){
  BTNStart.visible = true;
  BTNStart.collider = "k";
  BTNInstr.visible = true;
  BTNInstr.collider = "k";
  BTNCred.visible = true;
  BTNCred.collider = "k";
  BTNQuit.visible = true;
  BTNQuit.collider = "k";
  BTNBack.visible = false;
  BTNBack.collider = "n";
  rooms = 1;
  level = 1;
}

function startGame() {
  if(level == 5) {
    BTNBack.visible = true;
    BTNBack.collider = "k";
  }
  if(level == 4) {
    menuVGM.stop();
    background(0);
    noLoop();
  }
  if(level == 3){
    BTNBack.visible = true;
    BTNBack.collider = "k";
  }
  if(level == 2) {
    changeLevel();
    ground.visible = true;
    player.collider = "d";
    player.visible = true;
    player.mass = 10;
    enemies.visible = true;
    items.visible = true;
    spring.visible = true;
    bullet.visible = true;
  }
  if(level == 1){
    player.pos = {x:100, y:100}
    lives = 3;
    health = 180;
    score = 0;
    
    player.collider = 'k';
    player.vel.y = 0;
    ground.visible = false;
    player.visible = false;
    enemies.visible = false;
    items.visible = false;
    spring.visible = false;
    bullet.visible = false;
    bullet.remove();
  }
}

function lifeLost() {
  lives = lives - 1;
  health = 180;
  player.pos = {x:100, y:100};
}

function gameOver() {
  background(0)
  ground.visible = false;
    player.visible = false;
    enemies.visible = false;
    items.visible = false;
    spring.visible = false;
    bullet.visible = false;
    pickups.visible = false;
    bullet.remove();
  fill(255);
  textSize(80);
  textFont(Maintext);
  textAlign(CENTER);
  text("Game Over", width/2, height/2);
  stageVGM.stop();
  noLoop();
}
