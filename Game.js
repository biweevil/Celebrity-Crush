var CCGame = CCGame || {};
//var celeb;



 
//loading the game assets
CCGame.Game = function(){};
 
CCGame.Game.prototype = {
  
  
  preload: function(){
    this.forceSingleUpdate = true;
    //this.game.plugins.add(Phaser.ParticleStorm);
  },
  
  create: function() {
    
    //particles
   
    ////console.info(CCGame);
    //Game.js vars
    
    //world reference
    this.mapVars = {
      
      mapSize: {
      x: 7820, //7820
      y: 1872  //1872
      },
      groundY: 3600
      
    }
    
    //game states
    
    
    //cannon
    this.cannonRotate = 0;
    this.cannonDirection = 1;
    this.cannonSoundCurrent = 0;
    this.cannonSoundCount = 6;
     
    //celeb texture
    this.celebNum = goodimages.length-1;
    this.currentCeleb = 0;
    
    //worldsetup
    this.world.setBounds(0, this.mapVars.mapSize.y, this.mapVars.mapSize.x, this.mapVars.mapSize.y);
    this.camera.setPosition(0,2500);
    this.camera.setSize(1920,1080);
    
    //background
    
    //physics setup
    this.physics.p2.gravity.y = 600;
    this.physics.p2.restitution = 0.3;
    this.ground = new p2.Body({ mass: 0, position: [ this.physics.p2.pxmi(0), this.physics.p2.pxmi(this.mapVars.groundY) ] });
    this.ground.addShape(new p2.Plane());
    this.physics.p2.world.addBody(this.ground);
    
    //get background
    this.levelBG = this.add.sprite(0, 1887, 'mapBG');
    this.gameMusic = this.add.audio('GameMusic');
    this.gameMusic.play();
    

    //celeb create
    this.celeb = this.add.sprite(82, 400, goodimages[this.currentCeleb]=="playerFace.png"?this.cache.getBitmapData('playerFace'):goodimages[this.currentCeleb].replace('.png','')); //currentCeleb
    this.physics.p2.enable(this.celeb);
    this.celeb.body.mass = 5;
    this.celeb.body.clearShapes();
	  this.celeb.body.loadPolygon('celebHitbox', 'goodCeleb');
	  this.celeb.visible = false;
	  this.celeb.body.onBeginContact.add(celebCollide, this);
	  this.celeb.celebImpact = this.add.audio('celebImpact');
	  this.celeb.canLaunch = true;
    this.celeb.launched = false;
    this.celeb.resetReady = false;
    this.celeb.playerReady = false;
    this.celeb.score = 0;
    this.celeb.emitter = this.add.emitter(this.celeb.body.x,this.celeb.body.y, 20);
    this.celeb.emitter.makeParticles( [ 'smoke' ] );
    
	  celeb = this.celeb;
	  
	  //bad celeb create
	  this.badCelebCollisionGroup = this.physics.p2.createCollisionGroup();
	  this.badCelebs = this.add.group();
	  addBadCeleb(this, 'Hillary Clinton', 2150, 200, false);
	  addBadCeleb(this, 'Jaden Smith', 2800, 0, false);
	  addBadCeleb(this, 'Justin Bieber', 3150, 0, false);
	  addBadCeleb(this, 'Britney Spears', 2000, 1000, false);
	  
	  this.celebNoise = [];
	  for(var i = 0; i<goodsounds.length-1; i++)
	    this.celebNoise.push(this.add.audio(goodimages[i].replace('.png',' Noise')));
	  for(var i = 0; i<badsounds.length-1; i++)
	    this.celebNoise.push(this.add.audio(badimages[i].replace('.png',' Noise')));
	  
	  //cannon
	  this.cannon = this.add.sprite(450, 3400, 'Cannon');
	  this.cannon.anchor.setTo(0,1);
	  this.cannonTimeout = this.time.create(false);
	  this.cannonExplosion = this.add.audio('cannonExplosion');
	  this.cannonResetSound = this.add.audio('cannonResetSound');
	  this.cannonMoveSound = this.add.audio('cannonMoveSound');
	  this.cannonMoveSound.allowMultiple = true;
	  this.cannonMoveSound.addMarker('1', 0, 1.0);
	  this.cannonMoveSound.addMarker('2', 1, 1.0);
	  this.cannonMoveSound.addMarker('3', 2, 1.0);
	  this.cannonMoveSound.addMarker('4', 3, 1.0);
	  this.cannonMoveSound.addMarker('5', 4, 1.0);
	  this.cannonMoveSound.addMarker('6', 5, 1.0);
	  this.cannonMoveSound.addMarker('7', 7, 1.0);
	  
	  //limo
	  this.limo = this.add.sprite(0,3240, 'Limo');
	  //
	  
	  this.barrierCollisionGroup = this.physics.p2.createCollisionGroup();
	  this.barriers = this.add.group();
	  
	  addBarrier(this, 2000, 0, 200, false);
	  addBarrier(this, 2200, 0, 200, false);
	  addBarrier(this, 2400, 0, 200, false);
	  addBarrier(this, 2600, 0, 200, false);
	  addBarrier(this, 2000, 200, 200, false);
	  addBarrier(this, 2000, 400, 200, false);
	  addBarrier(this, 2000, 600, 200, false);
	  addBarrier(this, 2000, 800, 200, false);
	  
	  
	  
	  
	  
	  
	  
	  //HUD
	  this.HUDimage = this.add.image(0,880,'HUDimage');
	  this.HUDimage.fixedToCamera = true;
	  this.playButton = this.add.button(20,20,'pauseButton',pauseGame(this),this,2,1,0);
	  this.playButton.fixedToCamera = true;
	  this.playButton.input.priorityID = 1;
	  this.nextCelebPreview = this.add.sprite(200,975,goodimages[this.currentCeleb]=="playerFace.png"?this.cache.getBitmapData('playerFace'):goodimages[this.currentCeleb].replace('.png',''));
	  this.nextCelebPreview.fixedToCamera = true;
	  this.nextCelebPreview.angle = -20;
	  this.celebPreviewTween = this.add.tween(this.nextCelebPreview).to( { angle: 20 }, 2000, "Sine.easeInOut", true, 0, -1);
	  this.celebPreviewTween.yoyo(true);
	  this.nextCelebPreview.anchor.setTo(0.5,1);
	  this.distanceText = this.game.add.text(1000, 1025, "Distance 0", {
            font: "24px chawp",
            fill: "#FFFFFF"
        });
        //this.add.bitmapText(cannon.x + 400,cannon.y, 'chalk', 'abc', 64);
	  this.distanceText.fixedToCamera = true;
	  this.scoreText = this.game.add.text(1300, 1025, "Score 0", {
            font: "24px chawp",
            fill: "#FFFFFF"
        });
        //this.add.bitmapText(cannon.x + 400,cannon.y, 'chalk', 'abc', 64);
	  this.scoreText.fixedToCamera = true;
	  
  },
  
  update: function() {
    
    ////console.info(this.mapVars.groundY-this.barriers.getChildAt(1).body.y-100);
    
    if(!this.celeb.launched&&this.celeb.canLaunch)
      this.input.onTap.add(onTap, this, 0);
      
    
    updateBadCelebs(this);
      
      
      //pre launch
      if(!this.celeb.launched&&this.celeb.canLaunch){
      moveCannon(this);
      this.cannon.angle = this.cannonRotate*30;
      this.celeb.body.angle = this.cannon.angle+45;
      //cannon.anchor.setTo(1,0);
      this.celeb.body.x = this.cannon.x;
      this.celeb.body.y = this.cannon.y;
      this.celeb.body.static = true;
      //cannon.anchor.setTo(0,1);
      this.camera.follow(this.cannon);
      this.distanceText.setText('Distance 0');
      this.celeb.startingDistance = this.celeb.body.x;
      }
      
      //on launch
      if(this.celeb.launched&&this.celeb.canLaunch){
        this.celeb.canLaunch = false;
        this.celeb.visible = true;
        this.celeb.body.static = false;
        this.celeb.body.angle = this.cannon.angle+45;
        this.celeb.body.thrust(110000); //500000
        ////celeb.body.rotateLeft(5);
        this.camera.follow(this.celeb);
        this.camera.flash(0xffffff, 300);
        this.camera.shake(0.03, 500);
        ////cannonTimeout.add(1000, makeResetReady(), this);
        ////cannonTimeout.start();
        this.cannonExplosion.play();
        this.celebNoise[this.currentCeleb].play();
        this.nextCelebPreview.loadTexture(nextPrevCeleb(this));
        this.celeb.emitter.start(true, 10000);
        ////this.camera.setSize(3840,2160);
      }
      
      this.celeb.emitter.x = this.celeb.x;
      this.celeb.emitter.y = this.celeb.y;
      
      //post launch
      if(this.celeb.launched && !(this.celeb.playerReady && this.celeb.resetReady)){
        this.distanceText.setText("Distance "+Math.floor((this.celeb.body.x-this.celeb.startingDistance)/100));
        this.scoreText.setText("Score "+this.celeb.score);
        
      }
      
      //finished
      if(this.celeb.resetReady && this.celeb.playerReady && this.celeb.body.velocity.x<3 && this.celeb.body.velocity.y<3){
          
          this.celeb.playerReady = false;
          this.celeb.resetReady = false;
          this.celeb.launched = false;
          this.celeb.canLaunch = true;
          this.camera.follow(this.cannon);
          this.cannonTimeout.destroy();
          this.celeb.visible = false;
          this.celeb.loadTexture(nextCeleb(this));
          this.cannonResetSound.play();
      }
      //////////var resetSpeed = 0.01;
      /////if(celeb.body.velocity.x < resetSpeed && celeb.body.velocity.x < resetSpeed){
        
        
        
        
      ////}
      
      
  },
  render: function() {
    //this.debug.cameraInfo(this.camera, 32, 32);
    //this.debug.spriteInfo(cannon, 32, 70);
      
      
  }

};

