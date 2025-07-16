import {easeOut, getAnimationTick, getProgress, scaleCtx} from "./utils";

// global window vars
let ww = window.innerWidth;
let wh = window.innerHeight;
let start;

// global canvas vars
const loseCanvasDom = document.getElementById(`lose-canvas`);
const loseCtx = loseCanvasDom.getContext(`2d`);
const prizeScreen = document.getElementById(`result3`);

// create image objects
const images = {
  crocodile: `/img/module-4/lose-images/crocodile.png`,
  drop: `/img/module-4/lose-images/drop.png`,
  flamingo: `/img/module-4/lose-images/flamingo.png`,
  key: `/img/module-4/lose-images/key.png`,
  leaf: `/img/module-4/lose-images/leaf.png`,
  saturn: `/img/module-4/lose-images/saturn.png`,
  snowflake: `/img/module-4/lose-images/snowflake.png`,
  watermelon: `/img/module-4/lose-images/watermelon.png`,
};
for (const [key, value] of Object.entries(images)) {
  const imgDom = new Image();
  imgDom.src = value;
  images[key] = imgDom;
}

// key parameters
const keyWidth = 171;
const keyHeight = 292;
const keyX = 50;
const keyY = 60;
const keyScaleFrom = 0.8;

// animation vars
let keyScale = keyScaleFrom;

const drawKey = (passed) => {
  const duration = 300;
  const progress = getProgress(passed, 0, duration, easeOut);
  const x = (keyX * ww) / 100;
  const y = (keyY * wh) / 100;

  keyScale = getAnimationTick(keyScaleFrom, 1, progress);

  loseCtx.globalAlpha = progress * 1;
  scaleCtx(loseCtx, x, y, keyScale);

  loseCtx.drawImage(
      images.key,
      x - keyWidth / 2,
      y - keyHeight / 2,
      keyWidth,
      keyHeight
  );
};

const draws = [drawKey];

const updateSize = () => {
  ww = window.innerWidth;
  wh = window.innerHeight;
};

const draw = (timestamp) => {
  if (prizeScreen.classList.contains(`screen--show`)) {
    // screen active
    if (!start) {
      start = timestamp;
      window.addEventListener(`resize`, updateSize);
    }

    loseCanvasDom.width = ww;
    loseCanvasDom.height = wh;
    const passed = timestamp - start;
    loseCtx.clearRect(0, 0, ww, wh);

    draws.forEach((func) => {
      loseCtx.save();
      func(passed);
      loseCtx.restore();
    });
  } else {
    // screen unactive
    start = null;
    window.removeEventListener(`resize`, updateSize);
    loseCtx.clearRect(0, 0, ww, wh);
  }

  requestAnimationFrame(draw);
};

export default draw;
