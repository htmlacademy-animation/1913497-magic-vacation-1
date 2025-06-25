const prizesIcons = document.querySelectorAll(`.prizes__icon`);
const screenPrizes = document.querySelector(`.screen--prizes`);
let start;

const PRIZE1_SRC = `img/prize1.svg`;
const PRIZE2_SRC = `img/prize2.svg`;
const PRIZE3_SRC_FROM = `img/prize3-from.svg`;
const PRIZE3_SRC_TO = `img/prize3-to.svg`;
const RIGHT_SHIFTING = 300;

const calculateShiftFromRight = (passed, duration, animationStart) => {
  return `translateX(${
    RIGHT_SHIFTING - ((passed - animationStart) / duration) * RIGHT_SHIFTING
  }px)`;
};

const calculateAppearance = (passed, duration, animationStart) => {
  return (passed - animationStart) / duration;
};

const applyPrizeAnimation = (timestamp) => {
  const images = [];
  prizesIcons.forEach((prize) => {
    images.push(prize.querySelector(`img`));
  });

  const [prize1, prize2, prize3] = images;

  if (screenPrizes.classList.contains(`active`)) {
    // screen unactive
    if (!start) {
      start = timestamp;
    }

    const passed = timestamp - start;
    const prize1Path = prize1.src.split(`/`);
    const prize2Path = prize2.src.split(`/`);
    let prize3Path = prize3.src.split(`/`);

    // first prize appearance
    if (passed > 0 && !prize1Path[prize1Path.length - 1]) {
      prize1.src = PRIZE1_SRC;
    }
    if (passed < 500) {
      prize1.style.opacity = calculateAppearance(passed, 500, 0);
    } else {
      prize1.style.opacity = 1;
    }
    // first prize nove after 3 sec
    if (passed > 3000 && passed < 3500) {
      prize1.style.transform = calculateShiftFromRight(passed, 500, 3000);
    } else if (passed > 3000) {
      prize1.style.transform = `translateX(0)`;
    }

    // second prize animation after 3 sec
    if (passed > 3000 && !prize2Path[prize2Path.length - 1]) {
      prize2.src = PRIZE2_SRC;
    }
    if (passed > 3000 && passed < 3500) {
      prize2.style.opacity = calculateAppearance(passed, 500, 3000);
    } else if (passed > 3000) {
      prize2.style.opacity = 1;
    }

    // third prize appearance after 5.2 sec
    if (passed > 5200 && !prize3Path[prize3Path.length - 1]) {
      prize3.src = PRIZE3_SRC_FROM;
    }
    if (passed > 5000 && passed < 5500) {
      prize3.style.opacity = calculateAppearance(passed, 500, 5000);
      prize3.style.transform = calculateShiftFromRight(passed, 500, 5000);
    } else if (passed > 5000) {
      prize3.style.opacity = 1;
      prize3.style.transform = `translateX(0)`;
    }

    // third prize animation after 6.2 sec
    prize3Path = prize3.src.split(`/`);
    const prize3RelativePath = `${prize3Path[prize3Path.length - 2]}/${
      prize3Path[prize3Path.length - 1]
    }`;

    if (passed > 6000 && prize3RelativePath !== PRIZE3_SRC_TO) {
      prize3.src = PRIZE3_SRC_TO;
    }
  } else {
    // screen unactive
    start = null;
    images.forEach((img) => {
      img.src = ``;
      img.style.opacity = 0;
    });

    prize1.style.transform = `translateX(${RIGHT_SHIFTING}px)`;
    prize3.style.transform = `translateX(${RIGHT_SHIFTING}px)`;
  }

  requestAnimationFrame(applyPrizeAnimation);
};

export default applyPrizeAnimation;
