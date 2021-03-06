var mainState = {
    preload: function() {
        game.load.image('player', 'assets/player.png');
        game.load.image('wallV', 'assets/wallVertical.png');
        game.load.image('wallH', 'assets/wallHorizontal.png');
    },

    create: function() { 
        
        //1. Change the background color of the game
        game.stage.backgroundColor = '#3498db';
        
        //2. Tell phaser we are going to use arcade physics for this game
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        //3. Crisper images when using pixel art
        game.renderer.renderSession.roundPixels = true;
        
        // Create a local variable with 'var player'
        //this.player = game.add.sprite(250, 170, 'player');
        
        this.player = game.add.sprite(game.width/2, game.height/2, 'player');
        
        /**
         * Manipulating the anchor position of the added player, eventually 
         * we decide on centering it.
         */
        // Set the anchor point to the top left of the sprite (default value)
        this.player.anchor.setTo(0, 0);
        // Set the anchor point to the top right
        this.player.anchor.setTo(1, 0);
        // Set the anchor point to the bottom left
        this.player.anchor.setTo(0, 1);
        // Set the anchor point to the bottom right
        this.player.anchor.setTo(1, 1);
        
        this.player.anchor.setTo(0.5, 0.5);
        
        // Tell Phaser that the player will use the Arcade physics engine
        game.physics.arcade.enable(this.player);
        // Add vertical gravity to the player
        this.player.body.gravity.y = 500;
        
        this.cursor = game.input.keyboard.createCursorKeys();
        
        this.createWorld();

    },
    createWorld: function() {
        // Create our group with Arcade physics
        this.walls = game.add.group();
        this.walls.enableBody = true;
        // Create the 10 walls in the group
        game.add.sprite(0, 0, 'wallV', 0, this.walls); // Left
        game.add.sprite(480, 0, 'wallV', 0, this.walls); // Right
        game.add.sprite(0, 0, 'wallH', 0, this.walls); // Top left
        game.add.sprite(300, 0, 'wallH', 0, this.walls); // Top right
        game.add.sprite(0, 320, 'wallH', 0, this.walls); // Bottom left
        game.add.sprite(300, 320, 'wallH', 0, this.walls); // Bottom right
        game.add.sprite(-100, 160, 'wallH', 0, this.walls); // Middle left
        game.add.sprite(400, 160, 'wallH', 0, this.walls); // Middle right
        var middleTop = game.add.sprite(100, 80, 'wallH', 0, this.walls);
        middleTop.scale.setTo(1.5, 1);
        var middleBottom = game.add.sprite(100, 240, 'wallH', 0 , this.walls);
        middleBottom.scale.setTo(1.5, 1);
        // Set all the walls to be immovable
        this.walls.setAll('body.immovable', true);
    },

    update: function() {
        // Tell Phaser that the player and the walls should collide
        game.physics.arcade.collide(this.player, this.walls);
        
        // We have to use 'this.' to call a function from our state
        this.movePlayer();
        
        if (!this.player.inWorld) {
            this.playerDie();
        }
    },
    
    movePlayer: function() {
        // If the left arrow key is pressed
        if (this.cursor.left.isDown) {
            // Move the player to the left
            // The velocity is in pixels per second
            this.player.body.velocity.x = -200;
        }
        // If the right arrow key is pressed
        else if (this.cursor.right.isDown) {
            // Move the player to the right
            this.player.body.velocity.x = 200;
        }
        // If neither the right or left arrow key is pressed
        else {
            // Stop the player
            this.player.body.velocity.x = 0;
        }
        // If the up arrow key is pressed and the player is on the ground
        if (this.cursor.up.isDown && this.player.body.touching.down) {
            // Move the player upward (jump)
            this.player.body.velocity.y = -320;
        }
    },
    playerDie: function() {
        game.state.start('main');
    }
};

var game = new Phaser.Game(500, 340, Phaser.AUTO, 'gameDiv');
game.state.add('main', mainState);
game.state.start('main');