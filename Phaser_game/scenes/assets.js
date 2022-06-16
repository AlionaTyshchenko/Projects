class assets extends Phaser.assets{
  constructor() {
    super({key: "assets"})
  }

  preload() {
    this.load.image('back', 'assets/background.png');
    this.load.image('gray','assets/gray.png');
    this.load.image('Paul', 'assets/Paul.png');
    this.load.image('Paul_say','assets/Paul_say.png');
    this.load.image('Lexi', 'assets/Lexi.png');
    this.load.image('Lexi_say', 'assets/Lexi_say.png')
  }
}