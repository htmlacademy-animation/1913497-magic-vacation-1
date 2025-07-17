import {
  easeIn,
  easeOut,
  getAnimationTick,
  getProgress,
  rotateCtx,
  scaleCtx,
} from "./utils";

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

// objects parameters
const objectSize = 150;
const rotateObjectFrom = 50;

// animation vars
let keyScale = keyScaleFrom;
let objectScale = 0;
let objects = {
  flamingo: {
    x: keyX,
    y: keyY,
    xTo: 35,
    yTo: 50,
    rotate: rotateObjectFrom,
  },
  // leaf: {
  //   x: keyX,
  //   y: keyY,
  //   xTo: 35,
  //   yTo: 50,
  //   rotate: rotateObjectFrom,
  // },
  // saturn: {
  //   x: keyX,
  //   y: keyY,
  //   xTo: 35,
  //   yTo: 50,
  //   rotate: rotateObjectFrom,
  // },
  // snowflake: {
  //   x: keyX,
  //   y: keyY,
  //   xTo: 35,
  //   yTo: 50,
  //   rotate: rotateObjectFrom,
  // },
  // watermelon: {
  //   x: keyX,
  //   y: keyY,
  //   xTo: 35,
  //   yTo: 50,
  //   rotate: rotateObjectFrom,
  // },
};

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

const drawObjects = (passed) => {
  const from = 300;
  const durationOut = 500;
  const durationIn = 400;
  const progressOut = getProgress(passed, from, durationOut, easeOut);
  const progressIn = getProgress(
      passed,
      from + durationOut,
      durationIn,
      easeIn
  );
  const ws = ww / 100;
  const hs = wh / 100;

  objectScale = getAnimationTick(0, 1, progressOut);

  for (const [key, value] of Object.entries(objects)) {
    objects[key].x = getAnimationTick(keyX, value.xTo, progressOut);
    if (!progressIn) {
      objects[key].y = getAnimationTick(keyY, value.yTo, progressOut);
    } else {
      objects[key].y = getAnimationTick(value.yTo, 120, progressIn);
    }
    objects[key].rotate = getAnimationTick(
        keyX > value.xTo ? rotateObjectFrom : -rotateObjectFrom,
        0,
        progressOut
    );

    loseCtx.save();
    scaleCtx(loseCtx, objects[key].x * ws, objects[key].y * hs, objectScale);
    rotateCtx(
        loseCtx,
        objects[key].rotate,
        objects[key].x * ws,
        objects[key].y * hs
    );
    loseCtx.drawImage(
        images[key],
        objects[key].x * ws - objectSize / 2,
        objects[key].y * hs - objectSize / 2,
        objectSize,
        objectSize
    );
    loseCtx.restore();
  }
};

const draws = [drawKey, drawObjects];

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
