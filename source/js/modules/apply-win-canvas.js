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

// ice parameters
const iceWidth = 408;
const iceHeight = 167;
const iceTransformOriginIndent = iceWidth / 2.8;
const iceX = -iceWidth + iceTransformOriginIndent;
const iceY = -iceHeight;

// calf parameters
const calfWidth = 500;
const calfHeight = 500;
const calfX = -calfWidth * 0.9 + iceTransformOriginIndent;
const calfY = -calfHeight * 0.82;
const calfXPosition = ww / 2 + iceWidth / 2 - iceTransformOriginIndent;
const calfYPosition = wh / 1.35;

// animation vars
let translateCalfY = 0;
let rotateCalf = 0;

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
  winCtx.drawImage(calfImgDom, calfX, calfY, calfWidth, calfHeight);
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
    winCtx.restore();
  } else {
    // screen unactive
    start = null;
    winCtx.clearRect(0, 0, ww, wh);
  }

  requestAnimationFrame(draw);
};

export default draw;
