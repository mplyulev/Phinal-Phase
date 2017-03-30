var phinalphase = phinalphase || {};
 
phinalphase.Boot = function(){};
 
 
phinalphase.Boot.prototype = {
 
  preload: function() {
 
 
    this.load.image('preloadbar', '../../Assets/progress-bar.png');
 
  },
 
  create: function() {
 
 
    this.game.stage.backgroundColor = '#000';
 
    // this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
 
    // this.scale.pageAlignHorizontally = true;
 
    // this.scale.pageAlignVertically = true; 
 
    // this.scale.refresh(true);
  
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
 
    this.state.start('Preload');
 
  }
 
};