class GameScene extends Phaser.Scene {
    constructor() {
        super("Game");
    }
    init() { // Инициализация игровых настроек
        // this.cursors = this.input.keyboard.createCursorKeys(); // Доступ к клавишам

        // Отдаляем камеру
        this.cameras.main.zoom = 0.5;
        this.cameras.main.scrollY = -250;
        this.cameras.main.scrollX = -250;

        // Запускаем пользовательский интерфейс
        this.scene.launch("GUI");
    }
    create(players_data) { // Создание объектов
        // players_data - данные полученные от сокетов
        console.log("Game started with ", players_data);

        // this.map_base.incY(500); // Опустили ниже на 500
        let map_base = new MapBase(this, "mapdata");
        let map_road = new MapRoad(this, "mapdata"); // Создаем дорогу
        this.map_building = new MapBuilding(this, "mapdata");

        // Ждем когда создастся сцена GUI
        this.timer = this.time.addEvent({
            delay: 500,
            loop: true,
            callback: () => {
                if (GUI.sceneGUI != undefined && map_base.ready) {
                    console.log('loading gui finished');
                    this.time.removeEvent(this.timer);

                    this.players = new Players(this, map_road.road, map_road.use, this.map_building, players_data);
                }
            },
            callbackScope: this // Назначение this в tick
        });


        

        // this.map_building.interaction(0, "level_3");

        // this.time.delayedCall(2500, () => {
        //     this.map_building.interaction(0, "level_1");
        //     this.time.delayedCall(2500, () => {
        //         this.map_building.interaction(0, "level_3");
        //     })
        // })

        // this.cameraTest(); // Включи ещё в update
        // this.input.on('pointerdown', ()=>{console.log('click')})


        // Остановка фокуса при нажатии на карту
        this.input
        // .setGlobalTopOnly(false) // Событие не приостонавливается (По всей площади считает клик)
        .on('pointerdown', () => {    
            inputOffFocus();
        });

    }

    cameraTest() {
        // var cursors = this.input.keyboard.createCursorKeys();
        // var controlConfig = {
        //     camera: this.cameras.main,
        //     left: cursors.left,
        //     right: cursors.right,
        //     up: cursors.up,
        //     down: cursors.down,
        //     speed: 0.0001,
        //     zoomIn: cursors.space,
        //     zoomOut: cursors.shift,
        //     zoomSpeed: 0.01,
        // };
        // this.controls = new Phaser.Cameras.Controls.FixedKeyControl(controlConfig);
    }

    update(delta) { // Обновление игры
        // this.controls.update(delta);
    }
}
