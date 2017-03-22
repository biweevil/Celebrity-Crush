

var CCGame = CCGame || {};
 
CCGame.Boot = function(){};
 
//setting game and loading the assets for the loading screen
CCGame.Boot.prototype = {
  preload: function() {
  	//assets for loading screen
    this.load.image('logo', 'Game Assets/loading/logo.svg');
    this.load.image('preloadbar', 'Game Assets/loading/preloader-bar.jpg');
    
    
  },
  create: function() {
  	//loading screen will have a white background
  this.game.stage.backgroundColor = '#000';
 
    //scaling options

	

	this.scale.setGameSize(1920, 1080);

	
	this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;

	
	//have the game centered horizontally
	this.scale.pageAlignHorizontally = true;
	
 
	//screen size will be set automatically
	//this.scale.setScreenSize(true);
 
	//physics system for movement
	this.physics.startSystem(Phaser.Physics.P2JS);
    
    this.state.start('Preload');
  }
};