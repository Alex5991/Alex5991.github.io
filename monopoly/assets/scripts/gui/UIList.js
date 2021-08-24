// Основной класс, нужен для упорядочивания остальных
class Sizer extends RexPlugins.UI.Sizer {
    constructor(scene, minWidth, minHeight, orientation, config) {
        super(scene, 0, 0, minWidth, minHeight, orientation, config);
        scene.add.existing(this);
    }
}

class Label extends RexPlugins.UI.Label {
    constructor(scene, config) {
        super(scene, config);
        scene.add.existing(this);
    }
    static standartLable(scene, text, icon, width=60, height=60) {
        let lable = new Label(scene, {
            width: width,
            height: height,
            background: new RoundRectangle(scene, 0, 0, 10, COLOR_LIGHT),
            icon: icon,
            text: BBText.StandartStyleWithText(scene, text),
            align: 'center',
            space: {
                left: 5,
                right: 5,
            }
        });
        return lable;
    }
}

class TextArea extends RexPlugins.UI.TextArea {
    constructor(scene, config) {
        super(scene, config);
        scene.add.existing(this);
    }
}

// Контейнер с заголовком, содержимым, кнопками и фоном.
class Dialog extends RexPlugins.UI.Dialog {
    constructor(scene, config) {
        super(scene, config);
        scene.add.existing(this);
    }
    static base(scene, callback_confirm, callback_cancel, button_yes, button_no, anchor, title_text, content_text) { // Базовая панелька
        let content
        if (content_text) // Если есть текст для контента
            content = BBText.StandartStyleWithText(scene, content_text);

        let dialog = new Dialog(scene, {
            anchor: anchor,

            background: new RoundRectangle(scene, 100, 100, 20, COLOR_PRIMARY),

            title: new Label(scene, {
                background: new RoundRectangle(scene, 100, 40, 20, COLOR_DARK),
                text: BBText.StandartStyleWithText(scene, title_text),
                space: {
                    left: 15,
                    right: 15,
                    top: 10,
                    bottom: 10
                }
            }),
            // content: BBText.StandartStyleWithText(scene, `content wqe qwe qw `)
            content: content,

            choices: [
                Label.standartLable(scene, button_yes),
                Label.standartLable(scene, button_no),
            ],

            space: {
                title: 25,
                content: 25,
                choice: 15,

                left: 25,
                right: 25,
                top: 25,
                bottom: 25,
            },

            expand: {
                content: false,  // Content is a pure text object
            },
        })
        .layout()
        .popUp(1000)
        .once('button.click', function (button, groupName, index) {
            GUI.sounds.switch_button.play(); // Звуки
            if (button.text == button_yes) {
                callback_confirm();
            }   
            else {
                callback_cancel();
            }
            dialog.im_destroy = true;
            dialog.fadeOutDestroy(3500);
        })
        .on('button.over', function (button, groupName, index) {
            button.getElement('background').setStrokeStyle(1, 0xffffff);
        })
        .on('button.out', function (button, groupName, index) {
            button.getElement('background').setStrokeStyle();
        })
        return dialog;
    }
    static tradeDialog(scene, callback_confirm, callback_cancel) {
        TextBox.BoxInfo(GUI.sceneGUI, "Обмен запущен");
        let dialog = Dialog.base(scene,
            ()=>{callback_confirm();},
            ()=>{callback_cancel(); TextBox.BoxInfo(GUI.sceneGUI, "Режим обмена выключен");},
            'Отправить',
            'Отменить',
            {
                left: 'left+300',
                bottom: 'bottom-20'
            },
            'Меню обмена'
        );
        return dialog;
    }

    static tradeDialogConfirm(scene, callback_confirm, callback_cancel) {
        TextBox.BoxInfo(GUI.sceneGUI, "Пришел запрос об обмене");
        let dialog = Dialog.base(scene, callback_confirm, callback_cancel, 'Принять обмен', 'Отклонить', 
            {
                left: 'left+300',
                bottom: 'bottom-20'
            },
            'Меню обмена'
        );
        return dialog;
    }

    static buyDialog(scene, callback_confirm, callback_cancel) {
        Dialog.base(scene, callback_confirm, callback_cancel, 'Купить здание', 'Игнорировать', 
            {
                left: 'left+300',
                bottom: 'bottom-20'
            },
            'Покупка строений'
        );
    }
}

