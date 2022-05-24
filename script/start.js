"use strict";

const playButton = document.querySelector(".playButton");
const timer = document.querySelector(".timer");
const counter = document.querySelector(".counter");
const field = document.querySelector(".gameField");

const minusSize = 50;
const itemDefault = 10;
const minX = 0;
const minY = 0;
const maxX = field.getBoundingClientRect().width - minusSize;
const maxY = field.getBoundingClientRect().height - minusSize;

function createItems(type) {
  for (let i = 0; i < itemDefault; i++) {
    const item = document.createElement("img");
    item.setAttribute("class", "carrot");
    item.setAttribute("src", "./assets/img/carrot" + ".png");
    const x = getRandomNumber(minX, maxX);
    const y = getRandomNumber(minY, maxY);
    item.style.cssText = `position: absolute; width: 3em; height: 3em; left: ${x}px; top: ${y}px`;
    field.append(item);
  }
  for (let i = 0; i < itemDefault; i++) {
    const item = document.createElement("img");
    item.setAttribute("class", "bug");
    item.setAttribute("src", "./assets/img/bug" + ".png");
    field.append(item);
    const x = getRandomNumber(minX, maxX);
    const y = getRandomNumber(minY, maxY);
    item.style.cssText = `position: absolute; width: 3em; height: 3em; left: ${x}px; top: ${y}px`;
  }
}

const getRandomNumber = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
};

const showIcons = () => {
  timer.style.cssText = "opacity: 1";
  counter.style.cssText = "opacity: 1";
  createItems("bug");
};

playButton.addEventListener("click", showIcons);
