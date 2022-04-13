import Phaser from "./lib/phaser.js";
import Game from "./scenes/Game.js";

// console.dir(Phaser);

export default new Phaser.Game({
  type: Phaser.AUTO,
  width: 480,
  height: 630,
  scene: Game,
  physics: {
    default: "arcade",
    arcade: {
      gravity: {
        y: 200,
      },
      debug: true,
    },
  },
});
