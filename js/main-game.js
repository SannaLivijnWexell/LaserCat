const playerShipSpeed = 500;

class MainGameScene extends Phaser.Scene {
    
    constructor() 
    {
        super({key: "MainGameScene"}); 
    }
    
    preload()
    {
        this.load.image('player-ship', 'assets/images/katt2.png');
        this.load.image('hamburger-medium', 'assets/images/hamburger.png');
        this.load.image('pizza-medium', 'assets/images/pizza.png');
        this.load.image('taco-medium', 'assets/images/taco.png');        
        this.load.image('space2', 'assets/images/space2.jpg')
        this.load.image('bullet', 'assets/images/bullet-simple.png');
        
        this.load.audio('gamemusic','assets/music/maingame.mp3');
        
        
        this.load.audio('player_fire_01', 'assets/audio/player_fire_01.mp3');
        this.load.audio('player_fire_02', 'assets/audio/player_fire_02.mp3');
        this.load.audio('player_fire_03', 'assets/audio/player_fire_03.mp3');
        this.load.audio('player_fire_04', 'assets/audio/player_fire_04.mp3');
        this.load.audio('player_fire_05', 'assets/audio/player_fire_05.mp3');
        this.load.audio('player_fire_06', 'assets/audio/player_fire_06.mp3');
        
        this.load.audio('fire-bullet', 'assets/audio/player_fire_01.mp3');
        
        //Add more code here
    }
    
     

    create()
    {
        this.cursors = this.input.keyboard.createCursorKeys();            
        this.asteroidGroup = this.add.group();
        this.bulletGroup = this.add.group();

        this.add.image(0, 0, 'space2');
        this.createPlayerShip();
        this.createAsteroid(); 
        
        this.music = this.sound.add('gamemusic');
        this.music.play();
        this.music.loop = true;
        
        //Create an astroid timer
        this.asteroidTimer = 2000;
        
        this.bulletGroup = this.add.group();
        
        this.bulletTimer = 0;
        
        this.playerScore = 0;
        
        // You probably want to add two labels at this point, one fixed label which just says “SCORE” and a second label to contain the actual value of the player’s score. Then it’s super easy to update the player’s score when it changes - as you just have to update the scoreValue label instead of the scoreTitle label.
        
        var textStyle = {font: "16px Arial", fill: "#ffffff", align: "center"}

        this.scoreTitle = this.add.text(50, 30, "SCORE", textStyle);
        this.scoreTitle.fixedToCamera = true;
        this.scoreTitle.setOrigin(0.5, 0.5);

        this.scoreValue = this.add.text(50, 60, "0", textStyle);
        this.scoreValue.fixedToCamera = true;
        this.scoreValue.setOrigin(0.5, 0.5);
        
        this.playerScore = 0;
        
        // Maybe you could remove 1 point every time an asteroid disappears off the bottom of the screen so that the player feels some pressure to stop asteroids from disappearing off the bottom of the screen.
     
        


         
        // Players lives
        this.playerLives = 3;
        
        // 2. Add the Text
        //Refer back to the previous lesson on adding labels to the screen. You will probably want to add the title label ‘LIVES’ and then a separate label containing the number of lives the user has remaining.

        var textStyle = {font: "16px Arial", fill: "#ffffff", align: "center"}

        this.playerLives = 3;     

        this.livesTitle = this.add.text(this.game.config.width - 50, 30, "LIVES", textStyle);
        this.livesTitle.fixedToCamera = true;
        this.livesTitle.setOrigin(0.5, 0.5);

        this.livesValue = this.add.text(this.game.config.width - 50, 60, this.playerLives, textStyle);
        this.livesValue.fixedToCamera = true;
        this.livesValue.setOrigin(0.5, 0.5);

        
        // 3. React to Collisions
        
        
        
        var displayOptions = {
            font: "16px Arial", 
            fill: "#ffffff", 
            align: "center"
        }
        
        
        
        this.playerFireSfx = [];
        this.playerFireSfx.push(this.sound.add("player_fire_01"));
        this.playerFireSfx.push(this.sound.add("player_fire_02"));
        this.playerFireSfx.push(this.sound.add("player_fire_03"));
        this.playerFireSfx.push(this.sound.add("player_fire_04"));
        this.playerFireSfx.push(this.sound.add("player_fire_05"));
        this.playerFireSfx.push(this.sound.add("player_fire_06"));

        this.fireSound = this.sound.add('fire-bullet');
        
        
        
        
        
        
        //Add more code here
    }

