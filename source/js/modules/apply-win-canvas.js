import {easeOut, getAnimationTick, stageHelper} from "./canvas-utils";

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

// ice parameters
let iceWidth = 408;
let iceHeight = 167;
let iceX = -iceWidth;
let iceY = -iceHeight;

// calf parameters
let calfWidth = 400;
let calfHeight = 400;
let calfXPosition = ww / 2 + iceWidth / 2;
let calfYPosition = wh / 1.7;
let calfX = -calfWidth;
let calfY = -calfHeight * 0.9;

// animation vars
let translateCalfY = 0;
let rotateCalf = 0;

const drawCalf = (passed) => {
  const durations = [300, 200, 200, 250, 250, 300, 300, 400];
  const animationDuration = durations.reduce((acc, b) => acc + b, 0);
  const translateYChanges = [
    wh,
    calfYPosition,
    calfYPosition,
    calfYPosition + 50,
    calfYPosition + 50,
    calfYPosition - 20,
    calfYPosition - 20,
    calfYPosition + 20,
    calfYPosition,
  ];
  const rotateChanges = [10, 10, -8, -8, 5, 5, -5, -5, 0];

  durations.forEach((_, index) => {
    stageHelper(0, passed, durations, index, (progress) => {
      const easedProgress = easeOut(progress);
      const translateFrom = translateYChanges[index];
      const translateTo = translateYChanges[index + 1];
      const rotateFrom = rotateChanges[index];
      const rotateTo = rotateChanges[index + 1];

      if (!index) {
        translateCalfY = translateYChanges[0];
        rotateCalf = rotateChanges[0];
      }

      translateCalfY = index
        ? getAnimationTick(translateFrom, translateTo, progress)
        : getAnimationTick(translateFrom, translateTo, easedProgress);
      rotateCalf = getAnimationTick(rotateFrom, rotateTo, progress);
      winCtx.translate(calfXPosition, translateCalfY);
      winCtx.rotate((rotateCalf * Math.PI) / 180);
      winCtx.drawImage(iceImgDom, iceX, iceY);
      winCtx.drawImage(calfImgDom, calfX, calfY, calfWidth, calfHeight);
    });
  });

  // stageHelper(0, passed, durations, 0, (progress) => {
  //   const easedProgress = easeOut(progress);
  //   winCtx.translate(calfXPosition, wh - easedProgress * (wh - calfYPosition));
  //   winCtx.rotate((10 * Math.PI) / 180);
  //   winCtx.drawImage(iceImgDom, iceX, iceY);
  //   winCtx.drawImage(calfImgDom, calfX, calfY, calfWidth, calfHeight);
  // });
  // stageHelper(0, passed, durations, 1, (progress) => {
  //   winCtx.translate(calfXPosition, calfYPosition);
  //   winCtx.rotate(((10 - 18 * progress) * Math.PI) / 180);
  //   winCtx.drawImage(iceImgDom, iceX, iceY);
  //   winCtx.drawImage(calfImgDom, calfX, calfY, calfWidth, calfHeight);
  // });
  // stageHelper(0, passed, durations, 2, (progress) => {
  //   winCtx.translate(calfXPosition, calfYPosition + progress * 50);
  //   winCtx.rotate((-8 * Math.PI) / 180);
  //   winCtx.drawImage(iceImgDom, iceX, iceY);
  //   winCtx.drawImage(calfImgDom, calfX, calfY, calfWidth, calfHeight);
  // });
  // stageHelper(0, passed, durations, 3, (progress) => {
  //   winCtx.translate(calfXPosition, calfYPosition + 50);
  //   winCtx.rotate(((-8 + 13 * progress) * Math.PI) / 180);
  //   winCtx.drawImage(iceImgDom, iceX, iceY);
  //   winCtx.drawImage(calfImgDom, calfX, calfY, calfWidth, calfHeight);
  // });
  // stageHelper(0, passed, durations, 4, (progress) => {
  //   winCtx.translate(calfXPosition, calfYPosition + 50 - 70 * progress);
  //   winCtx.rotate((5 * Math.PI) / 180);
  //   winCtx.drawImage(iceImgDom, iceX, iceY);
  //   winCtx.drawImage(calfImgDom, calfX, calfY, calfWidth, calfHeight);
  // });
  // stageHelper(0, passed, durations, 5, (progress) => {
  //   winCtx.translate(calfXPosition, calfYPosition - 20);
  //   winCtx.rotate(((5 - 10 * progress) * Math.PI) / 180);
  //   winCtx.drawImage(iceImgDom, iceX, iceY);
  //   winCtx.drawImage(calfImgDom, calfX, calfY, calfWidth, calfHeight);
  // });
  // stageHelper(0, passed, durations, 6, (progress) => {
  //   winCtx.translate(calfXPosition, calfYPosition - 20 + 40 * progress);
  //   winCtx.rotate((-5 * Math.PI) / 180);
  //   winCtx.drawImage(iceImgDom, iceX, iceY);
  //   winCtx.drawImage(calfImgDom, calfX, calfY, calfWidth, calfHeight);
  // });
  // stageHelper(0, passed, durations, 7, (progress) => {
  //   winCtx.translate(calfXPosition, calfYPosition + 20 - 20 * progress);
  //   winCtx.rotate(((-5 + 5 * progress) * Math.PI) / 180);
  //   winCtx.drawImage(iceImgDom, iceX, iceY);
  //   winCtx.drawImage(calfImgDom, calfX, calfY, calfWidth, calfHeight);
  // });

  if (passed > animationDuration) {
    winCtx.translate(calfXPosition, calfYPosition);
    winCtx.drawImage(iceImgDom, iceX, iceY);
    winCtx.drawImage(calfImgDom, calfX, calfY, calfWidth, calfHeight);
  }
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
    winCtx.restore();
  } else {
    // screen unactive
    start = null;
    winCtx.clearRect(0, 0, ww, wh);
  }

  requestAnimationFrame(draw);
};

export default draw;
