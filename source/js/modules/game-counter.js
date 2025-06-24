const element = document.querySelector(`.game__counter`);
const [minutesElement, secondsElement] = element.querySelectorAll(`span`);
let start;
const MAX_TIMER = 300000;

const drawCloak = (timestamp) => {
  if (start === undefined) {
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

    requestAnimationFrame(drawCloak);
  }
};

export default drawCloak;
