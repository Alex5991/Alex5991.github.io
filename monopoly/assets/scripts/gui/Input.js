let INPUT = document.getElementById("input_id");
INPUT.isFocus = '';

// Фокус на элементе input с последующей передачей данных в функцию OnTarget
// Принимает две функции 1) - работает при печати 2) - вызывается, когда выходим из фокуса
function inputOnFocus(OnTarget, OffTarget=()=>{}, key_focus) {
    INPUT.focus();
    INPUT.isFocus = key_focus;

    // Событие печатывания
    INPUT.oninput = function() {
        OnTarget(INPUT.value);
    };
    // Событие выхода из фокуса
    INPUT.onblur = function() {
        // Вызываем метод, который передали нам ранее
        OffTarget();
    };
}

// Отмена фокуса
function inputOffFocus() {
    if (INPUT.isFocus == '')
        return;
    // Обнуление
    INPUT.blur();
    INPUT.value = '';
    INPUT.oninput = ()=>{};
    INPUT.isFocus = '';
}