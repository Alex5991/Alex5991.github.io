class Map extends Phaser.GameObjects.Group {
    constructor(scene) {
        super(scene);
        
        this.delayMultipy = 8; // Множитель для showLayer (интервал задержки между тайтлами)
        this.delayConst = 2; // Постоянная задержка
        this.tweenOfsetY = -2000;
        // this.sounds = []; // Тут хранятся звуки
        // let count = 8;
        // while (count) { // Набираем пулл звуков ДОПОЛНИТЕЛЬНО
        //     count --;
        //     for (let key of keys_sound) { // Набираем пулл звуков
        //         let sound = scene.sound.add(key, {volume: 0.1});
        //         this.sounds.push(sound);
        //     }
        // }
        
    }
    showLayer(layer, delay) { // Отрисовка слоев (принимает слой и задержку для анимации)
        for (let tile in layer) {
            // Получаем необходимые данные
            let data = this.needData(layer[tile]);
            // Создаем тайтл
            let image = this.createImage(data.x, data.y, data.id, data.depth);
            // image.setTint(0xe5be01)
            // Анимируем его
            this.createTween(image, delay, data.y);
            // 
            delay += this.delayMultipy;
        }
        return delay;
    }
    needData(cell) { // Необходимые данные для извлечения из ячейки
        const data = {
            x: cell.x,
            y: cell.y,
            id: cell.id,
            depth: cell.depth
        };
        return data;
    }
    createImage(x, y, id, depth, offs_y = this.tweenOfsetY) { // Создание картинки ПЕРЕОПРЕДЕЛЯЕТСЯ
        // Размещаем выше, чем нужно по y для анимации
        let image = this.scene.add.image(x, y+offs_y, 'tiles', id);
        image.depth = depth;
        this.add(image); // Добавляем в группу

        return image; // return Image // Должен возвращать !
    }
    createTween(image, delay, y, callback=()=>{}) { // Анимация летящего вниз блока
        this.scene.tweens.add({
            targets: image,
            delay: delay * this.delayConst,
            duration: 1000,
            y: y,
            onComplete: callback
        });
    }
}