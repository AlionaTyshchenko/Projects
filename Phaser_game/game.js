
const config = {
  type: Phaser.AUTO,
  parent: 'game',
  scale: {
    mode: Phaser.Scale.ScaleModes.SHOW_ALL,
    pageAlignHorizontally: true,
    pageAlignVertically: true,
    width: window.innerWidth,
    height: window.innerHeight
  },
  physics: {
    default: 'arcade'
  },
  pixelArt: true,
  callbacks: {
    postBoot: () => {
      window.sizeChanged();
    },
  },
  canvasStyle: `display: block; width: innerWidth; height: innerHeight;`,
  autoFocus: true,
  scene: [scene1,scene2]
};

window.sizeChanged = () => {
  if (window.game.isBooted) {
    setTimeout(() => {
      window.game.scale.resize(window.innerWidth, window.innerHeight);
      window.game.canvas.setAttribute(
        'style',
        `display: block; width: ${window.innerWidth}px; height: ${window.innerHeight}px;`,
      );
    }, 100);
  }
};
window.onresize = () => window.sizeChanged();

window.game = new Phaser.Game(config)