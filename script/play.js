const game = document.querySelector(".game");
const timer = document.querySelector(".timer");

let defaultTime = 10;
let setTimer = undefined;

function updateTimer(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  timer.innerHTML = `${minutes}:${seconds}`;
}

function startTimer() {
  let remainingSec = defaultTime;
  updateTimer(remainingSec);
  setTimer = setInterval(() => {
    if (remainingSec <= 0) {
      clearInterval(setTimer);
      return;
    }
    updateTimer(--remainingSec);
  }, 1000);
}

game.addEventListener("click", startTimer);
