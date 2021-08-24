class Player extends Phaser.GameObjects.Sprite {
    constructor(data) {
        // Создание объекта смотри конструктор new Sprite(scene, x, y, texture [, frame])
        super(data.scene, data.x, data.y, data.texture); 

        this.id = data.id;
        this.road = data.road; // Массив маршрутов
        // Окраска в нужный цвет
        this.setTint(data.color)
        
        this.init();
    }
    static generate(scene, road, id, color) { // Создание персонажа из Players.js
        return new Player({
            scene,
            x: road[0].x, // Установка положения в первый тайтл
            y: road[0].y, // Установка положения в первый тайтл
            texture: 'knight',
            color: color,
            id: id,
            road,
        });
    }
    init() {
        // Переменные необходимые для игры
        this.cells = 0; // Ячейка, в которой мы находимся
        this.money = 8000;
        this.constDelay = 1000; // Стандартная задержка и продолжительность анимации
        this.animFlag = false; // Должна ли проигрываться анимация
        this.tweenFlag = false; // Работает ли tween сейчас

        // Создаем игрока
        this.scene.add.existing(this); // Добавляем игрока на сцену
        this.scale = 0.15;
        this.depth = 1; // z-index
    
        // Добавляем метку сверху
        // this.label = new Label(this.scene, {
        //     width: 100,
        //     height: 50,
        //     x: this.x,
        //     y: this.y-100,
        //     background: this.scene.add.image(0, 0, 'label_b'),
        //     text: BBText.StandartStyleWithText(this.scene, 'text'),
        //     align: 'center',
        //     // space: {
        //     //     left: 10,
        //     //     right: 10,
        //     // }
        // })
        // .layout()
        // this.label = this.scene.add.image(this.x, this.y - 100, "label_b")
        // this.label.scale = 0.15;
        // this.label.depth = 1;

        // // Текст на метке
        // this.text = this.scene.add.text(this.x, this.y - 100, 'wwwwqwe asd');
        // this.text.depth = 1;
    }
    dice(need_step) { // Сколько выпало на игральной кости
        // cur_step - сколько шагов прошел
        for (let cur_step = 0; cur_step<need_step; cur_step++) {
            this.cells++;
            // Идем на второй круг, если прошли все ячейки
            if (this.cells >= this.road.length) this.cells = 0;
            
            this.goTo(this.road[this.cells], cur_step); // Перемещаемся
        }
        this.animTo(need_step);
    }

    goTo(vec, delay) { // Перемещение
        this.scene.tweens.add({
            onStart: () => {this.setFlipX(this.x<vec.x);}, // Поворот
            targets: this,
            delay: delay * this.constDelay,
            duration: this.constDelay,
            // onComplete: () => {Particles.createEmitterPlayer(this.scene, this.x-20, this.y+10)},
            x: vec.x,
            y: vec.y
        });

        // // Перемещение метки
        // this.scene.tweens.add({
        //     onStart: () => {this.setFlipX(this.x<vec.x);}, // Поворот
        //     targets: this.label,
        //     delay: delay * this.constDelay,
        //     duration: this.constDelay,
        //     x: vec.x,
        //     y: vec.y-100
        // });

        // this.scene.tweens.add({
        //     onStart: () => {this.setFlipX(this.x<vec.x);}, // Поворот
        //     targets: this.label.text,
        //     delay: delay * this.constDelay,
        //     duration: this.constDelay,
        //     x: vec.x,
        //     y: vec.y-100
        // });
    }
    animTo(duration) { // Старт анимации и тут же выставляется флаг-окончание анимации 
        this.animFlag = true; // Разрешаем проигрывание анимации
        
        if (this.tweenFlag == true) { // Такое возможно только если зашло повторно, а анимация все ещё идет
            console.log("animTo already playing");
            // return true;
        } else {
            GUI.sounds.footstep.play(); // Звуки
            this.tweenFlag = true; // Показываем, что tween работает
            this.rotateTween(15); // Анимация в tween 
        }

        this.scene.time.addEvent({
            delay: duration * this.constDelay,
            callback: this.finishMove,
            callbackScope: this // Назначение this
        });
    }
    finishMove() { // Информация об конечной точке (Закончили перемещение)
        this.animFlag = false;
    }
    rotateTween(angle) { // Анимация шагов
        if (this.animFlag == true) { // Если анимация разрешена
            this.scene.tweens.add({
                yoyo: true,
                targets: this,
                callbackScope: this, // Назначение this
                duration: this.constDelay/4,
                onComplete: () => {this.rotateTween(-angle)},

                angle: angle,
            });
        } else {
            GUI.sounds.footstep.stop(); // Звуки
            this.tweenFlag = false;
        }
    }
}