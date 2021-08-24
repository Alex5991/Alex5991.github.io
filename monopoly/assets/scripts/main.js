let config = {
    type: Phaser.AUTO, // webGL or canvas
    width: 1280,
    height: 720,
    scene: [BootScene, PreloadScene, StartScene, GameScene, GUIScene], // Наша сцена
    // physics: {
    //     default: "arcade",
    //     arcade: {

    //     }
    // }
    scale: {
        // width: 1280,
        // height: 720,
        mode: Phaser.Scale.RESIZE,
        min: 1280,
        max: 720,
    },
    parent: 'phaser-container',
    dom: {
        createContainer: true
    },
};

let game = new Phaser.Game(config)