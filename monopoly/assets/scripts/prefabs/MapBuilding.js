// Здания
class MapBuilding extends Map {
    constructor(scene, key) {  // Сцена и ключ по которому грузить json 
        super(scene);

        // Получаем информацию о зданиях
        this.data = this.scene.cache.json.get(key)['building'];
        this.delayMultipy = 15; // Множитель для showLayer (из базового класса)

        this.building = {}; // Тут хранятся все построенные здания
        this.tradeFlagTimer = false; // Флаг запуска таймера, для отмены выделенных зданий
        // this.buildOwnerTrade = '';
        this.tradeTo = ''; // Кому отправляем
        this.was_trade = false; // Был ли обмен на этом ходу

        this.timer = this.scene.time.addEvent({
            delay: 1000,
            loop: true,
            callback: this.firstTick,
            callbackScope: this // Назначение this в tick
        });
        // Частицы
        this.particles = new Particles(this.scene, 'smoke', 0);

        this.STATS = { // Коэффициенты состояния зданий
            "start": 10,
            "level_1": 25,
            "level_2": 50,
            "level_3": 100,
        }
    }
    firstTick() { // Подсвечивает строения по таймеру
        this.timer.paused = true; // Пауза таймеру

        for (const obj of this.getChildren()) {
            let owner_id = obj.getData('owner');
            obj.setTint(GUI.color[owner_id]); // Выделение цветом
        }

        this.scene.time.addEvent({
            delay: 1000,
            callback: this.secondTick, // Продолжаем таймер подсветки
            callbackScope: this // Назначение this в tick
        });
    } 
    // Отключаем подсветку и включаем таймер, чтобы эти действия повторялись firstTick
    secondTick() {
        this.timer.paused = false;
        for (const obj of this.getChildren()) {
            if (obj.getData('choise')) // Если выбран
                obj.setTint(defaultColorChoise);
            else
                obj.clearTint(); // Очистка подсветки
        }
    }
    getTax(building_id) { // Расчет нужной суммы к уплате
        return building_id * this.STATS[this.building[building_id].state];
    }
    interaction(building_id, state, owner) { // Взаимодействие со зданиями
        // building_id - номер ячейки на дороге
        // state - состояние постройки
        if (this.building[building_id] === undefined) { // Если в списке нет такого id
            this.createBuilding(building_id, state, owner);
        }

        // Если здание готово к смене состояния
        // (Прошлая анимация завершена)
        if (this.building[building_id]["ready"] == true) { 
            // Устанавливаем состояние
            this.stateBuilding(building_id, state, owner);
        } else {
            console.log("Не удалось изменить строение");
            this.scene.time.delayedCall(2500, () => {this.interaction(building_id, state, owner)});
        }

    }
    createBuilding(building_id, state, owner) { // Здание создано
        this.building[building_id] = {"state": state, "ready": true, "owner": owner}; // Добавляем запись
    }





    