function addBadCeleb(game, name, x, y, fixed){
    game.badCeleb = game.add.sprite(x, game.mapVars.groundY-75-(y+1), name);
	  
	  game.physics.p2.enable(game.badCeleb);
    game.badCeleb.body.mass = 1;
	  game.badCeleb.body.clearShapes();
	  game.badCeleb.body.loadPolygon('celebHitbox', 'badCeleb');
	  game.badCeleb.fallen = false;
	  game.badCeleb.noise = game.add.audio(name+" Noise");
	  game.badCeleb.body.static = fixed;
	  //celeb.body.collides(badCelebCollisionGroup, hitCeleb, this);

    //  And then add it to the group
    game.badCelebs.add(game.badCeleb);
}

function addBarrier(game, x, y, height, fixed){
    game.barrier = game.add.sprite(x, game.mapVars.groundY-(height/2)-(y+1),'crate');
	  game.physics.p2.enable(game.barrier);
	  game.barrier.body.mass = 1;
	  game.physics.p2.enable(game.barrier);
    game.barrier.body.mass = 1;
    game.barrier.body.static = fixed;
    game.barrier.health = 3;
    game.barriers.add(game.barrier);
    //celeb.body.collides(badCelebCollisionGroup, hitCeleb, this);
}

function updateBadCelebs(game){
    var deadTotal = 0;
    game.badCelebs.forEachAlive(function(celebN) {

        // Update alpha first.
        if(Math.abs(celebN.body.angle)>60 && !celebN.fallen){
          celebN.fallen = true;
          celebN.noise.play();
          celeb.score += 100;
        }
        
        if(celebN.fallen){
          celebN.alpha -= 0.006;
          if(celebN.alpha <= 0){
            celebN.alpha = 0;
            celebN.kill();
          }
        }
        
    });
    
    game.badCelebs.forEachDead(function(celebN, badCelebs, game) {
      deadTotal++;
    });
    
    if(game.badCelebs.length == deadTotal){
      //game.stat
      
    }
    deadTotal = 0;
}

 function celebCollide (body, bodyB, shapeA, shapeB, equation, game) {
   var hardImpact = false;
    if(celeb.body.velocity.x > 120 && celeb.body.velocity.y > 120){
      celeb.celebImpact.play();
      hardImpact = true;
    }
    celeb.playerReady = false;
    celeb.resetReady = true;
    //  The block hit something.
    //  
    //  This callback is sent 5 arguments:
    //  
    //  The Phaser.Physics.P2.Body it is in contact with. *This might be null* if the Body was created directly in the p2 world.
    //  The p2.Body this Body is in contact with.
    //  The Shape from this body that caused the contact.
    //  The Shape from the contact body.
    //  The Contact Equation data array.
    //  
    //  The first argument may be null or not have a sprite property, such as when you hit the world bounds.
    var result
    if (body)
    {
        result = 'You last hit: ' + body.sprite.key;
        if(hardImpact){
          celeb.score += 10;
          if(body.sprite.key == 'crate'){
              body.sprite.damage(1);
              console.info(body.sprite.health);
              celeb.score += 20;
          }
        }
            
        
    }
    else
    {
        result = 'You last hit: The ground :)';
    }
    
}
    

