var CCGame = CCGame || {};
var game;
var sprite;
 
//loading the game assets
CCGame.picCapture = function(){};
 
CCGame.picCapture.prototype = {
  preload: function() {
    game = this.game;
  	//show logo in loading screen
  	this.game.stage.backgroundColor = '#000';
  	
  },
  create: function() {
    
    //  No properties at all means we'll create a video stream from a webcam
    video = game.add.video();

    //  If access to the camera is allowed
    video.onAccess.add(camAllowed, this);
    video.onError.add(camBlocked, this);

    //  If access to the camera is denied
    //video.onError.add(camBlocked, this);

    //  Start the stream
    video.startMediaStream();
    
    bmd = game.add.bitmapData(100, 150);
    
    bmd.addToWorld();
    sprite2 = game.add.image(1000,500,bmd);
    },
    
  update: function() {
    
  bmd.copy(sprite,250,100,200,300,null,null,100,150);
  bmd.update();
  bmd.alphaMask(bmd,'alphaMaskPng');
  bmd.update();
  sprite2.loadTexture(bmd);
  }

  
  
};

function camAllowed(video) {

    console.log('--> camera was allowed', video);

    sprite = video.addToWorld();
    //sprite.x = -200;
    


    //game.input.onDown.add(stopCam, this);

}

function camBlocked(video, error) {

    console.log('camera was blocked', video, error);

}

function stopCam() {

    console.log('camera stopped');

    video.stop();

}
