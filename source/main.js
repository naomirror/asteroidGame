
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update });


function preload() {

    game.load.image('space', 'assets/purple.png');
    game.load.image('bullet', 'assets/Effects/fire01.png');
    game.load.image('ship', 'assets/playerShip3_green.png');
    game.load.image('largeAsteroid1', 'assets/Meteors/MeteorGrey_big1.png');
    game.load.image('mediumAsteroid1', 'assets/Meteors/MeteorGrey_med1.png');
    game.load.image('smallAsteroid1', 'assets/Meteors/MeteorGrey_tiny1.png');

}

var ship;
var cursors;

var bullet;
var bullets;
var bulletTime = 0;

var asteroids;
var smallerAsteroids;
var smallestAsteroids;

var levelCounter = 0;
var levelDisplay;

var deadAstroidCount = 0;
var score = 0;
var scoreDisplay;
var highScore = 0;
var hsDisplay;


function create() {

    
    game.physics.startSystem(Phaser.Physics.ARCADE);

  
    game.add.tileSprite(0, 0, game.width, game.height, 'space');

 
    bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;
 
    asteroids = game.add.group();
    asteroids.enableBody = true;
    asteroids.physicsBodyType = Phaser.Physics.ARCADE;
    asteroids.createMultiple(3 + levelCounter+1, 'largeAsteroid1');
    
    smallerAsteroids = game.add.group();
    smallerAsteroids.enableBody = true;
    smallerAsteroids.physicsBodyType = Phaser.Physics.ARCADE;
    smallerAsteroids.createMultiple(6 + (levelCounter+1)*2, 'mediumAsteroid1');
    
    smallestAsteroids = game.add.group();
    smallestAsteroids.enableBody = true;
    smallestAsteroids.physicsBodyType = Phaser.Physics.ARCADE;
    smallestAsteroids.createMultiple(18 + (levelCounter+1)*6, 'smallAsteroid1');
   
    
    
    bullets.createMultiple(10, 'bullet');
    bullets.setAll('anchor.x', 0.5);
    bullets.setAll('anchor.y', 0.5);

    asteroids.createMultiple(3, 'largeAsteroid1');
    for (var i = 0; i <levelCounter + 3; i++){
var a =asteroids.getFirstExists(false);
    if (a){
        a.reset(game.rnd.integerInRange(0,600),game.rnd.integerInRange(0,400));
        a.body.velocity.x = game.rnd.integerInRange(-200,200);
         a.body.velocity.y = game.rnd.integerInRange(-200,200);
    }
    }

    ship = game.add.sprite(300, 300, 'ship');
    ship.anchor.set(0.5);

    
    game.physics.enable(ship, Phaser.Physics.ARCADE);

    ship.body.drag.set(25);
    ship.body.maxVelocity.set(200);

   
    cursors = game.input.keyboard.createCursorKeys();
    game.input.keyboard.addKeyCapture([ Phaser.Keyboard.SPACEBAR ]);
    
    scoreDisplay = game.add.text(16,16, 'Score:0');
    hsDisplay = game.add.text(500,16, 'High Score:0');
    
    levelDisplay(game.add.text(200,16, 'Level:' + (levelCounter+1)));
}

