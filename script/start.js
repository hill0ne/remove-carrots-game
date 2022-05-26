"use strict";

const game = document.querySelector(".game");
const field = document.querySelector(".gameField");
const playButton = document.querySelector(".playButton");
const timer = document.querySelector(".timer");
const counter = document.querySelector(".counter");
const popup = document.querySelector(".popUp");
const popupHidden = document.querySelector(".popUp--hidden");
const popupText = document.querySelector(".popUpText");
const replay = document.querySelector(".replay");

let defaultTime = 5;
let interval = undefined;

const MINIMUN_SIZE = 50;
const CARROT = 5;
const BUG = 10;

const minX = 0;
const minY = 0;
const maxX = field.getBoundingClientRect().width - MINIMUN_SIZE;
const maxY = field.getBoundingClientRect().height - MINIMUN_SIZE;

let gameStatus = false;
let score = 0;

playButton.addEventListener("click", () => {
  if (gameStatus) {
    // false
    stopGame();
  } else {
    // true
    startGame();
  }
});

replay.addEventListener("click", () => {
  gameStatus = true;
  startGame();
  hidePopUp();
});

field.addEventListener("click", onFieldClick);

function startGame() {
  gameStatus = true;
  initGame();
  showIcons();
  startTimer();
  showStopButton();
}

function initGame() {
  score = 0;
  field.innerHTML = "";
  counter.innerText = CARROT;
  createItems();
}

function stopGame() {
  gameStatus = false;
  stopTimer();
  hideStopButton();
  showPopUp("REPLAY?");
}

function finishGame(win) {
  gameStatus = false;
  stopTimer();
  hideStopButton();
  showPopUp(win ? "YOU WIN ! " : "YOU LOSE :( ");
}

const showIcons = () => {
  timer.style.cssText = "visibility: visible";
  counter.style.cssText = "visibility: visible";
};

const getRandomNumber = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
};

function createItems() {
  for (let i = 0; i < CARROT; i++) {
    const item = document.createElement("img");
    item.setAttribute("class", "carrot");
    item.setAttribute("src", "./assets/img/carrot" + ".png");
    const x = getRandomNumber(minX, maxX);
    const y = getRandomNumber(minY, maxY);
    item.style.cssText = `position: absolute; width: 3em; height: 3em; left: ${x}px; top: ${y}px`;
    field.append(item);
  }
  for (let i = 0; i < BUG; i++) {
    const item = document.createElement("img");
    item.setAttribute("class", "bug");
    item.setAttribute("src", "./assets/img/bug" + ".png");
    field.append(item);
    const x = getRandomNumber(minX, maxX);
    const y = getRandomNumber(minY, maxY);
    item.style.cssText = `position: absolute; width: 3em; height: 3em; left: ${x}px; top: ${y}px`;
  }
}

function showStopButton() {
  const icon = document.querySelector(".playIcon");
  icon.classList.remove("fa-play");
  icon.classList.add("fa-stop");
}

function startTimer() {
  let remainingSec = defaultTime;
  updateTimer(remainingSec);
  interval = setInterval(() => {
    if (remainingSec <= 0) {
      clearInterval(interval);
      finishGame(score === CARROT);
      return;
    }
    updateTimer(--remainingSec);
  }, 1000);
}

function updateTimer(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  timer.innerHTML = `${minutes}:${seconds}`;
}

function stopTimer() {
  clearInterval(interval);
}

function hideStopButton() {
  playButton.style.visibility = "hidden";
}

function showPopUp(text) {
  popupText.innerText = text;
  popup.classList.remove("popUp--hidden");
}

function hidePopUp() {
  popup.classList.add("popUp--hidden");
  playButton.style.visibility = "visible";
}

function onFieldClick(event) {
  if (!gameStatus) {
    return;
  }
  const name = event.target.className;
  if (name === "carrot") {
    event.target.remove();
    handleCounter();
    if (score === CARROT) {
      finishGame(true);
    }
  } else if (name === "bug") {
    finishGame(false);
  }
}

function handleCounter() {
  ++score;
  counter.innerText = CARROT - score;
}
