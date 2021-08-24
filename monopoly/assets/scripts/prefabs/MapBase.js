// Только базовые структуры на которые игрок не влияет
class MapBase extends Map {
    constructor(scene, key) { // Сцена и ключ по которому грузить json 
        super(scene);
        // Получаем базовую карту data["base"]
        this.data = this.scene.cache.json.get(key)['base'];
        this.ready = false; // Готовность карты
        this.createMap();
    }
    // Вызовы из вне //
    createMap() { // Создание карты
        let delay = 0; // Множитель задержки для красивой анимации
        delay = this.showLayer(this.data["ground"], delay);
        // Принимаем общую задержку от земли и используем для анимации декора
        // Декор падает сразу после земляных тайтлов
        delay = this.showLayer(this.data["decor"], delay);

        this.scene.time.delayedCall(delay * this.delayConst + 1000, ()=> {this.ready = true;})
    }
}