const COLOR_PRIMARY = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_LIGHTER = 0xA58882;
const COLOR_DARK = 0x260e04;

const defaultColor = 0xffffff;
const defaultColorChoise = 0xDC143C;


const TimeForMove = 60; 
const TimeForTrade = 70;

// Что позже добавлено, то и отрисовывается
class GUI {
    /*
    static GUIScene = null; // Тут будет сцена GUI
    constructor(scene) {
        GUI.GUIScene = scene;
    }
    */
    static sceneGUI;
    static playersMoney = {}; // Поля с деньгами игроков (доступ по имени)
    static playersDice = []; // Поля с кубиками

    static tradeId = ''; // Id игрока, с кем мы обмениваемся
    static tradeFlag = true; // Флаг сигнализирующий начало обмена
    static color = {}; // Цвет для подсветки пользователей в режиме обмена

    static your_move = false; // Флаг о начале нашего хода
    static arr_with_element = []; // Всплывающие элементы

    static timerPanel; // Панель для таймера
    static timer = false; // Сам таймер

    static sounds = {}; // Все звуки

    // static actionPanel; // Панель для взаимодействия с игроками

    // Поля со статистикой пользователя (деньги, имя ..)
    // Ширина для текста 100 , для картинки 64х64
    generateBoxStats(scene, players_id) {
        // Создаем sizer, в котором будут лежать наши поля
        let panel = new Sizer(scene, 0, 0, 'y', {
            anchor: {
                left: "left+10",
                top: "top+10"
            },
            space: { left: 20, right: 20, top: 20, bottom: 20, item: 10 },
        })
        .addBackground(new RoundRectangle(scene, 0, 0, 5, COLOR_PRIMARY).setStrokeStyle(2, COLOR_LIGHT, 1));
        // .addBackground(new NinePatch(scene, 100, 100, 'panel_brown', [10, 10, 10], [10, 10, 10]))
        
        // голубой,зеленый
        let available_color = [[0xfabfff], [0x3333ff], [0x1e90ff, '#1E90FF'], [0x00FF00, '#00FF00']]; // Доступные цвета для пользователей (не для меня)
        // Проход по всем именам пользователей
        for (let player_id of players_id) {
            let cur_color = available_color.pop()
            GUI.color[player_id] = cur_color[0];
            
            // Создаем сайзер под имя и деньги (справа иконки)
            let sizer = new Sizer(scene, 100, 64, 'y');

            // Создаем область под заголовок, текст + icon пользователя
            let header = new Label(scene, {
                orientation: 'x',
                // background: RoundRectangle.Border(scene, 0, 0, 0, 2, COLOR_LIGHT),
                background: new RoundRectangle(scene, 0, 0, 5, COLOR_LIGHTER),
                icon: new RoundRectangle(scene, 64, 64, 5, COLOR_PRIMARY),
                text: sizer,
            
                space: {
                    left: 10,
                    right: 10,
                    top: 10,
                    bottom: 10,
            
                    icon: 10,
                },
            })

            // Простой Лабель под имя
            let name = new Label(scene, {
                width: 150,
                align: "center",
                // height: undefined,
                background:  RoundRectangle.Border(scene, 0, 0, 0, 2, COLOR_DARK),
                // text: scene.add.text(0, 0, player_id.slice(0, 10)),
                text: BBText.StandartStyleWithText(scene, player_id.slice(0, 10), cur_color[1]),
                space: {
                    left: 5,
                    right: 5,
                    top: 5,
                    bottom: 5,
                },
            })
            // Текстовый бокс для красивого изменения суммы денег
            let money = new TextBox(scene, {
                text: BBText.StandartStyle(scene, 100, 20),
            });
            GUI.playersMoney[player_id] = money; // Чтобы менять сумму по ходу игры

            sizer
            .add(name, {
                padding: {left: 0, right: 0, top: 20, bottom: 20},
            })
            .add(money, {
                padding: {left: 0, right: 0, top: 0, bottom: 20},
            })
            
            // Имя панели приравниваем к id игрока, чтобы потом можно было обратиться
            header.name = player_id;
            
            // console.log(header._x, header._y)
            // header.add(header._x, header._y, this.createActions(scene));
            // События нажатия
            header
            .setInteractive()
            .on('pointerdown', function () {
                if (header.name != socket.id) { // Если нажали не на себя
                    if (GUI.tradeId == '') // Если до этого пуст
                        TextBox.BoxInfo(GUI.sceneGUI, "Режим обмена включен");
                    else if (GUI.tradeId != header.name) // Если изменили фокус для обмена
                        TextBox.BoxInfo(GUI.sceneGUI, "Режим обмена изменен");
                    GUI.tradeId = header.name;
                    console.log(header.name);
                }
                // GUI.clickToAction(header._x, header._y);
            })
            panel.add(header);
        }
        
        panel.layout()
        panel.popUp(1000);
        // .drawBounds(scene.add.graphics(), 0xff0000);
        // console.log(panel)

        // Панель действий
        // this.createActions(scene);
        // Кубики
        this.createDice(scene, panel.width/2);
        // Таймер
        this.createTimerPanel(scene);
        // Чат
        GUI.mainPanel.visible = true;
        // Теперь в GUISCene , чтобы лагов избежать
        // GUI.sounds = {
        //     dice: scene.sound.add('dice'),
        //     switch: scene.sound.add('switch'),
        //     switch_button: scene.sound.add('switch_button', {volume: 0.5}),
        //     footstep: scene.sound.add('footstep', {volume: 0.2, loop: true}),
        //     trade: scene.sound.add('trade'),
        //     money: scene.sound.add('money'),
        //     whoosh: scene.sound.add('whoosh'),
        //     bong: scene.sound.add('bong'),

        //     loop: scene.sound.add('loop', {volume: 0.1, loop: true}),
        // };
        // Запуск начальной темы
        GUI.sounds.loop.play();

        // Кнопки звука
        this.createSoundButtons(scene);

        // const windowInnerWidth = document.documentElement.clientWidth
        // const windowInnerHeight = document.documentElement.clientHeight
        // alert(`width ${windowInnerWidth}, height ${windowInnerHeight}`)
        // w 667 h 325 изначальное разрешение
    }
    // createActions(scene) { // Выдвижная панель с дайствиями над игроком
    //     GUI.actionPanel = new Label(scene, {
    //         orientation: 'x',
    //         // background: new RoundRectangle(scene, 0, 0, 5, COLOR_LIGHTER),
    //         // icon: new RoundRectangle(scene, 64, 64, 5, COLOR_PRIMARY),
    //         // text: scene.add.text(0, 0, 'wwwwwwwwwwwwwwwww'),
    //         space: {
    //             left: 10,
    //             right: 10,
    //             top: 10,
    //             bottom: 10,
        
