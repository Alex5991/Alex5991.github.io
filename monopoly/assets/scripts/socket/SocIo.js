var socket // Глобальная переменная

function createSocket(start_scene) { // Создание сокета
    if (socket === undefined || socket.disconnected) {
        socket = io();

        socket.once('start', (msg) => {
            start_scene.startGame(msg); // Тут коллбек для начала игры
        });
        
    }

    else
        console.log("Socket is already init");
}
