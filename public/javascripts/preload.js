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
        // this.load.image('gameTiles', '../../Assets/SpritesheetsandTilesets/ci-fi/Tiles/cifiSheet.png');
        // this.load.image('background3', '../../assets/images/01trees.png');




        this.load.tilemap('testlevel', '/assets/levels/test/NewMap.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('gameTiles', '/assets/SpritesheetsАndTilesets/forest/Tiles/forest.png');
        this.load.image('tree1', '/assets/SpritesheetsАndTilesets/forest/object/Tree_2.png');
        this.load.image('tree2', '/assets/SpritesheetsАndTilesets/forest/object/Tree_3.png');
        this.load.image('sign', '/assets/SpritesheetsАndTilesets/forest/object/Sign_2.png');
        this.load.image('stone', '/assets/SpritesheetsАndTilesets/forest/object/Stone.png');
        this.load.image('mush1', '/assets/SpritesheetsАndTilesets/forest/object/Mushroom_1.png');
        this.load.image('mush2', '/assets/SpritesheetsАndTilesets/forest/object/Mushroom_2.png');
        this.load.image('crate', '/assets/SpritesheetsАndTilesets/forest/object/Crate.png');
        this.load.image('bush1', '/assets/SpritesheetsАndTilesets/forest/object/Bush(1).png');
        this.load.image('bush2', '/assets/SpritesheetsАndTilesets/forest/object/Bush(2).png');
        this.load.image('bush3', '/assets/SpritesheetsАndTilesets/forest/object/Bush(3).png');
        this.load.image('bush4', '/assets/SpritesheetsАndTilesets/forest/object/Bush(4).png');
        this.load.image('bush', '/assets/SpritesheetsАndTilesets/forest/object/bushDamage.png');
        this.load.image('skeleton', '/assets/SpritesheetsАndTilesets/forest/object/Skeleton.png');
        this.load.image('cutTree', '/assets/SpritesheetsАndTilesets/forest/object/Tree_1.png');
        this.load.image('cross', '/assets/SpritesheetsАndTilesets/forest/object/Tomb2.png');
        this.load.image('saw', '/assets/SpritesheetsАndTilesets/forest/object/Saw.png');
        this.load.image('cross2', '/assets/SpritesheetsАndTilesets/forest/object/Tomb1.png');
        this.load.image('leftPlatform', '/assets/SpritesheetsАndTilesets/forest/object/platform3.png');
        this.load.image('acid', '/assets/SpritesheetsАndTilesets/forest/object/acid.png');
        this.load.image('potion', '/assets/SpritesheetsАndTilesets/forest/object/potion.png');
        this.load.image('meteorite', '/assets/SpritesheetsАndTilesets/forest/object/meteorite.png');
        this.load.image('sign2', '/assets/SpritesheetsАndTilesets/gy/Objects/ArrowSign.png');
 

        // this.load.image('spike', '/assets/SpritesheetsandTilesets/ci-fi/Tiles/spike.png');
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
        this.load.spritesheet('fireball', '/assets/images/Players/Swordsman/fireball.png', 333, 199);
        this.load.atlas('popAura', '/assets/images/Players/Swordsman/pop.png', '/assets/images/Players/Swordsman/pop.json');
        this.load.atlas('playerCop', '/assets/images/Players/Cop/hero2.png', '/assets/images/Players/Cop/hero2.json');





    },
    create: function() {

        this.state.start('Game');
    }

};