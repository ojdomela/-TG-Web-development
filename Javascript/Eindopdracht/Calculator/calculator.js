let memory = '';
let screen = '';
let mod = '';
let calc = '';

function modifier(obj) {
    switch (obj.textContent) {
        case 'AC':
            memory = '';
            mod = '';
            calc = '';
            break;
        case 'C':
            obj.textContent = 'AC';
            screen = '';
            document.getElementById('answer').textContent = 0;
            break;
        case '+/-':
            screen = screen * -1;
            document.getElementById('answer').textContent = screen;
            break;
        case '=':
            if (memory == '') {
                screen = '';
                document.getElementById('answer').textContent = 0;
                break;
            }
            if (mod != obj.textContent) {
                calc = mod + screen;
                memory += screen;
                mod = obj.textContent;
            } else {
                memory += calc;
            }
            screen = eval(String(memory));
            document.getElementById('answer').textContent = screen;
            document.getElementById('clear').textContent = 'C';
            memory = screen;
            screen = '';
            break;
        default:
            mod = obj.textContent;
            memory += screen + mod;
            screen = '';
    }
}

function editor(obj) {
    if (!screen.includes('.') || obj.textContent != '.') {
        document.getElementById('clear').textContent = 'C';
        screen += obj.textContent;
        document.getElementById('answer').textContent = screen;
    }
}
