class GUIScene extends Phaser.Scene {
    constructor() {
        super("GUI");
    }
    preload() {
        this.load.scenePlugin({
            key: 'rexuiplugin',
            url: 'assets/plugins/rexuiplugin.min.js',
            sceneKey: 'rexUI'
        });
 
        this.load.image('nextPage', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/assets/images/arrow-down-left.png');
    }
    create() { // Для передачи ссылки на эту сцену главной сцене
        // Инициализация некоторых переменных, чтобы избежать лагов позже
        GUI.sounds = {
            dice: this.sound.add('dice'),
            switch: this.sound.add('switch'),
            switch_button: this.sound.add('switch_button', {volume: 0.5}),
            footstep: this.sound.add('footstep', {volume: 0.2, loop: true}),
            trade: this.sound.add('trade'),
            money: this.sound.add('money'),
            whoosh: this.sound.add('whoosh'),
            bong: this.sound.add('bong'),

            loop: this.sound.add('loop', {volume: 0.1, loop: true}),
        };

        GUI.createChat(this);
        GUI.sceneGUI = this;
    }


    createUI(player_id) {
        let gui = new GUI;
        gui.generateBoxStats(this, player_id);

        // this.createBoxMessage();
    }

    // createBoxMessage() {
    //     let box = TextBox.BoxInteractive(this);
    //     box.start(`money ${10} qwe wqe d aszdasd wq dqd qwedqwdwqeqdw 
    //     qweqwe qwdsad opqwkepoqwjepqwje pqwje p0qwje qp0wj d jwdq`, 50);
    // }

}

/*
    scene.rexUI.add.sizer - чтобы вложить в объект другие объекты
*/
