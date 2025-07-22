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
const objectSize = 15;
const rotateObjectFrom = 50;

// crocodile parameters
const crocodileSize = 700;
const crocodileXFrom = keyX + 18;
const crocodileYFrom = keyY - 10;

// drop parameters
const dropWidth = 39;
const dropHeight = 59;
const dropMoveGap = 60;
const dropCycleDelay = 300;
const dropFrom = 1500;
const dropCycleCount = 3;

// animation vars
let keyScale = keyScaleFrom;
let crocodileX = crocodileXFrom;
let crocodileY = crocodileYFrom;
let dropFromStage = dropFrom;
let dropCycle = dropCycleCount;
let dropYPosition = 0;
let dropScale = 0;
let dropOpacity = 1;
let objectScale = 0;
let objects = {
  flamingo: {
    x: keyX,
    y: keyY,
    xTo: keyX - 15,
    yTo: keyY - 10,
    rotate: rotateObjectFrom,
  },
  leaf: {
    x: keyX,
    y: keyY,
    xTo: keyX + 18,
    yTo: keyY - 20,
    rotate: rotateObjectFrom,
  },
  saturn: {
    x: keyX,
    y: keyY,
    xTo: keyX + 16,
    yTo: keyY + 15,
    rotate: rotateObjectFrom,
  },
  snowflake: {
    x: keyX,
    y: keyY,
    xTo: keyX + 10,
    yTo: keyY,
    rotate: rotateObjectFrom,
  },
  watermelon: {
    x: keyX,
    y: keyY,
    xTo: keyX - 20,
    yTo: keyY + 12,
    rotate: rotateObjectFrom,
  },
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
  const durationOut = 600;
  const durationIn = 600;
  const progressOut = getProgress(passed, from, durationOut, easeOut);
  const progressIn = getProgress(
      passed,
      from + durationOut,
      durationIn,
      easeIn
  );
  const ws = ww / 100;
  const hs = wh / 100;
  const size = Math.min(ws, hs) * objectSize;

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
        objects[key].x * ws - size / 2,
        objects[key].y * hs - size / 2,
        size,
        size
    );
    loseCtx.restore();
  }
};

const drawCrocodile = (passed) => {
  const from = 900;
  const duration = 600;
  const progress = getProgress(passed, from, duration, easeOut);
  const ws = ww / 100;
  const hs = wh / 100;
  const x = keyX * ws;
  const y = keyY * hs;
  const keyCircleYCenter = y - keyHeight / 4.7;

  crocodileX = getAnimationTick(x + crocodileSize / 2, x, progress);
  crocodileY = getAnimationTick(
      y - crocodileSize / 7,
      y + keyHeight / 5,
      progress
  );

  loseCtx.beginPath();
  loseCtx.moveTo(x + keyWidth / 2, wh);
  loseCtx.lineTo(x + keyWidth / 2, y + keyHeight / 2);
  loseCtx.lineTo(x + keyWidth / 3, y);
  loseCtx.arc(
      x,
      keyCircleYCenter,
      keyWidth / 2,
      0.2 * Math.PI,
      1.5 * Math.PI,
      true
  );
  loseCtx.lineTo(x, 0);
  loseCtx.lineTo(0, 0);
  loseCtx.lineTo(0, wh);
  loseCtx.clip();

  loseCtx.drawImage(
      images.crocodile,
      crocodileX - crocodileSize / 2,
      crocodileY - crocodileSize / 2,
      crocodileSize,
      crocodileSize
  );
};

const drawDrop = (passed) => {
  const duration = 400;
  const scaleProgress = getProgress(passed, dropFromStage, duration, easeOut);
  const moveProgress = getProgress(
      passed,
      dropFromStage + duration,
      duration,
      easeOut
  );
  const opacityProgress = getProgress(
      passed,
      dropFromStage + duration + duration / 2,
      duration,
      easeOut
  );
  const ws = ww / 100;
  const hs = wh / 100;
  const x = keyX * ws;
  const y = keyY * hs;
  const dropX = x - crocodileSize / 25;
  const dropYFrom = y + crocodileSize / 11;
  const dropYTo = dropYFrom + dropMoveGap;

  if (passed === 0) {
    dropFromStage = dropFrom;
    dropCycle = dropCycleCount;
  }

  if (opacityProgress === 1 && dropCycle - 1) {
    dropFromStage += duration * 3 + dropCycleDelay;
    dropCycle -= 1;
  }

  dropScale = scaleProgress * 1;
  dropYPosition = getAnimationTick(dropYFrom, dropYTo, moveProgress);
  dropOpacity = 1 - opacityProgress * 1;
  scaleCtx(loseCtx, dropX, dropYFrom, dropScale, dropScale);
  loseCtx.globalAlpha = dropOpacity;

  loseCtx.drawImage(
      images.drop,
      dropX - dropWidth / 2,
      dropYPosition,
      dropWidth,
      dropHeight
  );
};

const draws = [drawKey, drawObjects, drawCrocodile, drawDrop];

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
