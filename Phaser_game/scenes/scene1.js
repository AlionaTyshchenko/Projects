class scene1 extends Phaser.Scene {
  constructor() {
    super({key: "scene1"})
  }

  preload() {
    this.load.image('back', 'assets/background.png');
    this.load.image('gray','assets/gray.png');
    this.load.image('Paul', 'assets/Paul.png');
    this.load.image('Paul_say','assets/Paul_say.png');
    this.load.image('Lexi', 'assets/Lexi.png');
    this.load.image('Lexi_say', 'assets/Lexi_say.png');
    this.load.spritesheet('choice', 'assets/Lexi_choice.png',{frameHeight:innerHeight,frameWidth:0.4*innerWidth})
  }

  create(){
    this.add.sprite(0.5*window.innerWidth,0.5*innerHeight, 'back');
    var gray = this.add.sprite(0.5*window.innerWidth,0.5*innerHeight,'gray');

    var Paul = this.add.sprite(0.5*innerWidth,0.6*innerHeight, 'Paul');
    Paul.scale = 0.8;

    setTimeout( () => {
      var Paul_say = this.add.sprite(0.5*innerWidth,0.6*innerHeight,'Paul_say');
      Paul_say.scale = 0.8;

      this.tweens.add({
        targets: [Paul,Paul_say],
        x: { value: 1.5*innerWidth, duration: 1000 },
        ease: 'Power2',
        delay:1000
      })
    },500)

    setTimeout( () => {
      var Lexi = this.add.sprite(-1.5*innerWidth,0.6*innerHeight, 'Lexi');
      Lexi.scale = 0.8;
      var Lexi_say = this.add.sprite(-1.5*innerWidth,0.6*innerHeight,'Lexi_say');
      Lexi_say.scale = 0.3;  
  
      this.tweens.add({
        targets: [Lexi,Lexi_say],
        x: { value: 0.5*innerWidth, duration: 1000 },
        ease: 'Power2',
        delay:500
      })

    },1000)

    // setTimeout( () => {
    //   this.scene.start('scene2')

    // },2500)

  //   var player = this.add.sprite(0.5*innerWidth, 0.5*innerHeight, 'choice')
  //   this.anims.create({
  //     key: "1ch",
  //     frameRate: 7,
  //     frames: this.anims.generateFrameNumbers("choice", { start: 0, end: 0 }),
  //     repeat: -1
  //   });

  // this.anims.create({
  //     key: "2ch",
  //     frameRate: 7,
  //     frames: this.anims.generateFrameNumbers("plane", { start: 1, end: 1 }),
  //     repeat: -1
  //   });

  //   var timer = this.time.addEvent({
  //   delay: 500,                
  //   callback: player.play('1ch'),
  //   loop: true
  //   });
  }
  update(){
    let upKey = Phaser.Input.Keyboard.KeyCodes.A;

    if(upKey.isDown){
      // player.anims.destroy('smile')
      player.anims.play('rose',true)
      console.log('a is down')
    }
  }
}
