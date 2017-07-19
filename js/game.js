var game = new Phaser.Game(800,600, Phaser.AUTO, '', { preload: preload, create: create, update: update });
WebFontConfig = {
  active:function(){game.time.events.add(Phaser.Timer.SECOND,createText,this);},

  google:{
    families: ['Revalia']
  }
};

function preload() {

    game.load.image('sky', 'assets/sky.png');
    game.load.image('ground', 'assets/obstruc.png');
    game.load.spritesheet('dude', 'assets/thing.png', 30.05, 19);
    game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
}
var speed = 20;
var gravity = 900;
var player;
var platforms = game.add.group();
var score = 0;
var scoreText;
var num=0;
var winText;
var loseText;
var sky;
var spacekey;
var ledge;
var h;
var y;
var center = Math.random()*400+100;
var heightGap = Math.random()*50+30;
var cursors = game.input.keyboard.createCursorKeys();
var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);


function create() {
    score=0;

    //enable arcade physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.world.setBounds(0, 0, 100000, 600);
    this.physics.arcade.gravity.y = gravity;

    // bg
    this.background = this.add.tileSprite(0,0,this.world.width, this.world.height, 'sky');

    // player
    this.player = game.add.sprite(0,0, 'dude');
    this.player.body.collideWorldBounds = true;
    this.physics.arcade.enableBody (this.player);
    player.animations.add('right', [0,1,2,3], 5, true);

    this.scoreText = this.add.text(
        this.world.centerX, this.world.height/5, "",
        {size: "32px", fill: "#fff", align:"center", }
      );
      this.score.setText("PRESS SPACE TO BEGIN");
    //add obstructions and physics
    // platforms.enableBody = true;
    //
    // h = platforms.create(0,0,'topbound');
    // y = platforms.create(0,599,'topbound');
    // h.scale.setTo(100000,0.01);
    // y.scale.setTo(100000,0.1);
    // for (var i = 0; i < 4; i++)
    // {
    //
    //     //gap height and position randomization within limits
    //
    //     ledge = platforms.create(i * 400 + 500, 0, 'ground');
    //     ledge.scale.setTo(1.5, (center - heightGap / 2) / 1000);
    //     ledge.body.immovable=true;
    //
    //
    //     ledge2 = platforms.create(i * 400 + 500, center + heightGap / 2, 'ground');
    //     ledge2.scale.setTo(1.5,500);
    //     ledge2.body.immovable=true;
    //
    // }
    if (this.spaceKey.isDown)
     {
         this.jump();
     }
    this.reset();

}

function start(){
  this.player.body.allowGravity = true;
  this.scoreText.setText("SCORE\n" + this.score);
  this.gameStarted = true;
}

function jump (){
  if (!this.gameStarted){
    this.start();
  }
  if (!this.gameOver){
    this.player.body.velocity.y = -400;
  }
}

function update() {
  if (this.gameStarted){
      if (this.palyer.body.bottom >= this.world.bounds.bottom){
        this.playerDie();
      }
  } else {
    this.player.y = this.world.centerY + (8 * Math.cos(this.time.now/200));
  }
}
   //
  //   //  collide player with the platforms
  //   game.physics.arcade.overlap(player, platforms,playerDie,null,this);
   //
  //   //status quo
  //   player.body.velocity.x=250;
  //   player.animations.play('right');
   //
   //
  //   this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
   //
  //   //  allow the player to jump anytime
function playerDie(){
  this.gameOver = true;
  this.scoreText.setText("SCORE\n" + this.score + "\nPRESS SPACE TO TRY AGAIN");
  this.background.autoscroll (0,0);
}

function reset ()
{
  this.player.body.allowGravity = false;
  this.player.reset(this.world.width / 4, this.world.centerY);
  this.gameStarted = false;
  this.gameOver = false;
  this.background.autoScroll(-speed * .80 , 0);
  this.scoreText.setText("TOUCH TO\nSTART GAME");

}
