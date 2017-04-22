var phinalphase = phinalphase || {};

phinalphase.MainMenu = function () { };

phinalphase.MainMenu.prototype = {

    // preload: function() {




    // },

    create: function () {

        this.game.stage.backgroundColor = '#AAA';

        this.background = this.game.add.sprite(125, 0, 'menuBG');

        this.background.scale.setTo(0.9);

        phinalphase.selectedChar = 0;

        this.ninjaLogo = this.game.add.sprite(220, 180, 'ninjaLogo');
        this.ninjaLogo.scale.setTo(0.15);
        this.copLogo = this.game.add.sprite(490, 190, 'copLogo');
        this.copLogo.scale.setTo(0.15);

        this.char1Btn = this.game.add.button(250, 300, 'buttonOnOff', function () {
            this.buttons.children.forEach(function (btn) {
                btn.frame = 1;
            }, this);
            if (this.char1Btn.frame == 1) {
                this.char1Btn.frame = 0;
            } else {
                this.char1Btn.frame = 1;
            }
            phinalphase.selectedChar = 0;
        }, this);
        this.char1Btn.frame = 0;
        this.char1Btn.scale.setTo(0.2);

        this.char2Btn = this.game.add.button(500, 300, 'buttonOnOff', function () {
            this.buttons.children.forEach(function (btn) {
                btn.frame = 1;
            }, this);
            if (this.char2Btn.frame == 1) {
                this.char2Btn.frame = 0;
            } else {
                this.char2Btn.frame = 1;
            }
            phinalphase.selectedChar = 1;
        }, this);
        this.char2Btn.frame = 1;
        this.char2Btn.scale.setTo(0.2);

        this.buttons = this.game.add.group();
        this.buttons.add(this.char1Btn);
        this.buttons.add(this.char2Btn);

        this.button = this.game.add.button(this.game.world.centerX - 95, 400, 'playButton', function () {
            this.state.start('Game');
        }, this);

        this.button.scale.setTo(0.5);



    }

};