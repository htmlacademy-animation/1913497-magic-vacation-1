import {
  cubicBezier,
  easeOut,
  getAnimationTick,
  getBezierPoint,
  getProgress,
} from "./utils";

// global window vars
let ww = window.innerWidth;
let wh = window.innerHeight;
let start;

// global canvas vars
const winCanvasDom = document.getElementById(`win-canvas`);
const winCtx = winCanvasDom.getContext(`2d`);
const prizeScreen = document.getElementById(`result`);

// create image objects
const images = {
  ice: `/img/module-4/win-primary-images/ice.png`,
  calf: `/img/module-4/win-primary-images/sea-calf-2.png`,
  snow: `/img/module-4/win-primary-images/snowflake.png`,
  tree1: `/img/module-4/win-primary-images/tree.png`,
  tree2: `/img/module-4/win-primary-images/tree 2.png`,
  airplane: `/img/module-4/win-primary-images/airplane.png`,
};
for (const [key, value] of Object.entries(images)) {
  const imgDom = new Image();
  imgDom.src = value;
  images[key] = imgDom;
}

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

// tree parameters
const largeTreeWidth = 50;
const largeTreeHeight = 159;
const largeTreeX = ww / 2 + largeTreeWidth;
const largeTreeY = wh / 2;
const smallTreeWidth = 38;
const smallTreeHeight = 101;
const smallTreeX = ww / 2 + largeTreeWidth * 2;
const smallTreeY = wh / 2 + smallTreeHeight / 1.7;
const treeAnimationDelay = 700;
const treeTranslateFrom = 200;

// back parameters
const backColor = `#B0C7FF`;
const backXAxios = ww / 2 - calfSize / 8;
const backTopYPoint = wh / 2.4;
const backStartRadius = 5;
const maxBackCicleRadius = 185;
const traceFinalPointX = backXAxios + maxBackCicleRadius * 2.7;
const traceFinalPointY = backTopYPoint + maxBackCicleRadius * 0.5;

// airplane parameters
const airplaneSize = 200;
const airplaneOffset = 46;
const aitplaneRotateFrom = 80;
const airplanePathPoint1 = {x: backXAxios, y: backTopYPoint};
const airplanePathPoint2 = {
  x: backXAxios + (traceFinalPointX - backXAxios) * 0.4,
  y: backTopYPoint,
};
const airplanePathPoint3 = {
  x: traceFinalPointX - (traceFinalPointX - backXAxios) / 2,
  y: traceFinalPointY + (traceFinalPointY - backTopYPoint) * 1.5,
};
const airplanePathPoint4 = {x: traceFinalPointX, y: traceFinalPointY};

// animation vars
let translateCalfY = 0;
let rotateCalf = 0;
let showSnows = 0;
let snowTranslateFrom = snowAnimationDelay;
let snowTranslateTo = snowTranslateFrom + snowAnimationDuration;
let snowTranslateFromDelayed = snowTranslateFrom + snowAnimationDuration / 3;
let snowTranslateToDelayed = snowTranslateTo + snowAnimationDuration / 3;
let leftSnowTranslateStartPoint = 5;
let rightSnowTranslateStartPoint = 5;
let leftSnowTranslateY = leftSnowTranslateStartPoint;
let rightSnowTranslateY = rightSnowTranslateStartPoint;
let showTree = 0;
let translateYTree = 0;
let backCenterYPoint = backTopYPoint;
let backRadius = backStartRadius;
let backOpacity = 0;
let airplaneXPosition = backXAxios;
let airplaneYPosition = backTopYPoint;
let airplaneRotate = aitplaneRotateFrom;
let curveFirstPoint = {x: 0, y: 0};
let curveSecondPoint = {x: 0, y: 0};
let arcPointY = 0;

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
    const progress = getProgress(passed, sum, el);
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

  winCtx.drawImage(images.ice, iceX, iceY);
  winCtx.drawImage(images.calf, calfX, calfY, calfSize, calfSize);
};

const drawSnows = (passed) => {
  const from = snowAnimationDelay;
  const opacityDuration = 500;
  const opacityProgress = getProgress(passed, from, opacityDuration, easeOut);
  const leftStageProgress = getProgress(
      passed,
      snowTranslateFrom,
      snowAnimationDuration
  );
  const rightStageProgress = getProgress(
      passed,
      snowTranslateFromDelayed,
      snowAnimationDuration
  );
  showSnows = opacityProgress * 1;

  if (passed > snowTranslateTo) {
    snowTranslateFrom = snowTranslateTo;
    snowTranslateTo += snowAnimationDuration;
    leftSnowTranslateStartPoint = -leftSnowTranslateStartPoint;
  } else {
    leftSnowTranslateY = getAnimationTick(
        leftSnowTranslateStartPoint,
        -leftSnowTranslateStartPoint,
        leftStageProgress
    );
  }
  if (passed > snowTranslateToDelayed) {
    snowTranslateFromDelayed = snowTranslateToDelayed;
    snowTranslateToDelayed += snowAnimationDuration;
    rightSnowTranslateStartPoint = -rightSnowTranslateStartPoint;
  } else {
    rightSnowTranslateY = getAnimationTick(
        rightSnowTranslateStartPoint,
        -rightSnowTranslateStartPoint,
        rightStageProgress
    );
  }

  winCtx.globalAlpha = showSnows;

  winCtx.drawImage(
      images.snow,
      leftSnowX,
      leftSnowY + leftSnowTranslateY,
      leftSnowSize,
      leftSnowSize
  );

  winCtx.translate(rightSnowX, rightSnowY);
  winCtx.scale(-1, 1);
  winCtx.translate(-rightSnowX, -rightSnowY);
  winCtx.drawImage(
      images.snow,
      rightSnowX,
      rightSnowY + rightSnowTranslateY,
      rightSnowSize,
      rightSnowSize
  );
};

