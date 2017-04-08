//   that.playerCop.walkingSound = new buzz.sound("/assets//sound/footstep04", {
//       formats: ["ogg"],
//       preload: true,
//   });

//   function Sound(soundName, url, format, preload) {
//       this.url = url,
//           this.soundName = new buzz.sound(url, {
//               format: this.format,
//               preload: true
//           });
//   }


//   function playCopSounds() {
//       if (that.game.input.keyboard.isDown(Phaser.Keyboard.D) && !that.playerCop.isInAir) {

//           that.playerCop.walkingSound.play();
//           that.playerCop.facing = "right";
//       } else if (that.game.input.keyboard.isDown(Phaser.Keyboard.A) && !that.playerCop.isInAir) {
//           that.playerCop.walkingSound.play();
//       }
//   }