    //             icon: 10,
    //         },
    //     })
    //     GUI.actionPanel.add(Buttons.createButtons(scene, 'Обмен', GUI.openTrade));
        
    //     // GUI.actionPanel.add(Buttons.createButtons(scene, 'Профиль'));
    //     // GUI.actionPanel.add(Buttons.createButtons(scene, 'Похвалить'));
    //     // GUI.actionPanel.add(Buttons.createButtons(scene, 'Пожаловаться'));
        
    //     GUI.actionPanel
    //     .layout() // Расположение объектов
    //     // .setInteractive() // Взаимодействие
    //     // .on('pointerdown', () => {console.log('action')}) // Чтобы поглатил событие клика
    //     .setVisible(false); // Отключение видимости объекта
    // }
    createSoundButtons(scene) { // Создание кнопок звука
        let sizer = new Sizer(scene, 0, 0, 'y', {
            anchor: {
                right: "right-10",
                centerY: "center"
            },
            space: { left: 20, right: 20, top: 20, bottom: 20 },
        })

        let createIcon = function(title, key, onMute) { // Функция создания иконок (title - название кнопки, key - загрузчик картинки иконки)
            let icon = new Phaser.GameObjects.Image(scene, 0, 0, key, 0)
            .setDepth(1) // Поверх других
            icon.frame_num = 0; // Чтобы отслеживать frame
            scene.add.existing(icon);
            let button_music = Buttons.createButtons(scene, title, ()=>{
                onMute(); // Функция отключения звуков на кнопке
                
                if (icon.frame_num == 0) {
                    icon.setFrame(1);
                    icon.frame_num = 1;
                }
                else {
                    icon.setFrame(0);
                    icon.frame_num = 0;
                }
            }, icon);
            return button_music;
        }

        // button_music.setText('[b]h[/b]ello')
        // console.log(button_music.getButton(0).getElement('text').texture = )
        sizer
        .add(createIcon('Музыка', 'icon_music', ()=>GUI.sounds.loop.mute = !GUI.sounds.loop.mute))
        .add(createIcon('Звуки', 'icon_sound', ()=>{
            for (let sound in GUI.sounds) {
                if (sound != 'loop')
                    GUI.sounds[sound].mute = !GUI.sounds['footstep'].mute;
            }
        }))
        .layout() // Расположение объектов
    }

