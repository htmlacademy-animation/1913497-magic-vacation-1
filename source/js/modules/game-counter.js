const element = document.querySelector(`.game__counter`);
const screenGame = document.querySelector(`.screen--game`);

const [minutesElement, secondsElement] = element.querySelectorAll(`span`);
let start;
const MAX_TIMER = 300000;

const drawCloak = (timestamp) => {
  if (screenGame.classList.contains(`active`)) {
    if (!start) {
      start = timestamp;
    }

    const elapsed = timestamp - start;
    if (Math.min(elapsed, MAX_TIMER) < MAX_TIMER) {
      const currentTime = MAX_TIMER - elapsed;
      let seconds = Math.floor(currentTime / 1000);
      const minutes = Math.floor(seconds / 60);
      seconds = Math.floor(seconds % 60);

      minutesElement.innerText = `0` + minutes;
      secondsElement.innerText =
        String(seconds).length > 1 ? seconds : `0` + seconds;
    }
  } else {
    start = null;
    minutesElement.innerText = `05`;
    secondsElement.innerText = `00`;
  }
  setTimeout(() => {
    requestAnimationFrame(drawCloak);
  }, 1000);
};

export default drawCloak;
