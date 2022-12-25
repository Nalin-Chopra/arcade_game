WebFontConfig = {
    active: function() { newGame.time.events.add(Phaser.Timer.SECOND, initializeText, this);},
    google: {
      families: ['Indie Flower']
    }
};

var loadingScreenText = null;
var totalScore = 0;
var highScore = 0;

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function preloadWebFont() {
    newGame.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
}

function initializeText() {
  loadingScreenText.text = "";
  var startGameFunc = function() {
    newGame.state.start('MainState');
  }

  var creditsFunc = function() {
    newGame.state.start('CreditState');
  }

  var button1 = newGame.add.button(newGame.world.centerX - 135, newGame.world.centerY + 190, 'button1', startGameFunc);
  button1.anchor.setTo(0.5);

  var button2 = newGame.add.button(newGame.world.centerX + 135, newGame.world.centerY + 190, 'button1', creditsFunc);
  button2.anchor.setTo(0.5);

  var titleTextPt1 = newGame.add.text(newGame.world.centerX, newGame.world.centerY - 230, "MYSTERIES OF DA",
      {font: "60px indie", fill: "#ffffff"});
  var titleTextPt2 = newGame.add.text(newGame.world.centerX, newGame.world.centerY - 150, "CHONK",
      {font: "110px indie", fill: "#ffffff"});
  var playButton = newGame.add.text(newGame.world.centerX - 135, newGame.world.centerY + 190, "PLAY",
      {font: "60px indie", fill: "#ffffff"});

  var creditsButton = newGame.add.text(newGame.world.centerX + 135, newGame.world.centerY + 190, "CREDITS",
      {font: "60px indie", fill: "#ffffff"});

  titleTextPt1.anchor.setTo(0.5);
  titleTextPt2.anchor.setTo(0.5);
  playButton.anchor.setTo(0.5);
  creditsButton.anchor.setTo(0.5);
}

var CreditState = {
  init: function() {
    newGame.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    newGame.scale.pageAlignHorizontally = true;
    newGame.scale.pageAlignVertically = true;
  },

  preload: function() {
    this.background = newGame.add.sprite(270, 350, 'background');
    this.background.anchor.setTo(0.5);
  },

  create: function() {
    var backButton = newGame.add.button(newGame.world.centerX, newGame.world.centerY + 150, 'button1', this.goHome);
    backButton.anchor.setTo(0.5);
    var backButtonText = newGame.add.text(newGame.world.centerX, newGame.world.centerY + 150, "BACK",
        {font: "50px indie", fill: "#ffffff"});
    backButtonText.anchor.setTo(0.5);    
  },

  goHome: function() {
    newGame.state.start('HomeState');
  }
}

var BootState = {
  init: function() {
    newGame.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    newGame.scale.pageAlignHorizontally = true;
    newGame.scale.pageAlignVertically = true;
  },

  preload: function() {
    newGame.load.image('loading_bar', 'assets/images/loading_bar.jpg');
    newGame.load.image('bigplanet', 'assets/images/glasses_chonk.jpg');
    newGame.load.image('background', 'assets/images/home_background.jpg');
  },

  create: function() {
    newGame.state.start('PreloadState');
  },
}


var PreloadState = {
  init: function() {
    newGame.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    newGame.scale.pageAlignHorizontally = true;
    newGame.scale.pageAlignVertically = true;
  },

  preload: function() {
    newGame.load.audio('jump', 'assets/sounds/jump.wav');
    newGame.load.audio('end_of_game', 'assets/sounds/end_of_game.wav');
    newGame.load.image('purple_pipe', 'assets/images/platform.png');
    newGame.load.image('yellow_star', 'assets/images/yellow_star_final.png');
    newGame.load.image('doodle_jumper', 'assets/images/doodler-guy.png');
    newGame.load.image('platform', 'assets/images/platform.png');
    newGame.load.image('button1', 'assets/images/button1.png');

    this.background = newGame.add.sprite(270, 350, 'background');
    this.background.anchor.setTo(0.5);

    this.mainPic = newGame.add.sprite(newGame.world.centerX, newGame.world.centerY - 25, 'main_pic');
    this.mainPic.anchor.setTo(0.5);

    this.loadingBar = newGame.add.sprite(newGame.world.centerX, newGame.world.centerY + 175, 'loading_bar');
    this.loadingBar.anchor.setTo(0.5);

    newGame.load.setPreloadSprite(this.loadingBar);
  },

  create: function() {
    newGame.state.start('HomeState');
  },
}