    update(time, delta)
    {
        if (this.cursors.right.isDown) {
            this.playerShip.setVelocityX(playerShipSpeed); 
        }
        else if (this.cursors.left.isDown) {
            this.playerShip.setVelocityX(-playerShipSpeed);
        }
        
        else {
            this.playerShip.setVelocityX(0);
        }
        
        if (this.cursors.up.isDown) {
        this.playerShip.setVelocityY(-playerShipSpeed);
        }
        
        else if (this.cursors.down.isDown) {
        this.playerShip.setVelocityY(playerShipSpeed);
        }
        
        else {
            this.playerShip.setVelocityY(0);
        }
        
        //Count down the time
        this.asteroidTimer -= delta;
        
        if ( this.asteroidTimer < 0 ) {
            this.createAsteroid();
            this.asteroidTimer = 2000;
        }
        
        if (this.cursors.space.isDown) {
            console.log("Fire Bullet!");
        }
        
        /// NEW MESSY TEXT
        if (this.cursors.space.isDown) {
            this.fireBullet();
        }   
        
        let bullets = this.bulletGroup.getChildren();

        for(let i = 0; i < bullets.length; i++) {
            let bullet = bullets[i];
        
        if ( bullet.y < 0 ) {
            bullet.destroy();
            }    
        }    
        
        
        
        
        this.bulletTimer -= delta; 
        
        
        // Collide
        this.physics.overlap(this.asteroidGroup, this.bulletGroup, this.onAsteroidBulletCollision, null, this);
        this.physics.overlap(this.asteroidGroup, this.playerShip, this.onAsteroidPlayerCollision, null, this);
    }

        onAsteroidBulletCollision(asteroid, bullet) {
            asteroid.destroy();
            bullet.destroy();
            
            this.playerScore += 5;        
            this.scoreValue.setText(this.playerScore);
        }
            
            
            //Show the Game Over Screen
        onAsteroidPlayerCollision(asteroid, player) {
            asteroid.destroy();
            this.playerLives -= 1;
            this.livesValue.setText(this.playerLives);

            if ( this.playerLives <= 0 ) {
                lastGameScore = this.playerScore;
                this.scene.start("GameOverScene");        
            }
        }
            


           
            
        // Maybe you could remove 1 point every time an asteroid disappears off the bottom of the screen so that the player feels some pressure to stop asteroids from disappearing off the bottom of the screen.    
        // ????       

            
        
        
            
            
            
        //React to collisions between player and food/asteroid - loose lives
//        onAsteroidPlayerCollision(asteroid, player) {
//            asteroid.destroy();
//            this.playerLives -= 1;
//            this.livesValue.setText(this.playerLives);
//        }
    
    
    
    
    
    
    
    

fireBullet() {
    if ( this.bulletTimer < 0 ) {
        let x = this.playerShip.x;
        let y = this.playerShip.y;

        let bullet = this.physics.add.image(x, y, 'bullet');
        bullet.setVelocity(0, -800);

        this.bulletGroup.add(bullet);
        this.bulletTimer = 300; // 300 ms
        
        this.fireSound.play();
        
        
//        var index = game.rnd.integerInRange(0, this.playerFireSfx.length - 1);
//        this.playerFireSfx[index].play();
        
        
    }
    //END MESSY TEXT
     
    
    }
    
    createPlayerShip()
    {
        let startX = game.config.width / 2;
        let startY = game.config.height - 50;
        
        this.playerShip = this.physics.add.image(startX, startY, 'player-ship');   
        this.playerShip.setImmovable();
        
        //Makes it stay in the area
        this.playerShip.setCollideWorldBounds(true); 
        
        
    }
    
    createAsteroid() 
    {
        
        let x = Phaser.Math.RND.between(50, 550);// 100;
        let y = 50;
        
        let graphic = 'hamburger-medium'
        let diceroll = Phaser.Math.RND.between(1, 3);// 100;
        
        if (diceroll === 1)
            graphic = "taco-medium"

        if (diceroll === 2)
            graphic = "pizza-medium"
        

        let asteroid = this.physics.add.image(x, y, graphic);
        
        // EXISTING CODE
        asteroid.setVelocity(0, 500);
        
        this.asteroidGroup.add(asteroid);
        
        asteroid.setAngularVelocity(180.0);
        
    }    

}