// pega referência dos itens do HTML
const startButton = document.querySelector('#botaoComecar');
const endButton = document.querySelector('#botaoFinalizar');
const timerDisplay = document.querySelector('#cronometro');

// pra guardar o timer criado
let currentTimer;

// evento no botão que cria timer passando a referência do display e starta o timer
startButton.addEventListener('click', function() {
    currentTimer = new Timer(timerDisplay);
    currentTimer.start();
    startButton.classList.add('invisivel');
    endButton.classList.remove('invisivel');
});

// evento no botão que para o timer, reseta e muda o botão para o começar
endButton.addEventListener('click', function() {
    if (currentTimer) {
        currentTimer.stop();
        currentTimer.reset();
    }
    startButton.classList.remove('invisivel');
    endButton.classList.add('invisivel');
});


// classe do timer
class Timer {
    
    // construtor do timer
    constructor(display) {
        this.elapsedTime = 0;
        this.display = display;
        this.intervalId = null;
    }

    // se intervalId for indefinido, inicializa o count
    start() {
        if (!this.intervalId) {
            this.count();
        }
    }

    // se intervalId for definido, limpa o intervalo
    stop() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }

    // para o timer, reseta o elapsedTime e atualiza o display
    reset() {
        this.stop();
        this.elapsedTime = 0;
        this.updateDisplay();
    }

    // atualiza o display
    updateDisplay() {
        const hours = Math.floor(this.elapsedTime / 3600);
        const minutes = Math.floor((this.elapsedTime % 3600) / 60);
        const seconds = this.elapsedTime % 60;
        this.display.innerHTML = `${this.pad(hours)}:${this.pad(minutes)}:${this.pad(seconds)}`;
    }

    // atualiza o display e cria o intervalo pra contar
    count() {
        this.updateDisplay();
        this.intervalId = setInterval(() => {
            this.elapsedTime++;
            this.updateDisplay();
        }, 1000);
    }

    // adiciona 0 a esquerda se o número for menor que 10
    pad(number) {
        return number.toString().padStart(2, '0');
    }
}