var HomeState = {
  preload: function() {
    preloadWebFont();
  },
  create: function() {
    this.background = newGame.add.sprite(270, 350, 'background');
    this.background.anchor.setTo(0.5);
    loadingScreenText = newGame.add.text(newGame.world.centerX, newGame.world.centerY + 50, "Loading...",
        {font: "60px indie", fill: "#ffffff"});
    loadingScreenText.anchor.setTo(0.5);
  }
}

var MainState = {

    create: function() {
      // this.background = newGame.add.sprite(270, 350, 'background');
      this.stage.backgroundColor = '#11d6c8';
      // this.background.anchor.setTo(0.5);
      this.score = 0;
      this.scoreMultiplier = 1;
      this.speedBoost = 1;
      this.boostActivated = false;
      // this.boostTimer = new Timer(newGame);
      this.scoreText = newGame.add.text(newGame.world.centerX, newGame.world.centerY - 225, "0",
                  { font: "90px indie", fill: "#ffffff" , position: "sticky"});

      // newGame.stage.backgroundColor = '#71c5cf'
      this.jumpingNoise = newGame.add.audio('jump');
      this.endOfGame = newGame.add.audio('end_of_game');
      // this.stars = newGame.add.group();
      // this.jumper = newGame.add.sprite(100, 245, 'doodle_jumper');

      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.scale.maxWidth = newGame.width;
      this.scale.maxHeight = newGame.height;
      this.scale.pageAlignHorizontally = true;
      this.scale.pageAlignVertically = true;


      this.physics.startSystem( Phaser.Physics.ARCADE );

      this.cameraYMin = 99999;
      this.platformYMin = 99999;

      this.createAllPlatforms();
      this.createJumper();
      this.stars = newGame.add.group();
      this.cursor = this.input.keyboard.createCursorKeys();
      newGame.world.bringToTop(this.scoreText);

    },

    update: function() {
      newGame.world.setBounds( 0, -this.jumper.yChange, newGame.world.width, newGame.height + this.jumper.yChange );
      this.cameraYMin = Math.min( this.cameraYMin, this.jumper.y - newGame.height + 160 );
      this.camera.y = this.cameraYMin;
      this.physics.arcade.collide( this.jumper, this.platforms );
      this.jumperMove();
      newGame.world.bringToTop(this.scoreText);

      if (this.stars != null) {
        newGame.physics.arcade.overlap(this.jumper, this.stars, this.gotStar, null, this);
      }

      this.platforms.forEachAlive( function( elem ) {
        this.platformYMin = Math.min( this.platformYMin, elem.y );
        if( elem.y > this.camera.y + newGame.height ) {
          elem.kill();
          this.createSinglePlatform(getRandomInt( 0, newGame.world.width - 50 ), this.platformYMin - 100, 1.5 );
        }
      }, this );


    },

    createJumper: function() {
      this.jumper = newGame.add.sprite( newGame.world.centerX, newGame.world.height - 75, 'doodle_jumper');
      this.jumper.anchor.set( 0.5 );
      this.jumper.yOrig = this.jumper.y;
      this.jumper.yChange = 0;
      this.physics.arcade.enable( this.jumper );
      this.jumper.body.gravity.y = 500;
      this.jumper.body.checkCollision.up = false;
      this.jumper.body.checkCollision.left = false;
      this.jumper.body.checkCollision.right = false;
    },

    jumperMove: function() {

      if( this.cursor.left.isDown ) {
        this.jumper.body.velocity.x = -300;
      } else if( this.cursor.right.isDown ) {
        this.jumper.body.velocity.x = 300;
      } else {
        this.jumper.body.velocity.x = 0;
      }

      if( this.cursor.up.isDown && this.jumper.body.touching.down ) {
        this.updateScore();
        
        this.jumper.body.velocity.y = -500 * this.speedBoost;
        this.jumpingNoise.play();
        this.scoreText.y =  this.jumper.y - this.jumper.yOrig + 35
        // console.log("scoretext.y", this.scoreText.y)
        // console.log("jumper.y", this.jumper.Y)
        // console.log("jumper.y orig", this.jumper.yOrig)
      } 
      
      this.world.wrap( this.jumper, this.jumper.width / 2, false );
      this.jumper.yChange = Math.max( this.jumper.yChange, Math.abs( this.jumper.y - this.jumper.yOrig ) );
      
      if( this.jumper.y > this.cameraYMin + newGame.height && this.jumper.alive ) {
        this.gameOver();
      }
    },

    createAllPlatforms: function() {
      this.platforms = newGame.add.group();
      this.platforms.enableBody = true;
      this.platforms.createMultiple(10, 'platform');
      this.createSinglePlatform( -16, this.world.height - 16, this.world.width + 16 );
      for( var i = 0; i < 6; i++ ) {
        this.createSinglePlatform( getRandomInt(100, newGame.world.width - 100), this.world.height - 100 - 100 * i, 1.5);
      }
    },

    createSinglePlatform: function(x, y, width) {
      var platform = this.platforms.getFirstDead();
      platform.reset( x, y );
      platform.scale.x = width;
      platform.scale.y = 1;
      platform.body.immovable = true;
      if (getRandomInt(0, 5) === 1 && this.stars != null && this.boostActivated !== true) {
        this.addStar(x, y + 20);
      }

    },

    addStar: function(x, y) {
      var newStar = newGame.add.sprite(x, y, 'yellow_star');
      this.stars.add(newStar);

      newGame.physics.arcade.enable(newStar);
    },

    gotStar: function(jumper, star) {
      this.scoreMultiplier *= 2
      this.speedBoost = 1.25
      this.stars.remove(star);
    },

    updateScore: function() {
      var scoreMultiplier = this.scoreMultiplier;
      this.score += scoreMultiplier;
      this.scoreText.text = this.score;
    },


    gameOver: function() {
      totalScore = this.score;
      highScore = Math.max(this.score, highScore);
      this.endOfGame.play();
      newGame.state.start('GameOverState');
    },
    shutdown: function() {
      this.world.setBounds( 0, 0, newGame.width, newGame.height );
      this.cursor = null;
      this.jumper.destroy();
      this.jumper = null;
      this.platforms.destroy();
      this.platforms = null;
    },
};



