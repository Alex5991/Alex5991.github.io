// Дороги
class MapRoad extends Map {
    constructor(scene, key) {  // Сцена и ключ по которому грузить json 
        super(scene);

        // Получаем информацию о дорогах
        let data_road = this.scene.cache.json.get(key)['road'];
        // Используемые клетки
        let data_use = this.scene.cache.json.get(key)['use'];
        
        this.offsY = -10; // Смещение по y
        // Визуальное тестирование
        // this.showLayer(data['tiles'], 0);
        this.createRoad(data_road['road'], data_use);
    }
    createRoad(layer, use_road) {
        this.road = []; // Здесь будут координаты каждой клетки
        this.use = {}; // Тут {номер_клетки: функция}

        let values = Object.values(layer);
        // Проверка на возвышенность
        for (let i = 0; i < values.length; i += 1) {
            let vec;
            // Если без признаков возвышенности
            if (values[i].hill == "0") {
                vec = this.getVec(values[i]);
            } else { // Если возвышенность найдена

                let tile_1;
                let tile_2;
                if (i != 0) { // Если есть предыдущий
                    tile_1 = i - 1;
                } else {
                    tile_1 = values.length - 1;
                }
                if (i+1 < values.length) { // Если есть следующий элемент
                    tile_2 = i + 1;
                } else {
                    tile_2 = 0;
                }
                vec = this.getMiddleVec(values[tile_1], values[tile_2]);
            }

            // Ищем тайтл в списке используемых
            this.createUse(use_road, vec, i);

            vec.y += this.offsY; // Смещение
            this.road.push(vec);
        }
    }
    getMiddleVec(tile_1, tile_2) { // Для возвышенности
        // console.log(tile_1);
        let x = (tile_1.x+tile_2.x) / 2;
        let y = (tile_1.y+tile_2.y) / 2;
       
        // console.log("middle", x, y);
        return {x, y};
    }
    getVec(tile) { // Для обычного тайтла
        // console.log(tile);
        let x = tile.x;
        let y = tile.y;
        
        // console.log("get", x, y);
        return {x, y};
    }

    createUse(tilemaps, vec, index) { // Ищет используемые клетки в this.road
        for (let tilemap in tilemaps) {
            for (let tile_vec of tilemaps[tilemap]) {
                if (tile_vec.x == vec.x && tile_vec.y == vec.y) { // Если такая клетка найдена
                    this.use[index] = tilemap;
                    return true;
                }
            }
        }
    }
}