function moveCannon(game) {
      game.cannonRotate += 0.03*game.cannonDirection; //0.02
      if(game.cannonRotate>1){
        game.cannonRotate = 1;
        game.cannonDirection = -1;
        cannonGrind(game);
      }
      if(game.cannonRotate<-1){
        game.cannonRotate = -1;
        game.cannonDirection = 1;
        cannonGrind(game);
      }
    }
    
function cannonGrind(game){
  game.cannonSoundCurrent++;
  game.cannonSoundCurrent = game.cannonSoundCurrent%game.cannonSoundCount;
  game.cannonMoveSound.play(Number(game.cannonSoundCurrent+1));
  
}

function makeResetReady(game) {
  game.resetReady = true;
}
        


function nextCeleb(game){
        var returnCeleb;
        game.currentCeleb++;
        game.currentCeleb = game.currentCeleb%game.celebNum;
        //returnCelb = goodimages[game.currentCeleb].replace('.png','');
        returnCeleb = goodimages[game.currentCeleb]=="playerFace.png"?game.cache.getBitmapData('playerFace'):goodimages[game.currentCeleb].replace('.png','')
        return returnCeleb;
}

function nextPrevCeleb(game){
        var returnCeleb;
        var celebPreview = game.currentCeleb
        celebPreview++;
        celebPreview = celebPreview%game.celebNum;
        //returnCeleb = goodimages[celebPreview].replace('.png','');
        returnCeleb = goodimages[celebPreview]=="playerFace.png"?game.cache.getBitmapData('playerFace'):goodimages[celebPreview].replace('.png','')
        return returnCeleb;
}

function hitCeleb(game){
  
}
    

function onTap(pointer, doubleTap) {

    if (doubleTap)
    {
      

    }
    else
    {
      if(this.celeb.canLaunch){
        this.celeb.launched = true;
        navigator.vibrate(700);
      }
      if(!this.celeb.playerReady)
        this.celeb.playerReady = true;
    }

}

  var pauseGame = function(game){
      this.paused = true;
      $("dom-goodimages").focus();
      }