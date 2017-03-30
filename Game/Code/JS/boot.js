var phinalphase = phinalphase || {};
 
phinalphase.Boot = function(){};
 
 
phinalphase.Boot.prototype = {
 
  preload: function() {
 
 
    this.load.image('preloadbar', 'C:\Users\Dev-1\Desktop\Phinal-Phase\Game\Assets\images\background\paralax good\01trees.png');
 
  },
 
  create: function() {
 
 
    this.game.stage.backgroundColor = '#000';
 
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
 
    this.scale.pageAlignHorizontally = true;
 
    this.scale.pageAlignVertically = true; 
 
    this.scale.setScreenSize(true);
  
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
 
    this.state.start('Preload');
 
  }
 
};