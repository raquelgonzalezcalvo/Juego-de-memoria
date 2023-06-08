"use strict";

//variables
let uncoveredCards = 0;
let card1 = null;
let card2 = null;
let firstResult = null;
let secondResult = null;
let move = 0;
let hits = 0;
let time = false;
let timer = 30;
let regressiveTimeId = null;

let showMove = document.getElementById("move");
let showHits = document.getElementById("hits");
let showTime = document.getElementById("time");
//genera numeros aleatorios
let numbers = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
numbers = numbers.sort(() => Math.random() - 0.5);

//funciones
function countTime() {
  regressiveTimeId = setInterval(() => {
    timer--;
    showTime.innerHTML = `Tiempo: ${timer} segundos`;
    if (timer === 0) {
      clearInterval(regressiveTimeId);
      blockCards();
    }
  }, 1000);
}

function blockCards() {
  for (let i = 0; i <= 15; i++) {
    let blockedCards = document.getElementById(i);
    blockedCards.innerHTML = numbers[i];
    blockedCards.disabled = true;
  }
}

//funcion principal
function uncover(id) {
  if (time === false) {
    countTime();
    time = true;
  }
  uncoveredCards++;

  if (uncoveredCards === 1) {
    //mostrar primer número
    card1 = document.getElementById(id);
    firstResult = numbers[id];
    card1.innerHTML = firstResult;

    //deshabilitar primer boton
    card1.disabled = true;
  } else if (uncoveredCards === 2) {
    card2 = document.getElementById(id);
    secondResult = numbers[id];
    card2.innerHTML = secondResult;

    card2.disabled = true;

    //incrementar movimientos
    move++;
    showMove.innerHTML = `Movimientos: ${move}`;

    if (firstResult === secondResult) {
      //contador tarjetas destapadas
      uncoveredCards = 0;

      //incrementar aciertos
      hits++;
      showHits.innerHTML = `Aciertos: ${hits}`;

      if (hits === 8) {
        showHits.innerHTML = `Aciertos: ${hits} yeaaah `;
        // mostrarTiempo = `fANTASTICO SOLO TARDASTE {}
        showMove.innerHTML = `Movimientos: ${move}`;
      }
    } else {
      //mostrar momentaneamente
      setTimeout(() => {
        card1.innerHTML = "";
        card2.innerHTML = "";
        card1.disabled = false;
        card2.disabled = false;
        uncoveredCards = 0;
      }, 800);
    }
  }
}
