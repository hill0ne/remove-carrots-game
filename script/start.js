"use strict";

const game = document.querySelector(".game");
const field = document.querySelector(".gameField");
const playButton = document.querySelector(".playButton");
const timer = document.querySelector(".timer");
const counter = document.querySelector(".counter");
const popup = document.querySelector(".popUp");
const popupHidden = document.querySelector(".popUp--hidden");
const popupText = document.querySelector(".popUpText");

let defaultTime = 10;
let interval = undefined;

const MINIMUN_SIZE = 50;
const CARROT = 10;
const BUG = 10;

const minX = 0;
const minY = 0;
const maxX = field.getBoundingClientRect().width - MINIMUN_SIZE;
const maxY = field.getBoundingClientRect().height - MINIMUN_SIZE;

let gameStatus = false;
const scroe = 0;

playButton.addEventListener("click", () => {
  if (gameStatus) {
    stopGame();
  } else {
    startGame();
  }
  gameStatus = !gameStatus;
});

function startGame() {
  initGame();
  showIcons();
  startTimer();
  showStopButton();
}

function initGame() {
  field.innerHTML = "";
  counter.innerText = CARROT;
  createItems();
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
  const icon = document.querySelector(".fa-play");
  icon.classList.add("fa-stop");
}

function startTimer() {
  let remainingSec = defaultTime;
  updateTimer(remainingSec);
  interval = setInterval(() => {
    if (remainingSec <= 0) {
      clearInterval(interval);
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

function stopGame() {
  stopTimer();
  hideStopButton();
  showPopUp("REPLAY?");
}

function stopTimer() {
  clearInterval(interval);
}

function hideStopButton() {
  playButton.style.visibility = "hidden";
}

function showPopUp(text) {
  console.log(popup.classList);
  popupText.innerText = text;
  console.log(popup.classList);
  popup.classList.remove("popUp--hidden");
}
