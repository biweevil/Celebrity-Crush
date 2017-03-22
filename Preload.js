var CCGame = CCGame || {};
 
//loading the game assets
CCGame.Preload = function(){};
 
CCGame.Preload.prototype = {
  preload: function() {
  	//show logo in loading screen
  	
  	this.game.stage.backgroundColor = '#800';
  	this.splash = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
    this.splash.anchor.setTo(0.5);
 
    this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 128, 'preloadbar');
    this.preloadBar.anchor.setTo(0.5);
 
    this.load.setPreloadSprite(this.preloadBar);
 
  	//load game assets***********
    //*
    //*
      //font
      this.load.bitmapFont('chalk', 'Game Assets/fonts/chalk/chalk1.png', 'Game Assets/fonts/chalk/chalk1.fnt');
    	
      //menu assets
        this.load.image('MenuBG','Game Assets/Main Menu/menuHD.png');
        this.load.image('MenuPlay','Game Assets/Main Menu/play button.png');
        this.load.audio('MenuMusic','Game Assets/Main Menu/Funk theme.ogg');
        
      //HUD assets
      this.load.image('HUDimage','Game Assets/HUD/HUDimage.png');
      this.load.image('pauseButton','Game Assets/HUD/pauseButton.png');
        
      //map assets
      this.load.image('mapBG','Game Assets/Map/bg.png');
      this.load.image('Cannon','Game Assets/Map/Cannon.png');
      this.load.image('smoke','Game Assets/Map/cannonSmoke.png');
      this.load.audio('cannonExplosion','Game Assets/Map/cannonLaunch.ogg');
      this.load.audio('cannonResetSound','Game Assets/Map/cannonReset.ogg');
      this.load.audio('cannonMoveSound','Game Assets/Map/cannonMoveSound.ogg');
      this.load.image('Limo','Game Assets/Map/LimoTrunk.png');
      this.load.image('crate','Game Assets/Map/crate.png')
      this.load.audio('GameMusic','Game Assets/Map/Jazz theme.ogg');
      this.load.audio('celebImpact','Game Assets/Map/hit.ogg');
      
      //face
      this.load.image('alphaMaskPng','Game Assets/Face/alphaMask.png');
        
      //physics assets
      this.load.physics('celebHitbox', 'Game Assets/Physics Files/celebHitbox.json');
      //celebs
      for(var i = 0; i < goodimages.length-1; i++)
          loadGoodCeleb(goodimages[i], this);
          
      for(var i = 0; i < badimages.length-1; i++)
          loadBadCeleb(badimages[i], this);
      
      function loadGoodCeleb(filename, game){
        var celebname = filename.replace('.png','');
        game.load.image(celebname,'Game Assets/GoodCelebrities/Images/'+filename);
        filename = filename.replace('.png','.ogg');
        game.load.audio(celebname+' Noise','Game Assets/GoodCelebrities/Sounds/'+filename);
      }
      
      function loadBadCeleb(filename, game){
        var celebname = filename.replace('.png','');
        game.load.image(celebname,'Game Assets/BadCelebrities/Images/'+filename);
        filename = filename.replace('.png','.ogg');
        game.load.audio(celebname+' Noise','Game Assets/BadCelebrities/Sounds/'+filename);
      }
    
    
  },
  create: function() {
  	this.state.start('MainMenu');
  }
};