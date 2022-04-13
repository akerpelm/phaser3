import Phaser from "../lib/phaser";

export default class Game extends Phaser.Scene {
  constructor() {
    super("game");
  }
  /* @type {Phaser.Physics.Arcade.Sprite*/
  player;
  /* @type {Phaser.Physics.Arcade.StaticGroup} */
  platforms;
  /* @type {Phaser.Types.Input.Keyboard.CursorKeys} */
  cursors;

  preload() {
    this.load.image("background", "assets/bg_layer1.png");
    this.load.image("platform", "assets/ground_grass.png");
    this.load.image("player", "assets/bunny_stand.png");
  }

  create() {
    this.add.image(240, 320, "background").setScrollFactor(1, 0);
    // this.add.image(240, 320, "platform").setScale(0.5);
    // this.physics.add.image(240, 320, "platform").setScale(0.5);
    this.platforms = this.physics.add.staticGroup();

    for (let i = 0; i < 5; i++) {
      const x = Phaser.Math.Between(80, 400);
      const y = i * 150;
      /* @type {Phaser.Physics.Arcade.Sprite*/
      const platform = this.platforms.create(x, y, "platform");
      platform.scale = 0.5;

      /* @type {Phaser.Physics.Arcade.StaticBody*/
      const body = platform.body;
      body.updateFromGameObject();

      this.player = this.physics.add.sprite(240, 320, "player").setScale(0.5);
      this.physics.add.collider(this.player, this.platforms);

      this.player.body.checkCollision.up = false;
      this.player.body.checkCollision.left = false;
      this.player.body.checkCollision.right = false;

      this.cameras.main.startFollow(this.player);
    }
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    this.platforms.children.iterate((child) => {
      const platform = child;
      const scrollY = this.cameras.main.scrollY;
      if (platform.y >= scrollY + 700) {
        platform.y = scrollY - Phaser.Math.Between(50, 100);
        platform.body.updateFromGameObject();
      }
    });
    const touchingDown = this.player.body.touching.down;

    touchingDown ? this.player.setVelocityY(-300) : null;
  }
}
