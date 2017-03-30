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
 
    this.load.tilemap('testlevel', '../../Assets/testlevel.json', null, Phaser.Tilemap.TILED_JSON);
 
    this.load.image('gameTiles', '../../Assets/Spritesheets and Tilesets/ci-fi/tileset1.png');
 
    this.load.spritesheet('player', '../../Assets/images/Players/Swordsman/Animations/Idle/Idle - Sprite Sheet.png', 540, 520);
 
    this.load.image('saw', '../../Assets/Spritesheets and Tilesets/ci-fi/Objects/Saw.png');
 
 
  },
 
  create: function() {
    this.state.start('Game');
 
  }
 
};