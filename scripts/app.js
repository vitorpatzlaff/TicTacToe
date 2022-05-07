const X = '<h2>X</h2>', O = '<h2>O</h2>', choices = document.querySelectorAll('.choices');

let who = true, round = 0;

let P = ['', '', '', '', '', '', '', '', ''];

const keys = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let key, pos0, pos1, pos2;


for (const choice of choices) {
    choice.addEventListener('click', play);
}

function play() {
    this.style = 'pointer-events: none;'
    
    if (who == true) {
        this.innerHTML = X;
        who = false;
    } else {
        this.innerHTML = O;
        who = true;
    }
    
    round++;
    if (round > 4) {
        genP();
        
        if(verify()) {
            draw();
        }
    }
}

function genP() {
    for(let i = 0; i < choices.length; i++){
        if (choices[i].innerHTML == X) {
            P[i] = 'X';
        } else if (choices[i].innerHTML == O) {
            P[i] = 'O';
        }
    }
}

function verify(){
    for(let i = 0; i < keys.length; i++){
        key = keys[i];

        pos0 = key[0];
        pos1 = key[1];
        pos2 = key[2];
    
        if (P[pos0] == P[pos1] &&
            P[pos0] == P[pos2] &&
            P[pos0] != '') {
            
            winner(key, P[pos0]);
            return false;
        }    
    }
    
    if (round == 9) {
        return true;
    }
}

function draw() {
    let draw = true, color = '#00aaff';
    
    warn('Draw', color, draw);
    
    choices.forEach((choice) => {
        choice.style = `color: ${color}; pointer-events: none;`;
    });
}

function winner(key, sample) {
    let color = '#4ceb34';

    choices.forEach((choice) => {
        choice.style = 'pointer-events: none';
    });

    key.forEach((each) => {
        choices[each].style = `color: ${color}; pointer-events: none;`;
    });

    warn(sample, color);
}

function warn(message, color, draw) {
    const mes = document.getElementById('message');
    const end = document.getElementById('end');

    if (draw) {
        mes.innerHTML = `<span style='color: ${color};'>${message}</span>`;
    } else {
        mes.innerHTML = `Player <span style='color: ${color}; font-family:"Comic Sans MS";'>${message}</span> won!`;
    }

    end.style = 'opacity: 1;';
    
    restart(end);
}

function restart(end) {
    let btn = document.getElementById('btn');
    
    setTimeout(() => {
        end.style = 'pointer-events: auto; opacity: 1;';
    }, 500);

    btn.addEventListener('click', reset);
}


function reset() {
    let h2 = document.querySelectorAll('h2');

    h2.forEach((each) => {
        each.style = 'transition-duration: 500ms; opacity: 0;'
    })

    end.style = 'opacity: 0; pointer-events: none;';

    setTimeout(() => {
        choices.forEach((choice) => {
            choice.innerHTML = '';
            choice.style = '';
        });
    }, 500);       
        
    who = true;
    round = 0;
    P = ['', '', '', '', '', '', '', '', ''];
}
