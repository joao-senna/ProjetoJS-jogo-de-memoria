const CARDS = document.querySelectorAll('.carta');
var cartaVirada = false;
var primeiraCarta, segundaCarta;
var bloquearTabuleiro = false;

function virarCarta(){
    if(bloquearTabuleiro) return;
    if (this === primeiraCarta) return;
    this.classList.add('virada');
    if(!cartaVirada){
        cartaVirada = true;
        primeiraCarta = this;
        return;
    }
    segundaCarta = this;
    cartaVirada = false;
    verificarCartas();
}

function verificarCartas(){
    if(primeiraCarta.dataset.carta === segundaCarta.dataset.carta){
        desabilitarCartas();
        return
    }
    desvirarCartas();
}

function desabilitarCartas(){
    primeiraCarta.removeEventListener('click', virarCarta);
    segundaCarta.removeEventListener('click', virarCarta);
    reiniciar();
}

function desvirarCartas(){
    bloquearTabuleiro = true;    
    setTimeout(() => {
        primeiraCarta.classList.remove('virada');
        segundaCarta.classList.remove('virada');
        reiniciar();
    }, 1000);
}

function reiniciar(){
    [cartaVirada, bloquearTabuleiro] = [false, false];
    [primeiraCarta, segundaCarta] = [null, null];

}

(function embaralhar(){
    CARDS.forEach((carta) => {
        let aleatorio = Math.floor(Math.random() * 12);
        carta.style.order = aleatorio;
    })
})();

CARDS.forEach((carta) => {
    carta.addEventListener('click', virarCarta);
})