"use strict";

export default class Popup {
  constructor() {
    this.popup = document.querySelector(".popUp");
    this.popupText = document.querySelector(".popUpText");
    this.replay = document.querySelector(".replay");
    this.replay.addEventListener("click", () => {
      this.onClick && this.onClick();
      this.hide();
    });
  }

  setClickListener(onClick) {
    this.onClick = onClick;
  }

  hide() {
    this.popup.classList.add("popUp--hidden");
  }

  show(text) {
    this.popupText.innerText = text;
    this.popup.classList.remove("popUp--hidden");
  }
}
