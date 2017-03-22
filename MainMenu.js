var CCGame = CCGame || {};
var game;
 
//loading the game assets
CCGame.MainMenu = function(){};
 
CCGame.MainMenu.prototype = {
  preload: function() {
  	//show logo in loading screen
  	this.game.stage.backgroundColor = '#000';
  	
  },
  create: function() {
    
    game = this;
    this.backgroundSP = this.add.sprite(-50, 0, 'MenuBG');
    this.backgroundSP.anchor.setTo(0);
    this.add.tween(this.backgroundSP).to( { x: 100 }, 10000, "Sine.easeInOut", true, false, -1, true);
    
    this.playButton = this.add.button(800,200,'MenuPlay',onPlayButtonPress,this,2,1,0);
    
    this.menuMusic = this.add.audio('MenuMusic');
    this.menuMusic.play();
    
    
      //  No properties at all means we'll create a video stream from a webcam
    this.video = game.add.video(50,50);

    //  If access to the camera is allowed
    this.video.onAccess.add(camAllowed, this);
    this.video.onError.add(camBlocked, this);

    //  If access to the camera is denied
    //video.onError.add(camBlocked, this);

    //  Start the stream
    this.video.startMediaStream();
    
    this.bmd = game.add.bitmapData(100, 150);
    
    this.bmd.addToWorld();
    this.sprite2 = game.add.image(1000,500,this.bmd);
    
    
    
    },
    
  update: function() {
    
    this.bmd.copy(this.sprite,250,100,200,300,null,null,100,150);
    this.bmd.update();
    this.bmd.alphaMask(this.bmd,'alphaMaskPng');
    this.bmd.update();
    this.sprite2.loadTexture(this.bmd);
  }

  
  
};


function camAllowed(video) {

    console.log('--> camera was allowed', video);

    game.sprite = game.video.addToWorld();
    //sprite.x = -200;
    


    //game.input.onDown.add(stopCam, this);

}

  
  var onPlayButtonPress = function(){
      this.cache.addBitmapData('playerFace', this.bmd);
      goodimages.unshift('playerFace.png');
      goodsounds.unshift('playerFace.ogg');
      this.menuMusic.destroy();
      this.state.start('Game');
      }