    createDice(scene, width_offs) { // Создание кубиков снизу
        const windowInnerHeight = document.documentElement.clientHeight
        let dice_1 = scene.add.image(width_offs - width_offs/2, windowInnerHeight - 58, 'dice', 0);
        let dice_2 = scene.add.image(width_offs + width_offs/2, windowInnerHeight - 58, 'dice', 0);
        GUI.playersDice.push(dice_1);
        GUI.playersDice.push(dice_2);

        // Интерактивный первый кубик + большая область
        dice_1.setInteractive(new Phaser.Geom.Rectangle(0, -100, 256, 256), Phaser.Geom.Rectangle.Contains)
    }
    static diceOn(callback) { // Активация нажатия на кубики
        GUI.your_move = true; // Наш ход
        let timer = GUI.sceneGUI.time.addEvent({
            delay: 1000,
            loop: true,
            callback: ()=>{
                for (let dice of GUI.playersDice) {
                    if (dice.isTinted) // Если окрашен
                        dice.clearTint(); // Очистка подсветки
                    else 
                        dice.setTint(defaultColorChoise);
                }
            },
        });
        
        GUI.playersDice[0] // Цепляем к первому кубику + большую область
        .once('pointerdown', () => {
            GUI.your_move = false; // Наш ход закончен
            GUI.sceneGUI.time.removeEvent(timer);
            for (let dice of GUI.playersDice)
                dice.clearTint(); // Очистка подсветки
            callback();
        });
    }
     // Цепляем ко второму кубику + большую область
    static diceOffForTradeON() { // Ограничение нажатия на кубик
        GUI.playersDice[1]
        .setInteractive(new Phaser.Geom.Rectangle(-200, -100, 384, 256), Phaser.Geom.Rectangle.Contains)
        .on('pointerdown', () => {
            TextBox.BoxInfo(GUI.sceneGUI, "Ожидание ответа на обмен");
        });
    }
    static diceOffForTradeOFF() { // Снятие ограничение нажатия на кубик
        GUI.playersDice[1]
        .removeInteractive()
        // .off('pointerdown');
    }
    createTimerPanel(scene) { // Создание таймера справа вверху
        const windowInnerWidth = document.documentElement.clientWidth
        GUI.timerPanel = scene.add.text(windowInnerWidth - 100, 100, '');
    }

    static removeTimer() { // Очищаем таймер
        GUI.sceneGUI.time.removeEvent(GUI.timer);
        GUI.timer = false;
        // Скрываем панель
        GUI.timerPanel.setVisible(false);
    }
    static updateTimer(duration_in_second, callback) {
        if (GUI.timer != false) // Если таймер ещё идет
            GUI.removeTimer();

        GUI.timerPanel.setText(duration_in_second);
        GUI.timerPanel.setVisible(true);
        let second_out = 0;

        GUI.timer = GUI.sceneGUI.time.addEvent({
            delay: 1000,
            loop: true,

            callback: () => {
                // Если время истекло 
                if (second_out > duration_in_second) {
                    GUI.removeTimer();
                    callback();
                }
                else {
                    GUI.timerPanel.setText(duration_in_second-second_out);

                    second_out ++;
                }
            }
        })
    }

    static updateDice(dice_1, dice_2) {
        GUI.sounds.dice.play(); // Звуки
        GUI.sceneGUI.tweens.add({
            targets: GUI.playersDice,
            x: -100,
            duration: 400,
            yoyo: true,
            onYoyo: () => {
                GUI.playersDice[0].setFrame(dice_1); // Округление в большую сторону
                GUI.playersDice[1].setFrame(dice_2); // Округление в меньшую сторону
            }
        });
    }