const drawTree = (passed) => {
  const from = treeAnimationDelay;
  const duration = 400;
  const progress = getProgress(passed, from, duration, easeOut);

  showTree = progress * 1;
  translateYTree = getAnimationTick(
      largeTreeY + treeTranslateFrom,
      largeTreeY,
      progress
  );

  winCtx.globalAlpha = showTree;
  winCtx.drawImage(
      images.tree1,
      largeTreeX,
      translateYTree,
      largeTreeWidth,
      largeTreeHeight
  );
};

const drawBackAndAirPlane = (passed) => {
  const from = 200;
  const opacityDuration = 300;
  const animationDuration = 800;
  const animationProgress = getProgress(passed, from, animationDuration);
  const opacityProgress = getProgress(passed, from, opacityDuration, easeOut);
  const airplaneProgress = cubicBezier(animationProgress, 0.2, 0, 0.4, 1);

  backOpacity = opacityProgress * 1;

  backRadius = getAnimationTick(
      backStartRadius,
      maxBackCicleRadius,
      airplaneProgress
  );
  backCenterYPoint = getAnimationTick(
      backTopYPoint + backStartRadius,
      backTopYPoint + maxBackCicleRadius,
      airplaneProgress
  );
  const currentPos = getBezierPoint(
      airplaneProgress,
      airplanePathPoint1,
      airplanePathPoint2,
      airplanePathPoint3,
      airplanePathPoint4
  );

  curveFirstPoint = {
    x: getAnimationTick(
        backXAxios + (airplaneXPosition - backXAxios) * 0.6,
        backXAxios + (airplaneXPosition - backXAxios) * 0.4,
        airplaneProgress
    ),
    y: getAnimationTick(
        backTopYPoint - (airplaneYPosition - backTopYPoint) * 0.25,
        backTopYPoint,
        airplaneProgress
    ),
  };
  curveSecondPoint = {
    x: getAnimationTick(
        airplaneXPosition - (airplaneXPosition - backXAxios) / 8,
        airplaneXPosition - (airplaneXPosition - backXAxios) / 2,
        airplaneProgress
    ),
    y: getAnimationTick(
        backTopYPoint,
        airplaneYPosition + (airplaneYPosition - backTopYPoint) * 1.5,
        airplaneProgress
    ),
  };
  arcPointY = getAnimationTick(
      backTopYPoint + backRadius * 1.65,
      backTopYPoint + backRadius * 2,
      airplaneProgress
  );
  airplaneXPosition = currentPos.x;
  airplaneYPosition = currentPos.y;
  airplaneRotate = getAnimationTick(aitplaneRotateFrom, 0, airplaneProgress);

  winCtx.globalAlpha = backOpacity;
  winCtx.arc(backXAxios, backCenterYPoint, backRadius, 0, 2 * Math.PI);
  winCtx.moveTo(airplanePathPoint1.x, airplanePathPoint1.y);
  winCtx.bezierCurveTo(
      curveFirstPoint.x,
      curveFirstPoint.y,
      curveSecondPoint.x,
      curveSecondPoint.y,
      airplaneXPosition,
      airplaneYPosition
  );
  winCtx.quadraticCurveTo(
      airplaneXPosition - (airplaneXPosition - backXAxios) / 3,
      arcPointY,
      backXAxios,
      backTopYPoint + backRadius * 2
  );
  winCtx.fillStyle = backColor;
  winCtx.fill();

  winCtx.translate(airplaneXPosition, airplaneYPosition);
  winCtx.rotate((airplaneRotate * Math.PI) / 180);
  winCtx.drawImage(
      images.airplane,
      -airplaneOffset,
      -airplaneSize + airplaneOffset,
      airplaneSize,
      airplaneSize
  );
};

const draws = [
  drawBackAndAirPlane,
  drawTree,
  () =>
    winCtx.drawImage(
        images.tree2,
        smallTreeX,
        smallTreeY,
        smallTreeWidth,
        smallTreeHeight
    ),
  drawCalf,
  drawSnows,
];

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

    draws.forEach((func) => {
      winCtx.save();
      func(passed);
      winCtx.restore();
    });
  } else {
    // screen unactive
    start = null;
    winCtx.clearRect(0, 0, ww, wh);
  }

  requestAnimationFrame(draw);
};

export default draw;
