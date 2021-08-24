// Загрузка всех необходимых для игры ресурсов
class PreloadScene extends Phaser.Scene {
    constructor() {
        super("Preload");
    }
    preload() {
        // Элементы GUI
        this.load.spritesheet('icon_music', 'assets/sprites/GUI/icon_music.png', {frameWidth: 32, frameHeight: 32})
        this.load.spritesheet('icon_sound', 'assets/sprites/GUI/icon_sound.png', {frameWidth: 32, frameHeight: 32})
        this.load.image('icon_chat', 'assets/sprites/GUI/btn_icon_chat.png');
        // Загрузка игрального кубика
        this.load.spritesheet('dice', 'assets/sprites/DiceSprSheetX96.png', {frameWidth: 96, frameHeight: 96})

        // Загрузка персонажей
        this.load.spritesheet('bandit', 'assets/sprites/BanditT3MaleWalkRed.png', {frameWidth: 16, frameHeight: 32});
        this.load.image('knight', 'assets/sprites/chess-knight-white.png');
        
        // Метки для персонажей
        this.load.image('label_b', 'assets/sprites/title_bg_blue.png');
        this.load.image('label_r', 'assets/sprites/title_bg_red.png');

        // Загрузка листа с тайтлами ( spritesheet_div_2 )
        // В данный момент используется вариант, уменьшенный в два раза
        this.load.spritesheet('tiles', 'assets/tilemaps/tile_spritesheet.png', {frameWidth: 128, frameHeight: 176});
        // Данные о карте
        this.load.json('mapdata', 'assets/tilemaps/map.json');

        // Эффект облачка
        this.load.spritesheet('smoke', 'assets/sprites/smoke.png', {frameWidth: 127, frameHeight: 125});

        // Аудио
        this.load.audio('dice', ['assets/sounds/dice.ogg', 'assets/sounds/reserve/dice.m4a']);
        this.load.audio('switch', ['assets/sounds/switch.ogg', 'assets/sounds/reserve/switch.m4a']);
        this.load.audio('switch_button', ['assets/sounds/switch_button.ogg', 'assets/sounds/reserve/switch.m4a']);
        this.load.audio('footstep', ['assets/sounds/footstep.ogg', 'assets/sounds/reserve/footstep.m4a']);
        this.load.audio('trade', ['assets/sounds/trade.ogg', 'assets/sounds/reserve/trade.m4a']);
        this.load.audio('money', ['assets/sounds/money.ogg', 'assets/sounds/reserve/money.m4a']);
        this.load.audio('bong', ['assets/sounds/bong.ogg', 'assets/sounds/reserve/bong.m4a']);

        this.load.audio('loop', ['assets/sounds/temple_loop.ogg', 'assets/sounds/reserve/temple_loop.m4a']);

        // Аудио для map
        this.load.audio('whoosh', ['assets/sounds/whoosh.ogg', 'assets/sounds/reserve/whoosh.m4a']);
        // this.load.audio('build', ['assets/sounds/stoneHit1.ogg', 'assets/sounds/stoneHit2.ogg', 'assets/sounds/stoneHit3.ogg']);
    }
    create() {
        this.scene.start('Start');
    }
}