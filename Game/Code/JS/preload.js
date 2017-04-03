var phinalphase = phinalphase || {};
 
//loading the game assets
 
phinalphase.Preload = function(){};
 
phinalphase.Preload.prototype = {
 
  preload: function() {
    //show loading screen
 
    this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'preloadbar');
 
    this.preloadBar.anchor.setTo(0.5);
 
    this.load.setPreloadSprite(this.preloadBar);
 
    //load game assets
 
    this.load.tilemap('testlevel', '../../Assets/levels/test/forest1.json', null, Phaser.Tilemap.TILED_JSON);
 
    this.load.image('gameTiles', '../../Assets/levels/test/tileset.png');

 
    this.load.atlas('playerNinja', '../../Assets/images/Players/Swordsman/hero1.png', '../../Assets/images/Players/Swordsman/hero1.json');
 
    this.load.image('saw', '../../Assets/Spritesheets and Tilesets/ci-fi/Objects/Saw.png');

    this.load.image('mushroom', '../../Assets/Spritesheets and Tilesets/forest/Object/Mushroom_1.png');
 
 
  },
 
  create: function() {
    this.state.start('Game');
 
  }
 
};