    // // Тут клик по панели с игроком
    // static clickToAction(x, y) {
    //     if (GUI.actionPanel.visible == true) { // Если был до этого нажат
    //         GUI.actionPanel.scaleDownPromise(250) // Анимация уменьшения
    //         .then(function() {
    //             GUI.actionPanel.setVisible(false);
    //         })
    //     } else {
    //         GUI.actionPanel.x = x + 215;
    //         GUI.actionPanel.y = y;
    //         GUI.actionPanel.popUp(500); // Анимация появления
    //         GUI.actionPanel.setVisible(true); // Включение видимости объекта
    //     }
    // }
    // static openTrade() { // Это каллбек, который висит на кнопке ОБМЕН
    //     console.log('trade')
    //     // GUI.actionPanel.x = 1000
    //     // GUI.actionPanel.setVisible(false);
    //     // GUI.actionPanel.scaleDown(250)
    //     // Разрешаем выбор зданий на карте
    //     GUI.tradeFlag = true;
    //     GUI.createBoxInfo("Режим обмена включен");
    // }
    // static closeTrade() { // Вызывается из Mapbuilding, когда обмен отменен
    //     GUI.tradeFlag = false;
    //     GUI.createBoxInfo("Режим обмена выключен");
    // }
    static clearGUI() {
        for (let elem of GUI.arr_with_element) {
            if (elem && elem.im_destroy != true) { // elem.im_will_destroy = true; - Если был удален не тут, а через коллбеки
                
                elem.scaleDownDestroy(100);
            }
        }
        GUI.arr_with_element = [];
    }
    static createTradeDialog(callback_confirm, callback_cancel) {
        let dialog = Dialog.tradeDialog(GUI.sceneGUI, callback_confirm, callback_cancel);
        GUI.arr_with_element.push(dialog);
        return dialog;
    }
    static createBoxMessage(callback) {
        let box = TextBox.BoxInteractive(GUI.sceneGUI, callback);
        GUI.arr_with_element.push(box);
        return box;
    }
    static createBoxInfo(text) { // Исчезающее сообщение действия
        return TextBox.BoxInfo(GUI.sceneGUI, text);
    }


    // CHAT CHAT CHAT CHAT
    static createChat(scene) { // Создание чата
        let panel = new Sizer(scene, 0, 0, 'y', {
            anchor: {
                right: "right-10",
                bottom: "bottom-10"
            },
            space: { left: 20, right: 20, top: 20, bottom: 20, item: 10 },
        })
        .addBackground(new RoundRectangle(scene, 0, 0, 5, COLOR_PRIMARY).setStrokeStyle(2, COLOR_LIGHT, 1));

        let mainPanel = GUI.CreateMainPanel(scene, {
            width: 450, height: 200,
            color: {
                background: COLOR_LIGHTER,
                track: COLOR_LIGHT,
                thumb: defaultColor,
                inputBackground: COLOR_LIGHT,
                inputBox: COLOR_LIGHTER
            },
            userName: 'alex ww'
        })
        panel.add(mainPanel)
        .layout()

        mainPanel
            .on('send-message', function (text, name) {
                socket.emit("message");
                mainPanel.appendMessage(text, name);
            })
        
        mainPanel.visible = false;
        GUI.mainPanel = mainPanel; // Чтобы потом можно было включить
    }
    static CreateMainPanel (scene, config) {
        let mainPanel = new Sizer(scene, config.width, config.height, 'y', {anchor: config.anchor});
        let upperPanel = new Sizer(scene, 0, 0, 'x', {});
        let background = new RoundRectangle(scene, 0, 0, 5, config.color.background);
        // var userListBox = CreateUserListBox(mainPanel, config);
        let messageBox = GUI.CreateMessageBox(mainPanel, config);
        let inputPanel = GUI.CreateInputPanel(mainPanel, config);

        upperPanel
            // .add(
            //     userListBox, //child
            //     0, // proportion
            //     'center', // align
            //     { right: 5 }, // paddingConfig
            //     true, // expand
            // )
            .add(
                messageBox, //child
                1, // proportion
                'center', // align
                0, // paddingConfig
                true, // expand
            )
        mainPanel
            .addBackground(background)
            .add(
                upperPanel, //child
                1, // proportion
                'center', // align
                { top: 10, bottom: 10, left: 5, right: 5 }, // paddingConfig
                true, // expand
            )
            .add(
                inputPanel, //child
                0, // proportion
                'center', // align
                0, // paddingConfig
                true, // expand
            );

        return mainPanel;
    }

