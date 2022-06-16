class scene2 extends Phaser.Scene {

  constructor() {
    super({key: "scene2"})
  }

  preload() {
    this.load.image('back', 'assets/background.png');
    this.load.image('sad', 'assets/sad_lexi.png');
  }

  create() {
    this.add.sprite(0.5*window.innerWidth,0.5*innerHeight, 'back');
    var sad_lexi = this.add.sprite(0.5*innerWidth,0.5*innerHeight, 'sad');
    sad_Lexi.scale = 0.7;
  }
}