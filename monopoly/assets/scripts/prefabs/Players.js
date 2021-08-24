class Players extends Phaser.GameObjects.Group {
    // Информация о дороге и используемых клетках
    // Также класс управляющий зданиями
    constructor(scene, road, use, map_building, players_id) { 
        super(scene);

        // Говорим, чтобы начался создаваться графический интерфейс в другой сцене
        GUI.sceneGUI.createUI(players_id);
        // Создание игроков
        this.players = [];
        for (let id of players_id) {
            if (id == socket.id) {
                this.me = this.createMe(road, id, use, map_building);
                this.me.on('lose', this.imLose);
            }
            else
                this.players.push(this.createPlayer(road, id));
        }
        this.socketEvents();
    }

    socketEvents() { // События для сокета
        // Ход других игроков
        socket.on('dice', (msg) => {
            console.log('dice: ', msg);
            for (const obj of this.players) {
                // console.log(this.getChildren())
                if (obj.id == msg.player_id) {
                    this.updateDice(obj, msg.need_step); // Запуск хода игрока
                    break;
                }
            }
        });
        // Мой ход
        socket.on('your_move', (msg) => {
            this.updateMoney(); // Обновление денег за прошлый ход
            TextBox.BoxInfo(GUI.sceneGUI, `Ходит ${msg.player_id}`);
            // Делаем вид, что кидаем кубик
            if (this.me.id == msg.player_id) {
                if (this.me.bankruptcy != 0) { // Если нулевой баланс несколько ходов подряд
                    this.imLose();
                    return;
                }

                if (this.me.money < 0) { // Проверка на банкрота
                    this.me.bankruptcy ++;
                } else 
                    this.me.bankruptcy = 0;

                GUI.updateTimer(TimeForMove, () => this.imLose())
                GUI.diceOn(()=>this.updateDice(this.me, msg.need_step));
                GUI.createBoxMessage(()=>{}).start(`Настал ваш ход. Нажмите на кубики, чтобы сходить`, 50);
            } else {
                GUI.updateTimer(TimeForMove, () => {})
                // this.scene.time.delayedCall(2500, () => {console.log('no me')});
            }
        });
        // Случайное действие
        socket.on('random_act', (msg) => {
            // В чат будет выводиться сообщение
            console.log(msg);
            for (let child of this.getChildren()) {
                if (child.id == msg.from_id) {
                    child.money += msg.cost;
                    break;
                }
            }
        });
        // Уплата налога
        socket.on('tax', (msg) => {
            // В чат будет выводиться сообщение
            console.log(msg);
            for (let child of this.getChildren()) {
                if (child.id == msg.from_id) {
                    child.money -= msg.tax;
                } else if (child.id == msg.to_id) {
                    child.money += msg.tax;
                }
            }
        });
        // Кто то взаимодействуует со зданием
        socket.on('build', (msg) => {
            for (let child of this.getChildren()) {
                if (child.id == msg.owner) {
                    child.money -= msg.building_id*100; // Уменьшаем сумму денег
                }
            }
            // Строим строение
            this.me.map_building.interaction(msg.building_id, msg.state, msg.owner);
        });
        // Обмен начался
        socket.on('trade', (msg) => {
            TextBox.BoxInfo(GUI.sceneGUI, 'Отправлен обмен');
            if (msg.to_id == socket.id) { // Если предложение прислано мне
                // Сообщение 
                GUI.createBoxMessage(()=>{}).start(`Вам пришло предложение об обмене. На игровой карте будут подсвечены красным цветом здания, которые участвуют в обмене.`, 50);
                // Подсветка
                this.me.map_building.highlight(msg.data);
                // Меню выбора
                let dialog = Dialog.tradeDialogConfirm(GUI.sceneGUI,
                    ()=>{
                        this.me.map_building.highlight(msg.data);
                        socket.emit('trade_confirm', msg)
                    },
                    ()=>{
                        this.me.map_building.highlight(msg.data);
                        socket.emit('trade_cancel')
                    },
                );
                // Время на раздумье
                GUI.updateTimer(TimeForTrade, () => {
                    // Удаление диалога
                    this.me.map_building.highlight(msg.data);
                    dialog.scaleDownDestroy(100);
                    socket.emit('trade_cancel');
                });
            } else {
                // Ограничение нажатия на кубик
                GUI.diceOffForTradeON();
                GUI.updateTimer(TimeForTrade, () => {})
                console.log('trade start no me')
                // Панель, что идут торги ОТ и КОМУ
            }
            
        });
        // Обмен подтвержден
        socket.on('trade_confirm', (msg) => {
            TextBox.BoxInfo(GUI.sceneGUI, "Обмен успешен");
            // Отмена ограничения нажатия на кубик
            GUI.diceOffForTradeOFF();
            // Обмениваемся
            this.me.map_building.trade(msg.data);

            // Можно ходить
            if (msg.cur_player_id == socket.id)
                GUI.updateTimer(TimeForMove, () => this.imLose());
            else
                GUI.updateTimer(TimeForMove, () => {});
        });
        // Обмен отменен
        socket.on('trade_cancel', (msg) => {
            TextBox.BoxInfo(GUI.sceneGUI, "Обмен отклонен");
            // Отмена ограничения нажатия на кубик
            GUI.diceOffForTradeOFF();
            // Можно ходить
            if (msg.cur_player_id == socket.id)
                GUI.updateTimer(TimeForMove, () => this.imLose());
            else
                GUI.updateTimer(TimeForMove, () => {});
        });
        
        // Для реализации таймера
        // socket.on('timer', (msg) => {
        //     // Очищаем таймер
        //     this.scene.time.removeEvent(this.timer);
        //     this.timer = this.scene.time.addEvent({
        //         delay: 1000 * 10,
        //         callback: () => {
        //             // Если игрок, который всех тормозит - я
        //             if (msg == this.me.player)
        //                 // Если я не в процессе ходьбы к ячейке
        //                 if (this.me.tweenFlag == false)
        //                     this.imLose();
        //         },
        //         callbackScope: this // Назначение this
        //     });
        // });
        // Игрок вышел
        socket.on('player_off', (msg) => {
            console.log('player off', msg);
        });
        
        // Игрок проиграл
        socket.on('player_lose', (msg) => {
            console.log('player lose', msg);
        });
        // Игры завершена
        socket.on('game_over', (msg) => {
            socket.disconnect()

            TextBox.BoxInfo(GUI.sceneGUI, "Игра завершена");
            GUI.createBoxMessage(()=>{}).start(`Игра окончена, победитель ${msg}`, 50);
            // console.log('game_over ', msg);
        });
        // Посылаем событие готовности к игре
        socket.emit("ready");
    }

    updateDice(player, need_step) { // Функция обновления кубиков и запуск хода
        // Обнуляем таймер
        GUI.removeTimer();
        console.log(player.id, 'кидаю кубик на ', need_step);
        let number = need_step/2;
        // Округление в большую сторону // Округление в меньшую сторону
        GUI.updateDice(Math.ceil(number)-1, Math.floor(number)-1);
        // Игрок ходит
        player.dice(need_step);
    }

    updateMoney() { // Функция обновления денег
        for (let child of this.getChildren()) {
            if (GUI.playersMoney[child.id].typing.text != String(child.money)) {
                GUI.sounds.money.play(); // Звуки
                GUI.playersMoney[child.id].start(child.money, 75);
            } 
        }
            
            
        // console.log(GUI.playersMoney)
        // 
    }

    imLose() { // Проигрыш
        console.log('im lost');
        TextBox.BoxInfo(GUI.sceneGUI, 'Проигрыш');
        GUI.createBoxMessage(()=>{}).start(`Вы проиграли`, 50);
        this.me = undefined;
        // // socket.disconnect()
        // Событие проигрыша
        socket.emit("lose");
    }

    createMe(road, id, use, map_building) {
        let me = PlayerMe.generate(this.scene, road, id, GUI.color[id], use, map_building)
        // TEST
        // this.timer = this.scene.time.addEvent({
        //     delay: 2000,
        //     loop: true,
        //     callback: () => {me.dice(1)},
        //     callbackScope: me // Назначение this в tick
        // });
        this.add(me);

        // TEST
        // for (let cells in me.map_building.data)
        //     me.buildingAction(cells)
        
        return me;
    }
    createPlayer(road, id) {
        let player = Player.generate(this.scene, road, id, GUI.color[id]);
        // TEST
        // player.dice(12);
        this.add(player);

        return player;
    }
}
    /*
    на андроиде карта не прогружается
    */


        // this.timer = this.scene.time.addEvent({
        //     delay: 1000,
        //     loop: true,
        //     callback: this.tick,
        //     callbackScope: this // Назначение this в tick
        // });
    // tick() {
    //     if (this.countCreated < this.countMax) {
    //         this.createEnemy();
    //     } else {
    //         this.timer.remove();
    //     }
    // }