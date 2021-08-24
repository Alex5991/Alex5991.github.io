class PlayerMe extends Player {
    constructor(data) {
        super(data); // Конструктор от Player.js

        this.use = data.use; // Клетки с взаимодействием
        this.map_building = data.map_building; // Класс управляющий зданиями
        this.bankruptcy = 0; // Сколько ходов подряд был банкротом
        this.map_passage_flag = false; // Был ли пройден круг
    }
    static generate(scene, road, id, color, use, map_building) { // Создание персонажа из Players.js
        return new PlayerMe({
            scene,
            x: road[0].x, // Установка положения в первый тайтл
            y: road[0].y, // Установка положения в первый тайтл
            texture: 'knight',
            color: color,
            id: id,
            road,
            use, // Используемые клетки
            map_building, // Карта строений
        });
    }
    dice(need_step) { // Перемещение по доске как у всех игроков
        // Вызывается событие dice
        socket.emit('dice', {player_id: this.id, need_step: need_step})
        if (this.cells+need_step >= this.road.length) // Если круг будет пройден
            this.map_passage_flag = true;

        super.dice(need_step);

        this.cancelAllGui();
    }
    cancelAllGui() { // Отменяет некоторые элементы интерфейса
        GUI.clearGUI();

        this.map_building.сancelChoise();
    }
    finishMove() { // Закончили перемещение
        super.finishMove(); // Общие необходимости для всех Player
        
        // Тут идут все возможные действия
        GUI.updateTimer(TimeForMove, () => this.emit('lose')); // Таймер
        if (this.cells in this.use) { // Если используемая клетка
            let message = ''; // Сообщение действия игрока
            let cost; // Стоимость
            switch (this.use[this.cells]) {
                case 'start':
                    cost = 2000
                    message = `Остановка на этой клетке дает вам дополнительно ${cost} золота`;
                    break;
                case 'river':
                    cost = -1000
                    message = `Мост в плачевном состоянии, вам нужно отремонтировать его. Потрачено ${cost} золотых монет`;
                    break;
                case 'jail':
                    cost = 2000
                    message = `Посещение крепости приносит вам ${cost} золота`;
                    break; 
            }

            GUI.createBoxMessage(()=>{}).start(message, 50);
            socket.emit('random_act', {message: message, cost: cost, from_id: socket.id});

            this.finishAction();
        }
        else if (this.cells in this.map_building.data) // Если здание
            this.buildingAction(this.cells);
        else // Клетка неактивная
            this.finishAction();
    }
    buildingAction(building_id) {
        if (this.map_building.building[building_id] === undefined) { // Если здание не занято
            if (this.money >= building_id*100) // и есть деньги на покупку
                // Меню покупки
                Dialog.buyDialog(GUI.sceneGUI, ()=>this.buyBuilding(building_id), ()=>this.finishAction());
            else 
                this.finishAction();
        }
        else if (this.map_building.building[building_id].owner != this.id) { // Если здание не наше
            let tax = this.map_building.getTax(building_id); // Нужная сумма к уплате
            GUI.createBoxMessage(()=>{}).start(`Здесь чужие владения, придется заплатить ${tax} золотых`, 50);
            socket.emit('tax', {from_id: this.id, to_id: this.map_building.building[building_id].owner, tax:tax}); // Платим налог
            this.finishAction();
        }
        else 
            this.finishAction();
        // console.log(`yep build ${this.map_building.building}`);
        // console.log(this.map_building.building)
    }
    buyBuilding(building_id) { // Покупка здания
        this.money -= building_id*100; // Уменьшаем сумму денег
        this.map_building.interaction(building_id, "start", this.id);
        socket.emit('build', {
            building_id: building_id,
            state: "start",
            owner: this.id
        });
        this.finishAction();
    }
    finishAction() { // Все события после хода завершены
        // Обнуляем таймер
        GUI.removeTimer();
        if (this.map_passage_flag == true) {
            let cost = 2000;
            let message = `За прохождение круга вам причитается ${cost} золота`;
            GUI.createBoxMessage(()=>{}).start(message, 50);
            socket.emit('random_act', {message: message, cost: cost, from_id: socket.id});

            this.map_passage_flag = false;
        }
        // Вызывается событие завершения хода
        socket.emit('finishMove');
        this.map_building.was_trade = false;
    }
}