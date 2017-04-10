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



        this.load.tilemap('testlevel', '/assets/levels/test/newMap.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('gameTiles', '/assets/Spritesheets and Tilesets/forest/Tiles/forest.png');
        this.load.image('tree1', '/assets/Spritesheets and Tilesets/forest/Оbject/Tree_2.png');
        this.load.image('tree2', '/assets/Spritesheets and Tilesets/forest/Оbject/Tree_3.png');
        this.load.image('sign', '/assets/Spritesheets and Tilesets/forest/Оbject/Sign_2.png');
        this.load.image('stone', '/assets/Spritesheets and Tilesets/forest/Оbject/Stone.png');
        this.load.image('mush1', '/assets/Spritesheets and Tilesets/forest/Оbject/Mushroom_1.png');
        this.load.image('mush2', '/assets/Spritesheets and Tilesets/forest/Оbject/Mushroom_2.png');
        this.load.image('crate', '/assets/Spritesheets and Tilesets/forest/Оbject/Crate.png');
        this.load.image('bush1', '/assets/Spritesheets and Tilesets/forest/Оbject/Bush (1).png');
        this.load.image('bush2', '/assets/Spritesheets and Tilesets/forest/Оbject/Bush (2).png');
        this.load.image('bush3', '/assets/Spritesheets and Tilesets/forest/Оbject/Bush (3).png');
        this.load.image('bush4', '/assets/Spritesheets and Tilesets/forest/Оbject/Bush (4).png');
        this.load.image('background', '/assets/images/background/PARALLAX/background.png');
        this.load.image('rocks', '/assets/images/background/PARALLAX/rocks.png');
        this.load.image('cloud', '/assets/images/cloud.png');
        this.load.image('cloud2', '/assets/images/cloud2.png');
        this.load.image('cloud3', '/assets/images/cloud3.png');
        this.load.image('cloud4', '/assets/images/cloud4.png');
        this.load.image('cloud5', '/assets/images/cloud5.png');

        // this.load.image('bg', '/assets/Spritesheets and Tilesets/gy/BG.png');
        // this.load.image('bush', '/assets/Spritesheets and Tilesets/gy/Objects/DeadBush.png');
        // this.load.image('crate', '/assets/Spritesheets and Tilesets/gy/Objects/Crate.png');
        // this.load.image('healthbar', '/assets/healthbar.png');





        this.load.image('bullet', '/assets/images/bullet2.png');
        this.load.atlas('playerNinja', '/assets/images/Players/Swordsman/hero1.png', '/assets/images/Players/Swordsman/hero1.json');
        this.load.atlas('playerCop', '/assets/images/Players/Cop/hero2.png', '/assets/images/Players/Cop/hero2.json');





    },
    create: function() {

        this.state.start('Game');
    }

};