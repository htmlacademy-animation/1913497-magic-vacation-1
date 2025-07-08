import {getAnimationTick} from "./canvas-utils";

// global window vars
let ww = window.innerWidth;
let wh = window.innerHeight;
let start;

// global canvas vars
const winCanvasDom = document.getElementById(`win-canvas`);
const winCtx = winCanvasDom.getContext(`2d`);
const prizeScreen = document.getElementById(`result`);

// create image objects
let iceImgDom = new Image();
iceImgDom.src = `/img/module-4/win-primary-images/ice.png`;
let calfImgDom = new Image();
calfImgDom.src = `/img/module-4/win-primary-images/sea-calf-2.png`;
let snowImgDom = new Image();
snowImgDom.src = `/img/module-4/win-primary-images/snowflake.png`;

// ice parameters
const iceWidth = 408;
const iceHeight = 167;
const iceTransformOriginIndent = iceWidth / 2.8;
const iceX = -iceWidth + iceTransformOriginIndent;
const iceY = -iceHeight;

// calf parameters
const calfSize = 500;
const calfX = -calfSize * 0.9 + iceTransformOriginIndent;
const calfY = -calfSize * 0.82;
const calfXPosition = ww / 2 + iceWidth / 2 - iceTransformOriginIndent;
const calfYPosition = wh / 1.35;

// shows parameters
const leftSnowSize = 200;
const leftSnowX = ww / 2 - calfSize / 2 - leftSnowSize / 1.9;
const leftSnowY = wh / 1.9;
const rightSnowSize = 150;
const rightSnowX = ww / 2 + calfSize / 2 + rightSnowSize / 2;
const rightSnowY = wh / 1.7;
const snowAnimationDelay = 400;
const snowAnimationDuration = 1000;

// animation vars
let translateCalfY = 0;
let rotateCalf = 0;
let showShows = 0;
let snowTranslateFrom = snowAnimationDelay;
let snowTranslateTo = snowTranslateFrom + snowAnimationDuration;
let snowTranslateFromDelayed = snowTranslateFrom + snowAnimationDuration / 3;
let snowTranslateToDelayed = snowTranslateTo + snowAnimationDuration / 3;
let leftSnowTranslateStartPoint = 5;
let rightSnowTranslateStartPoint = 5;
let leftSnowTranslateY = leftSnowTranslateStartPoint;
let rightSnowTranslateY = rightSnowTranslateStartPoint;

const drawCalf = (passed) => {
  const durations = [200, 200, 200, 250, 250, 300, 300, 400];
  const translateYChanges = [
    wh,
    calfYPosition,
    calfYPosition,
    calfYPosition + 50,
    calfYPosition + 50,
    calfYPosition - 20,
    calfYPosition - 20,
    calfYPosition + 10,
    calfYPosition,
  ];
  const rotateChanges = [10, 10, -8, -8, 5, 5, -3, -3, 0];

  let sum = 400;
  durations.forEach((el, index) => {
    const progress = Math.min((passed - sum) / el, 1);
    const translateFrom = translateYChanges[index];
    const translateTo = translateYChanges[index + 1];
    const rotateFrom = rotateChanges[index];
    const rotateTo = rotateChanges[index + 1];

    if (passed > sum && passed < sum + el) {
      translateCalfY = getAnimationTick(translateFrom, translateTo, progress);
      rotateCalf = getAnimationTick(rotateFrom, rotateTo, progress);
    }
    sum += el;
  });
  winCtx.translate(calfXPosition, translateCalfY);
  winCtx.rotate((rotateCalf * Math.PI) / 180);

  winCtx.drawImage(iceImgDom, iceX, iceY);
  winCtx.drawImage(calfImgDom, calfX, calfY, calfSize, calfSize);
  winCtx.setTransform(1, 0, 0, 1, 0, 0);
};

const drawSnows = (passed) => {
  const from = snowAnimationDelay;
  const opacityDuration = 500;
  const opacityProgress = Math.min((passed - from) / opacityDuration, 1);

  if (passed > from && passed < from + opacityDuration) {
    showShows = opacityProgress * 1;
  }

  if (passed > from && passed > snowTranslateFrom && passed < snowTranslateTo) {
    const stageProgress = Math.min(
        (passed - snowTranslateFrom) / snowAnimationDuration,
        1
    );
    leftSnowTranslateY = getAnimationTick(
        leftSnowTranslateStartPoint,
        -leftSnowTranslateStartPoint,
        stageProgress
    );
  } else if (passed > snowTranslateTo) {
    snowTranslateFrom = snowTranslateTo;
    snowTranslateTo += snowAnimationDuration;
    leftSnowTranslateStartPoint = -leftSnowTranslateStartPoint;
  }
  if (
    passed > from &&
    passed > snowTranslateFromDelayed &&
    passed < snowTranslateToDelayed
  ) {
    const stageProgress = Math.min(
        (passed - snowTranslateFromDelayed) / snowAnimationDuration,
        1
    );
    rightSnowTranslateY = getAnimationTick(
        rightSnowTranslateStartPoint,
        -rightSnowTranslateStartPoint,
        stageProgress
    );
  } else if (passed > snowTranslateToDelayed) {
    snowTranslateFromDelayed = snowTranslateToDelayed;
    snowTranslateToDelayed += snowAnimationDuration;
    rightSnowTranslateStartPoint = -rightSnowTranslateStartPoint;
  }

  winCtx.globalAlpha = showShows;

  winCtx.drawImage(
      snowImgDom,
      leftSnowX,
      leftSnowY + leftSnowTranslateY,
      leftSnowSize,
      leftSnowSize
  );
  winCtx.translate(rightSnowX, rightSnowY);
  winCtx.scale(-1, 1);
  winCtx.translate(-rightSnowX, -rightSnowY);
  winCtx.drawImage(
      snowImgDom,
      rightSnowX,
      rightSnowY + rightSnowTranslateY,
      rightSnowSize,
      rightSnowSize
  );
  winCtx.setTransform(1, 0, 0, 1, 0, 0);
};

const draw = (timestamp) => {
  if (prizeScreen.classList.contains(`screen--show`)) {
    // screen active
    if (!start) {
      start = timestamp;
    }
    winCanvasDom.width = ww;
    winCanvasDom.height = wh;
    const passed = timestamp - start;
    winCtx.clearRect(0, 0, ww, wh);
    winCtx.save();

    drawCalf(passed);
    drawSnows(passed);
    winCtx.restore();
  } else {
    // screen unactive
    start = null;
    winCtx.clearRect(0, 0, ww, wh);
  }

  requestAnimationFrame(draw);
};

export default draw;