    // // //
    stateBuilding(building_id, state, owner) { // Меняет состояния строений
        // this.data[building_id][state] // Попадаем в слой для отрисовки
        let flag_del = false; // Флаг об необходимости удаления слоев
        let delay = 0; // Множитель задержки для красивой анимации
        for (let layer in this.data[building_id]) { // Проход по состояниям
            if (flag_del == false) {
                delay = this.showLayer(this.data[building_id][layer], delay, owner, building_id);
            } else {
                this.hideLayer(this.data[building_id][layer]);
            }
            // Если слой - нужное нам состояние, удаляем последующие слои
            // ( для понижения уровня здания )
            if (layer == state) { flag_del = true; }
        }
        // Меняем состояние в нашем хранилище
        this.building[building_id]["state"] = state;
        // Запрещаем изменение здания, пока идет анимация
        this.building[building_id]["ready"] = false;
        // Устанавливаем владельца
        this.building[building_id]["owner"] = owner;
        this.scene.time.delayedCall(delay*this.delayConst + 1000, () => { // Задержка на период анимации
            this.building[building_id]["ready"] = true;
        });
    }
    hideLayer(layer) { // Скрывает слой, чтобы потом можно было вернуть без загрузки
        for (let tile in layer) {
            let x = layer[tile].x;
            let y = layer[tile].y;

            // Получаем объект в этих координатах или null
            let obj = this.findChild(x, y);
            if (obj && obj.active) {
                // console.log('hide')
                this.setAlive(obj, false); // Скрываем объект
            }
        }
    }
    // // //
    showLayer(layer, delay, owner, building_id) { // Отрисовка слоев (принимает слой и задержку для анимации)
        for (let tile in layer) {
            // Получаем необходимые данные
            let data = this.needData(layer[tile]);
            // Создаем тайтл
            let image = this.createImage(data.x, data.y, data.id, data.depth);
            image.setData('owner', owner); // Хозяин стоения
            image.setData('building_id', building_id); // id Строения
            image.setData('choise', false); // Было ли выбрано строение
            // image.getData('owner')
            // Анимируем его
            
            this.createTween(image, delay, data.y, ()=>{
                this.particles.createEmitterBuild(data.x, data.y+50);
                GUI.sounds.whoosh.play();
            });
            // 
            delay += this.delayMultipy;
        }
        return delay;
    }
    trade(msg) { // Обмен зданиями между игроками
        for (let build of msg.data) { // Проход по всем зданиям в предложении
            console.log('Меняемся ', build.building_id);
            if (this.building[build.building_id].owner == msg.from_id) { // Если здание принадлежит отправителю
                this.interaction(build.building_id, build.state, msg.to_id);
            } else if (this.building[build.building_id].owner == msg.to_id) { // Если принадлежит получателю
                this.interaction(build.building_id, build.state, msg.from_id);
            }
        }
        
    }
    tileChoise(building_id, owner) { // Выбор тайтла в режиме обмена пользователей
        // console.log('you choise ', building_id);
        if (GUI.tradeId != '' && GUI.your_move && this.was_trade == false) { // Если выбрали, кому отправлять и сейчас идет наш ход
            // Запуск окошка диалога
            if (this.tradeTo == '') { // Если до этого не был выбран обмен с игроком
                this.tradeTo = GUI.tradeId;
                GUI.createTradeDialog(()=>this.confirmChiose(), ()=>this.сancelChoise());
            }
        }

        if (this.tradeTo != '' && (owner == socket.id || owner == this.tradeTo)) { // Если есть отправитель и выбранное здание либо наше, либо его
            GUI.sounds.bong.play(); // Звук нажатия по зданию
            for (const obj of this.getChildren()) { // Проходим по всем тайтлам
                if (obj.getData('building_id') == building_id) // Если это нужное строение
                    obj.setData('choise', !obj.getData('choise')); // Меняем подсветку
            }
        }
    }
    confirmChiose() { // Отправляем предложение обмена
        let data_building_id = []; // Данные об выбранных зданиях в id
        for (const obj of this.getChildren()) {
            if (obj.getData('choise')) { // Если объект выбран
                if (data_building_id.indexOf(obj.getData('building_id')) == -1) // Если в массиве нет такого здания
                    data_building_id.push(obj.getData('building_id'));
                obj.setData('choise', false); // Снимаем выделение
            }
        }
        if (data_building_id.length == 0) { // Если ничего не выделено
            TextBox.BoxInfo(GUI.sceneGUI, 'Здания для обмена не выбраны');
            this.tradeTo = ''; // Обнуляем переменную предложения
            return;
        } 
        let data_to_send = []; // [ {building_id: id, state: state}, ]
        for (const building_id of data_building_id) {
            let data = {building_id: building_id, state: this.building[building_id].state};
            data_to_send.push(data);
        }

        // console.log('Отправка предложения', data_to_send);
        socket.emit("trade", {
            from_id: socket.id,
            to_id: this.tradeTo,
            data: data_to_send
        });
        this.was_trade = true; // Чтобы больше не менялись на этом ходу
        this.tradeTo = ''; // Обнуляем переменную предложения
    }
    сancelChoise() { // Запуск для отмены выделенных зданий
        console.log('Отмена предложения');
        this.tradeTo = ''; // Обнуляем переменную предложения

        for (const obj of this.getChildren()) // Проходим по всем тайтлам
            obj.setData('choise', false); // Снимаем выделение
    }
    highlight(data) { // Выделяем здания для наглядного обмена
        for (let build of data) { // Проход по всем предложениям
            for (const obj of this.getChildren()) { // Проходим по всем тайтлам
                if (obj.getData('building_id') == build.building_id) {
                    obj.setData('choise', !obj.getData('choise')); // Выделение
                }
            }
        }
    }
    // Создает или возобнавляет тайтл
    createImage(x, y, id, depth) { // Создание одного тайтла
        // Получаем объект в этих координатах или null
        let obj = this.findChild(x, y);
        if (obj) {
            console.log('alive')
            if (obj.active == false) { // Если объект неактивный (ранее бы скрыт)
                this.setAlive(obj, true); // Восстанавливаем объект
                obj.y += this.tweenOfsetY; // Позиция для анимации
            }
            return obj;
        } else { // Создаем новый, если объект не найден
            console.log('create')
            let image = super.createImage(x, y, id, depth);
            image.setInteractive();
            image.on('pointerdown', ()=>this.tileChoise(image.getData('building_id'), image.getData('owner')));
            return image;
        }
    }
    setAlive(obj, status) { // Установка активности, чтобы скрывать объект,а не удалять
        // Показать/Скрыть текстуру
        obj.setVisible(status);
        // Активировать/Деактивировать объект
        obj.setActive(status);
    }
    findChild(x, y) { // Ищет объект по координатам
        for (const obj of this.getChildren()) {
            if (obj.x == x && obj.y == y) {
                return obj;
            }
        }
        return null;
    }
}