var GameOverState = {

  create: function() {
    this.background = newGame.add.sprite(270, 350, 'background');
    this.background.anchor.setTo(0.5);

    gameOverText = newGame.add.text(newGame.world.centerX, newGame.world.centerY - 180, "GAME OVER",
          {font: "90px indie", fill: "#ffffff"});
    gameOverText.anchor.setTo(0.5);

    yourScoreText = newGame.add.text(newGame.world.centerX - 120, newGame.world.centerY - 55, "Your Score",
          {font: "40px indie", fill: "#ffffff"});
    yourScoreText.anchor.setTo(0.5);

    scoreText = newGame.add.text(newGame.world.centerX - 120, newGame.world.centerY - 5, totalScore,
          {font: "50px indie", fill: "#ffffff"});
    scoreText.anchor.setTo(0.5);

    yourHighScoreText = newGame.add.text(newGame.world.centerX + 120, newGame.world.centerY - 55, "High Score",
          {font: "40px indie", fill: "#ffffff"});
    yourHighScoreText.anchor.setTo(0.5);

    highScoreText = newGame.add.text(newGame.world.centerX + 120, newGame.world.centerY - 5, highScore,
          {font: "50px indie", fill: "#ffffff"});
    highScoreText.anchor.setTo(0.5);

    this.playButton = newGame.add.button(newGame.world.centerX - 140, newGame.world.centerY + 135, 'button1', this.startGame, this);
    this.playButton.anchor.setTo(0.5);
    var playButtonText = newGame.add.text(newGame.world.centerX - 140, newGame.world.centerY + 135, 'PLAY',
          {font: "45px indie", fill: "#ffffff"});
    playButtonText.anchor.setTo(0.5);

    this.homeButton = newGame.add.button(newGame.world.centerX + 140, newGame.world.centerY + 135, 'button1', this.goHome, this);
    this.homeButton.anchor.setTo(0.5);
    var homeButtonText = newGame.add.text(newGame.world.centerX + 140, newGame.world.centerY + 135, 'HOME',
          {font: "45px indie", fill: "#ffffff"});
    homeButtonText.anchor.setTo(0.5);
  },

  startGame: function() {
    newGame.state.start('MainState');
  },

  goHome: function() {
    newGame.state.start('HomeState');
  }
}

var newGame = new Phaser.Game(700, 700, Phaser.CANVAS, "");

newGame.state.add('MainState', MainState);
newGame.state.add('HomeState', HomeState);
newGame.state.add('BootState', BootState);
newGame.state.add('PreloadState', PreloadState);
newGame.state.add('GameOverState', GameOverState);
newGame.state.add('CreditState', CreditState);

newGame.state.start('BootState');
