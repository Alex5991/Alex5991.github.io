// Меню из которого запускается наша игра
class StartScene extends Phaser.Scene {
    constructor() {
        // Phaser.Scene("Game"); снизу
        // Start - название сцены
        super("Start");
    }
    create() { // Создание объектов
        // setOrigin(0, 0); смещение на левый верхний угол картинки
        // setOrigin(0.5, 0.5); отсчет от середины картинки (стандарт)
        // Все выводится от левого верхнего угла карты
        this.createBackground();
        this.createText();
        this.setEvents();
    }
    createBackground() {
    }
    createText() {
        this.add.text(config.width/2, 500, "Tap to start", {
            font: '40px CurseCasual',
            color: '#FFFFFF'
        }).setOrigin(0.5);
    }
    setEvents() {
        // Нажатие на клавишу мыши
        // this.input.on("pointerdown", () => {
        //     this.scene.start("Game");
        // });
        createSocket(this);
    }

    startGame(data) {
        this.scene.start("Game", data);
    }
}