    static CreateMessageBox (parent, config) {
        let scene = parent.scene;
        let messageBox = new TextArea(scene, {
                text: new BBText(scene, '', {
            }),
    
            slider: {
                track: new RoundRectangle(scene, 20, 10, 10, config.color.track),
                thumb: new RoundRectangle(scene, 0, 0, 10, config.color.thumb),
            },
    
            name: 'messageBox'
        });

        // Control
        let messageToString = function (text, name) {
            return `[${name}] ${text}\n`;
        }
        // Функция добавляет текст 
        parent.appendMessage = function (text, name) {
            let s = messageToString(text, name);
            messageBox
                .appendText(s)
                .scrollToBottom()
            
            if (messageBox.linesCount > 75) { // Если больше 75 линий занято сообщениями
                let arr = messageBox.text.split('\n');
                // Разделяем текст по \n и удаляем 10 сообщений
                if (arr.length > 10) {
                    arr.splice(0, 10);
                    messageBox.setText(arr.join('\n'));
                }
            }
        }
        return messageBox;
    }
    static CreateInputPanel(parent, config) {
        let scene = parent.scene;
        let background = new RoundRectangle(scene, 2, 2, { bl: 5, br: 5 }, config.color.inputBackground); // Height is 40
        // let userNameBox = new BBText(scene, config.userName, {
        //     halign: 'right',
        //     valign: 'center',
        //     // fixedWidth: 120,
        //     // fixedHeight: 20
        // });

        // Чтобы добавить текст+анимацию в одной строчке
        let backgroundPanel = new RoundRectangle(scene, 0, 0, 5, config.color.inputBox);
        let texPanel = new Sizer(scene, 300, 0, 'x', {});
        let inputBox = new BBText(scene, '', {
            halign: 'left',
            valign: 'center',
        });
        // Для анимации
        let inputBoxAnim = new BBText(scene, '|', {
            halign: 'left',
            valign: 'center',
        });
        inputBoxAnim.visible = false; // Для анимации
        texPanel
        .add(inputBox)
        .add(inputBoxAnim)
        .addBackground(backgroundPanel);
        

        let SendBtn = new BBText(scene, 'Отправить', {backgroundColor: COLOR_DARK,
            backgroundCornerRadius: 5,
            padding: {
                left: 5,
                right: 5,
                top: 5,
                bottom: 5,
            },
        });
        let icon = new Phaser.GameObjects.Image(scene, 0, 0, 'icon_chat')
        scene.add.existing(icon);
        let inputPanel = new Label(scene, {
            height: 40,

            background: background,
            // icon: userNameBox,
            icon: icon,
            text: texPanel,
            expandTextWidth: true,
            action: SendBtn,

            space: {
                left: 15,
                right: 15,
                top: 0,
                bottom: 0,

                icon: 10,
                text: 10,
            }
        });
        // Control
        // SendBtn
        //     .setInteractive()
        //     .on('pointerdown', function () {
        //         if (inputBox.text !== '') {
        //             parent.emit('send-message', inputBox.all_text, userNameBox.text);
        //             inputOffFocus(); // Выключаем ввод  
        //         }
        //     });
        inputPanel
            .setInteractive()
            .on('pointerdown', function () {
                if (inputBox.text !== '') { // Если фокус не сбит и мы повторно жмем на панель
                    parent.emit('send-message', inputBox.all_text, config.userName);
                    inputOffFocus(); // Выключаем ввод  
                    return;
                }
                // Если уже в фокусе, тогда не подключаем новые события
                if (INPUT.isFocus == 'chat') 
                    return;
                // Анимация печати (Мигание)
                let timer_anim_box = scene.time.addEvent({
                    delay: 1000,
                    loop: true,
                    callback: ()=>inputBoxAnim.visible = !inputBoxAnim.visible
                });

                // Включаем ввод (Последние 50 символов)
                inputOnFocus((input_text)=>{
                    inputBox.all_text = input_text; // Весь текст
                    inputBox.text=input_text.slice(-30); // Срезанные 50 символов
                    texPanel.layout(); // Размечаем, чтобы inputBoxAnim поменял свое положение
                }, ()=>{
                    inputBox.all_text = '';
                    inputBox.text = '';
                    texPanel.layout();
                    // Удаляем анимацию
                    scene.time.removeEvent(timer_anim_box);
                    inputBoxAnim.visible = false; // Для скрытия анимации
                }, 'chat');

                // const editor = scene.rexUI.edit(inputDom);
                // const elem = editor.inputText.node
                // console.log(inputDom.text)
                // console.log(elem)
            });

        return inputPanel;
    }
}


