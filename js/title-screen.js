class TitleScene extends Phaser.Scene {
    
    constructor() 
    {
        super({ key: 'TitleScene' });         
    }
    
    preload()
    {
        this.load.image('space-bg', 'assets/images/space2.jpg');
        this.load.audio('title-music', 'assets/music/ES_SnowyHouseGunnar Johnsen.mp3');
        this.load.image('cat', 'assets/images/katt2.png');
        
        this.timeToFlashText = 700;
    }

    create()
    {
        this.cursors = this.input.keyboard.createCursorKeys();        
        this.add.image(0, 0, 'space-bg');
        
        //Add cat image
        this.cursors = this.input.keyboard.createCursorKeys();        
        this.add.image(300, 420, 'cat');
        //End add cat image
        
        
        this.music = this.sound.add('title-music');
        this.music.volume = 0.3;
        this.music.play();
        this.music.loop = true;
        
        let centerX = this.game.config.width / 2;
        
        this.titleText = this.add.text(centerX, 150, 'Laser Cat Attack', { fontSize: '40px', fill: '#fff' });
        this.titleText.setOrigin(0.5);       // Center Text
        
        //try to create text
        this.Text = this.add.text(centerX, 240, 'Space = Shoot   Arrows = Move', { fontSize: '16px', fill: '#fff' });
        this.Text.setOrigin(0.5);       // Center Text
        //try to create text end
        
        
        
        
        this.clickStartText = this.add.text(centerX, this.game.config.height - 100, 'Click Anywhere or press Space to Start', { fontSize: '16px', fill: '#fff' });
        this.clickStartText.setOrigin(0.5);
        
        this.input.on('pointerdown', function (pointer) {
            this.startGame();
        }, this);
        

    }

    update(time, delta)
    {
        if (this.cursors.space.isDown) { 
            this.startGame();
        }
        
        this.timeToFlashText -= delta;
        
        if ( this.timeToFlashText < 0 ) {
            this.clickStartText.visible = !this.clickStartText.visible;
            this.timeToFlashText = 700;
        }
    }
        
    startGame()
    {
        this.scene.start("MainGameScene");
        this.music.stop();        
    }
}