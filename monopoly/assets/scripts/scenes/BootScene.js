// Загрузка картинки о загрузке
class BootScene extends Phaser.Scene {
    constructor() {
        super("Boot");
    }
    preload() { // Загрузка всех нужных объектов
    }
    create() {
        this.scene.start('Preload');
    }
}