function update() {
    if (cursors.up.isDown)
    {
        game.physics.arcade.accelerationFromRotation(ship.rotation, 400, ship.body.acceleration);
    }
    else
    {
        ship.body.acceleration.set(0);
    }

    if (cursors.left.isDown)
    {
        ship.body.angularVelocity = -300;
    }
    else if (cursors.right.isDown)
    {
        ship.body.angularVelocity = 300;
    }
    else
    {
        ship.body.angularVelocity = 0;
    }

    if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
    {
        fireBullet();
    }
    
   
    screenWrap(ship);
   asteroids.forEach(function(eachAsteroid) {
       screenWrap(eachAsteroid);
       
       if (game.physics.arcade.collide(eachAsteroid, ship)) {
           
           score -=5;
           
       }
       if (game.physics.arcade.collide(eachAsteroid, bullets)) {
           var ax = eachAsteroid.x;
           var ay = eachAsteroid.y;
           eachAsteroid.kill(); 
           this.bullet.kill();
           deadAstroidCount +=1;
             score +=10; 
           var asteroid = 
                 smallerAsteroids.getFirstExists(false);

            asteroid.reset(ax,ay);
 asteroid.body.velocity.x = game.rnd.integerInRange(-200,200);
         asteroid.body.velocity.y = game.rnd.integerInRange(-200,200);
           asteroid = 
                 smallerAsteroids.getFirstExists(false);

            asteroid.reset(ax,ay);
 asteroid.body.velocity.x = game.rnd.integerInRange(-200,200);
         asteroid.body.velocity.y = game.rnd.integerInRange(-200,200);
        asteroid.lifeSpan = 100;
       }  
       scoreDisplay.text = 'Score:' + score;
           if (score > highScore) {
               highScore = score;
           }
           hsDisplay.text = "High Score:" + highScore;
   }
);
 
    smallerAsteroids.forEach(function(eachAsteroid) {
       screenWrap(eachAsteroid);
       
       if (game.physics.arcade.collide(eachAsteroid, ship)) {
           
           score -=5;
           
       }
       if (game.physics.arcade.collide(eachAsteroid, bullets)) {
           var ax = eachAsteroid.x;
           var ay = eachAsteroid.y;
           eachAsteroid.kill(); 
           this.bullet.kill();
           deadAstroidCount +=1;
             score +=10; 
           var asteroid = 
                 smallestAsteroids.getFirstExists(false);

            asteroid.reset(ax,ay);
 asteroid.body.velocity.x = game.rnd.integerInRange(-200,200);
         asteroid.body.velocity.y = game.rnd.integerInRange(-200,200);
           asteroid = 
                 smallestAsteroids.getFirstExists(false);

            asteroid.reset(ax,ay);
 asteroid.body.velocity.x = game.rnd.integerInRange(-200,200);
         asteroid.body.velocity.y = game.rnd.integerInRange(-200,200);
           
           asteroid = 
                 smallestAsteroids.getFirstExists(false);

           
            asteroid.reset(ax,ay);
 asteroid.body.velocity.x = game.rnd.integerInRange(-200,200);
         asteroid.body.velocity.y = game.rnd.integerInRange(-200,200);
        
       }  
       scoreDisplay.text = 'Score:' + score;
           if (score > highScore) {
               highScore = score;
           }
           hsDisplay.text = "High Score:" + highScore;
   }
);
 
 smallestAsteroids.forEach(function(eachAsteroid) {
       screenWrap(eachAsteroid);
       
       if (game.physics.arcade.collide(eachAsteroid, ship)) {
           
           score -=5;
           
       }
       if (game.physics.arcade.collide(eachAsteroid, bullets)) {
           
           eachAsteroid.kill(); 
           deadAstroidCount +=1;
             score +=100; 
         
       scoreDisplay.text = 'Score:' + score;
           if (score > highScore) {
               highScore = score;
           }
           hsDisplay.text = "High Score:" + highScore;
   }
 }
);
         if (deadAstroidCount == 27 + (levelCounter) + (levelCounter)*2 + (levelCounter)*6) {
             deadAstroidCount = 0;
             levelCounter +=1;
             game.state.restart(true);
         } 
}

function fireBullet () {

    if (game.time.now > bulletTime)
    {
        bullet = bullets.getFirstExists(false);
if (bullet)
        {
            bullet.reset(ship.body.x + 40, ship.body.y + 50);
            bullet.lifespan = 2000;
            bullet.rotation = ship.rotation;
    game.physics.arcade.velocityFromRotation(ship.rotation, 400, bullet.body.velocity);
            bulletTime = game.time.now + 200;
        }
    }

}



function screenWrap (spr) {

    if (spr.x < 0)
    {
        spr.x = game.width;
    }
    else if (spr.x > game.width)
    {
        spr.x = 0;
    }

    if (spr.y < 0)
    {
        spr.y = game.height;
    }
    else if (spr.y > game.height)
    {
        spr.y = 0;
    }

}

