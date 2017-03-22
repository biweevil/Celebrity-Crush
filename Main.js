var CCGame = CCGame || {};
 
CCGame.game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, '');
console.info(Phaser);
//CCGame.game.plugins.add(Phaser.ParticleStorm);
CCGame.game.state.add('Boot', CCGame.Boot);
//uncomment these as we create them through the tutorial
CCGame.game.state.add('Preload', CCGame.Preload);
CCGame.game.state.add('MainMenu', CCGame.MainMenu);
CCGame.game.state.add('Game', CCGame.Game);
CCGame.game.state.start('Boot');

