var game = new Phaser.Game(800,600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {

    game.load.image('sky', 'assets/sky.png');
    game.load.image('ground', 'assets/obstruc.png');
    game.load.spritesheet('dude', 'assets/thing.png', 30.05, 19);
    game.load.image('topbound','assets/platform.png');
}

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


function create() {
    score=0;
	
    //enable arcade physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.world.setBounds(0, 0, 100000, 600);

    // bg
    sky=game.add.sprite(0, 0, 'sky');
    sky.scale.setTo(100000,2);


    //add obstructions and physics
    platforms.enableBody = true;

    createLedges();
    // player
    player = game.add.sprite(32, game.world.height - 150, 'dude');
    game.physics.arcade.enable(player);
    
    //for now:
    player.body.collideWorldBounds = true;
    
    //hahahahaphysics
    player.body.gravity.y = 2000;
    // score
    scoreText = game.add.text(400,100, '0', { fontSize: '60px', fill: '#fff' });

    game.camera.follow(player);
    scoreText.fixedToCamera=true;
    

    // constant animation
    player.animations.add('right', [0,1,2,3], 5, true);

    // controls
    cursors = game.input.keyboard.createCursorKeys();

}
function createLedges(){
	
    h = platforms.create(0,0,'topbound');
    y = platforms.create(0,599,'topbound');
    h.scale.setTo(100000,0.01);
    y.scale.setTo(100000,0.1);
    for (var i = 0; i < 4; i++)
    {

        //gap height and position randomization within limits
     
	    
        ledge = platforms.create(i * 400 + 500, 0, 'ground');
        ledge.scale.setTo(1.5, (center - heightGap / 2) / 1000);
        ledge.body.immovable=true;


        ledge2 = platforms.create(i * 400 + 500, center + heightGap / 2, 'ground');
        ledge2.scale.setTo(1.5,500);
        ledge2.body.immovable=true;

    }
}

function update() {

    //  collide player with the platforms
    game.physics.arcade.overlap(player, platforms,playerDie,null,this);
    
    //status quo
    player.body.velocity.x=250;
    player.animations.play('right');


    this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	
    //  allow the player to jump anytime
   if (this.spaceKey.isDown)
    {
        player.body.velocity.y = -650;
    }

}


function playerDie (player,platforms)
{

    loseText = game.add.text(300, 200, 'YOU LOSE.\nPress Space to try again.', { fontSize: '50px', fill: '#fff' });
    loseText.fixedToCamera=true;
    player.body.velocity=0;
    player.animations.stop();
    player.frame=1;

    if (this.spaceKey.isDown)
    {
  
    create();
    }
	
}

