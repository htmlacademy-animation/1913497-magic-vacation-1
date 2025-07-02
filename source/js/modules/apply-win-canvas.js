// глобальные переменные размеров окна
let ww = window.innerWidth;
let wh = window.innerHeight;
let start;

// глобальные переменные canvas
const winCanvasDom = document.getElementById(`win-canvas`);
const winCtx = winCanvasDom.getContext(`2d`);
const prizeScreen = document.getElementById(`result`);

// создаём объект для изображения постера
let iceImgDom = new Image();
iceImgDom.src = `/img/module-4/win-primary-images/ice.png`;
// создаём объект для изображения постера
let calfImgDom = new Image();
calfImgDom.src = `/img/module-4/win-primary-images/sea-calf-2.png`;

// ice parameters
let iceWidth = 408;
let iceHeight = 167;

// calf parameters
let calfWidth = 400;
let calfHeight = 400;

const moveUpCalf = (passed) => {
  const duration = 300;
  const progress = Math.min(passed / duration, 1);

  if (passed > 0 && passed < duration) {
    winCtx.translate(ww / 2, wh - progress * calfHeight);
    winCtx.rotate((15 * Math.PI) / 180);
    winCtx.drawImage(iceImgDom, -iceWidth / 2, -iceHeight / 2);
    winCtx.drawImage(
        calfImgDom,
        -calfWidth / 2,
        -calfHeight / 1.5,
        calfWidth,
        calfHeight
    );
  }
};

const rotateLeftCalf = (passed) => {
  const duration = 300;
  const animationStart = 300;
  const progress = Math.min((passed - animationStart) / duration, 1);
  if (passed > animationStart && passed < animationStart + duration) {
    winCtx.translate(ww / 2, wh - calfHeight);
    winCtx.rotate(((15 - progress * 25) * Math.PI) / 180);
    winCtx.drawImage(iceImgDom, -iceWidth / 2, -iceHeight / 2);
    winCtx.drawImage(
        calfImgDom,
        -calfWidth / 2,
        -calfHeight / 1.5,
        calfWidth,
        calfHeight
    );
  }
};

// функция отрисовки сцены с постером
const draw = (timestamp) => {
  if (prizeScreen.classList.contains(`screen--show`)) {
    if (!start) {
      start = timestamp;
    }
    winCanvasDom.width = ww;
    winCanvasDom.height = wh;
    const passed = timestamp - start;
    winCtx.clearRect(0, 0, ww, wh);
    winCtx.save();

    moveUpCalf(passed);
    rotateLeftCalf(passed);
    winCtx.restore();
  } else {
    // screen unactive
    start = null;
    winCtx.clearRect(0, 0, ww, wh);
  }

  requestAnimationFrame(draw);
};

export default draw;
