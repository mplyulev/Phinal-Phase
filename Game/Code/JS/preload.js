var phinalphase = phinalphase || {};

//loading the game assets

phinalphase.Preload = function() {};

phinalphase.Preload.prototype = {


    preload: function() {
        //show loading screen
        this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'preloadbar');

        this.preloadBar.anchor.setTo(0.5);

        this.load.setPreloadSprite(this.preloadBar);

        //load game assets

        // this.load.tilemap('testlevel', '../../Assets/levels/test/forest1.json', null, Phaser.Tilemap.TILED_JSON);
        // this.load.tilemap('testlevel', '../../Assets/levels/test/cifi1.json', null, Phaser.Tilemap.TILED_JSON);
        // this.load.image('gameTiles', '../../Assets/Spritesheets and Tilesets/ci-fi/Tiles/cifiSheet.png');
        // this.load.image('background3', '../../assets/images/01trees.png');
        // this.load.image('spikes', '../../Assets/Spritesheets and Tilesets/ci-fi/Tiles/spike.png');
        // this.load.image('tree', '../../Assets/Spritesheets and Tilesets/ci-fi/Objects/saw.png');



        this.load.tilemap('testlevel', '../../Assets/levels/test/gy1.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('gameTiles', '../../Assets/Spritesheets and Tilesets/gy/Tiles/gySheet.png');
        this.load.image('bg', '../../Assets/Spritesheets and Tilesets/gy/BG.png');
        this.load.image('bush', '../../Assets/Spritesheets and Tilesets/gy/Objects/DeadBush.png');
        this.load.image('crate', '../../Assets/Spritesheets and Tilesets/gy/Objects/Crate.png');
        this.load.image('healthbar', '../../Assets/healthbar.png');





        this.load.image('bullet', '../../Assets/images/bullet2.png');
        this.load.atlas('playerNinja', '../../Assets/images/Players/Swordsman/hero1.png', '../../Assets/images/Players/Swordsman/hero1.json');
        this.load.atlas('playerCop', '../../Assets/images/Players/Cop/hero2.png', '../../Assets/images/Players/cop/hero2.json');





    },
    create: function() {

        this.state.start('Game');
    }

};