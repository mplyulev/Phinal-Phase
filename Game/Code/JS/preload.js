var phinalphase = phinalphase || {};

//loading the game assets

phinalphase.Preload = function () { };

phinalphase.Preload.prototype = {


    preload: function () {
        //show loading screen
        this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'preloadbar');

        this.preloadBar.anchor.setTo(0.5);

        this.load.setPreloadSprite(this.preloadBar);

        //load game assets

        // this.load.tilemap('testlevel', '../../Assets/levels/test/forest1.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.tilemap('testlevel', '../../Assets/levels/test/cifi1.json', null, Phaser.Tilemap.TILED_JSON);

        this.load.image('gameTiles', '../../Assets/Spritesheets and Tilesets/ci-fi/Tiles/cifiSheet.png');
        this.load.image('spikes', '../../Assets/Spritesheets and Tilesets/ci-fi/Tiles/spike.png');

        this.load.image('bullet', '../../Assets/images/bullet2.png');
        this.load.spritesheet('explosion', '../../Assets/images/effects/anims/Explosion21.png');


        this.load.atlas('playerNinja', '../../Assets/images/Players/Swordsman/hero1.png', '../../Assets/images/Players/Swordsman/hero1.json');
        this.load.atlas('playerCop', '../../Assets/images/Players/Cop/hero2.png', '../../Assets/images/Players/cop/hero2.json');
        // this.load.atlas('flyDownDust', '../../Assets/images/effects/Effects/groundimpact2/flyDownAnim.png', '../../Assets/images/effects/Effects/groundimpact2/flyDownAnim.json');

    },
    create: function () {
        this.state.start('Game');
    }

};