class Buttons extends RexPlugins.UI.Buttons {
    constructor(scene, config) {
        super(scene, config);
        scene.add.existing(this);
    }
    static createButtons(scene, text, callback_click, icon) {

        let button = new Buttons(scene, {
            orientation: 'x',
            // background:  new RoundRectangle(scene, 0, 0, 10, COLOR_DARK),
            buttons: [Label.standartLable(scene, text, icon, 125)],

            space: {
                left: 15,
                right: 15,
                top: 15,
                bottom: 15,
            }
        });
        // События для кнопки
        button.on('button.over', function(button, index, pointer, event) {
            button.tween({
                targets: button.getElement('buttons'),
                scaleX: { start: 1, to: 1.1 },
                scaleY: { start: 1, to: 1.1 },
                ease: 'Back',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
                duration: 1000,
            });
        })
        button.on('button.out', function(button, index, pointer, event) {
            button.tween({
                targets: button.getElement('buttons'),
                scaleX: { start: 1.1, to: 1 },
                scaleY: { start: 1.1, to: 1 },
                ease: 'Back',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
                duration: 1000,
            });
        });
        button.on('button.click', function(button, index, pointer, event) {
            callback_click();
        });
        return button;
    }
}

// class NinePatch extends RexPlugins.UI.NinePatch {
//     constructor(scene, width, height, key, columns, rows, config) {
//         super(scene, 500, 500, width, height, key, columns, rows, config);
//         scene.add.existing(this);
//     }
// }

class TextBox extends RexPlugins.UI.TextBox {
    constructor(scene, config) {
        super(scene, config);
        scene.add.existing(this);
    }
    static BoxInteractive(scene, callback) {
        var textBox = new TextBox(scene, {
            anchor: {
                centerX: "center",
                centerY: "center"
            },
            background: new RoundRectangle(scene, 2, 2, 20, COLOR_PRIMARY)
                .setStrokeStyle(2, COLOR_LIGHT),
            icon: new RoundRectangle(scene, 2, 2, 20, COLOR_DARK),
            text: BBText.StandartStyle(scene, 500, 65),
            action: scene.add.image(0, 0, 'nextPage').setTint(COLOR_LIGHT).setVisible(false),
            space: {
                left: 20,
                right: 20,
                top: 20,
                bottom: 20,
                icon: 10,
                text: 10,
            }
        })
        .setOrigin(0)
        .layout();

        textBox
        .setInteractive()
        .on('pointerdown', function () {
            GUI.sounds.switch.play(); // Звуки
            var icon = this.getElement('action').setVisible(false);
            this.resetChildVisibleState(icon);
            
            if (this.isTyping) {
                this.stop(true);
            } else {
                if (this.isLastPage) {
                    textBox.im_destroy = true;
                    this.fadeOutDestroyPromise(500)
                        .then(function(){
                            callback();
                        });
                    return;
                }
                this.typeNextPage();
            }
        }, textBox)
        .on('pageend', function () {
            var icon = this.getElement('action').setVisible(true);
            this.resetChildVisibleState(icon);
            icon.y -= 30;
            var tween = scene.tweens.add({
                targets: icon,
                y: '+=30', // '+=100'
                ease: 'Bounce', // 'Cubic', 'Elastic', 'Bounce', 'Back'
                duration: 500,
                repeat: 0, // -1: infinity
                yoyo: false
            });
        }, textBox)
        
        return textBox
    }
    static BoxInfo(scene, text) {
        GUI.sounds.trade.play(); // Звуки
        var textBox = new TextBox(scene, {
            anchor: {
                centerX: "center",
                centerY: "top+100"
            },
            background: new RoundRectangle(scene, 2, 2, 20, COLOR_PRIMARY)
                .setStrokeStyle(2, COLOR_LIGHT),
            text: BBText.StandartStyleWithText(scene, text),
            space: {
                left: 20,
                right: 20,
                top: 20,
                bottom: 20,
                icon: 10,
                text: 10,
            }
        })
        .setOrigin(0)
        .layout();

        textBox.fadeOutDestroy(3500);
    }
}

class RoundRectangle extends RexPlugins.UI.RoundRectangle {
    constructor(scene, width, height, radius, fillColor, fillAlpha) {
        super(scene, 0, 0, width, height, radius, fillColor, fillAlpha);
        scene.add.existing(this);
    }
    static Border(scene, width, height, radius, lineWidth, color) {
        let rect = new RoundRectangle(scene, width, height, radius);
        rect.setStrokeStyle(lineWidth, color, 1)
        return rect;
    }
}

class BBText extends RexPlugins.UI.BBCodeText {
    constructor(scene, text, style) {
        super(scene, 0, 0, text, style);
        scene.add.existing(this);
    }
    static StandartStyle(scene, fixedWidth, fixedHeight) {
        return new BBText(scene, '', {
            fixedWidth: fixedWidth,
            fixedHeight: fixedHeight,
            halign: 'center',
            valign: 'center',
            fontSize: '20px',
            wrap: {
                mode: 'word',
                width: 500
            },
            maxLines: 3,
        })
    }
    static StandartStyleWithText(scene, text, color='#ffffff') {
        return scene.add.text(0, 0, text, {
            // fontFamily: 'CurseCasual',
            fontSize: 18,
            color: color,

            stroke: '#000000',
            strokeThickness: 5,
        })
    }
}

// class InputTextDom extends InputText {
//     constructor(scene, width, height, config) {
//         super(scene, 0, 0, width, height, config)
//         scene.add.existing(this);
//     }
// }