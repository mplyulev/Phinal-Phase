 function createPlayerCop(that) {

     var anim = {
         idle: ['idle', 'Idle_', 0, 11, '', 3, 15, 0, 0],
         run: ['run', 'Run_', 0, 13, '', 3, 15, 0, 0],
         jumpStart: ['jumpStart', 'Jump Start_', 0, 19, '', 3, 25, 0, 0],
         jumpAir: ['jumpAir', 'Jump On Air_', 0, 0, '', 3, 15, 0, 0],
         jumpFall: ['jumpFall', 'Jump Fall_', 0, 0, '', 3, 15, 0, 0],
         attack: ['Shoot_', 'Attack_', 0, 14, '', 3, 20.2, 0, 0],
         hurt: ['hurt', 'Hurt_', 0, 9, '', 3, 20, 0, 0],
         death: ['death', 'Death_', 0, 14, '', 3, 20, 10, 0],
         flyIdle: ['flyIdle', 'Jetpack Idle_', 0, 11, '', 3, 25, , 0, 0],
         flyForward: ['flyForward', 'Jetpack Fly Forward_', 0, 11, '', 3, 25, , 0, 0],
         flyShoot: ['flyShoot', 'Jetpack Fly Shoot_', 0, 11, '', 3, 25, , 0, 0],
         flyHurt: ['flyShoot', 'Jetpack Fly Hurt_', 0, 9, '', 3, 25, , 0, 0],
     }


     that.playerCop = new phinalphase.Player(that.game, 250, 350, 'playerCop', 'Idle_000', 1000, 0.5, 1, -700, 300, 100, anim);
 }

 function updatePlayerCop(that) {
     if (!that.playerCop.isFlinched) {
         that.playerCop.body.velocity.x = 0;
     }
     if (that.playerCop.body.blocked.down) {
         that.playerCop.isInAir = false;
     } else {
         that.playerCop.isInAir = true;
     }
     if (that.game.input.keyboard.isDown(Phaser.Keyboard.D)) {
         that.playerCop.act('RIGHT');
     } else if (that.game.input.keyboard.isDown(Phaser.Keyboard.A)) {
         that.playerCop.act('LEFT');
     } else {
         if (!that.playerCop.isInAir) {
             that.playerCop.act();
         }
     }
     if (that.playerCop.body.velocity.y > 0) {
         that.playerCop.act('FALL');
     }
     if (that.game.input.keyboard.isDown(Phaser.Keyboard.W) && !that.playerCop.isInAir) {
         that.playerCop.act('UP');
     }

     if (that.game.input.keyboard.isDown(Phaser.Keyboard.V)) {
         that.playerCop.act('ATTACK');
     }
 }