const prizesItem = document.querySelectorAll(`.prizes__item`);
const screenPrizes = document.querySelector(`.screen--prizes`);
let start;

const PRIZE1_SRC = `img/prize1.svg`;
const PRIZE2_SRC = `img/prize2.svg`;
const PRIZE3_SRC_FROM = `img/prize3-from.svg`;
const PRIZE3_SRC_TO = `img/prize3-to.svg`;
const RIGHT_SHIFTING = 300;
const TEXT_RIGHT_SHIFTING = 50;

const calculateShiftFromRight = (passed, duration, animationStart) => {
  const progress = Math.min((passed - animationStart) / duration, 1);
  return `translateX(${RIGHT_SHIFTING - progress * RIGHT_SHIFTING}px)`;
};

const calculateTextShiftFromRight = (passed, duration, animationStart) => {
  const progress = Math.min((passed - animationStart) / duration, 1);
  return `translateX(${
    TEXT_RIGHT_SHIFTING - progress * TEXT_RIGHT_SHIFTING
  }px)`;
};

const calculateAppearance = (passed, duration, animationStart) => {
  const progress = Math.min((passed - animationStart) / duration, 1);
  return progress;
};

const countupPrize = (passed, duration, animationStart, from, to) => {
  const change = to - from;
  const progress = Math.min((passed - animationStart) / duration, 1);
  const currentNumber = Math.round(from + change * progress);

  return currentNumber;
};

const applyPrizeAnimation = (timestamp) => {
  const prizes = [];
  prizesItem.forEach((prize) => {
    prizes.push({
      img: prize.querySelector(`img`),
      count: prize.querySelector(`.prizes__desc b`),
      desc: prize.querySelector(`.prizes__desc span`),
    });
  });

  const [prize1, prize2, prize3] = prizes;

  if (screenPrizes.classList.contains(`active`)) {
    // screen unactive
    if (!start) {
      start = timestamp;
    }

    const passed = timestamp - start;
    const prize1Path = prize1.img.src.split(`/`);
    const prize2Path = prize2.img.src.split(`/`);
    let prize3Path = prize3.img.src.split(`/`);

    // first prize appearance
    if (passed > 0 && !prize1Path[prize1Path.length - 1]) {
      prize1.img.src = PRIZE1_SRC;
    }
    if (passed < 500) {
      prize1.img.style.opacity = calculateAppearance(passed, 500, 0);
    } else {
      prize1.img.style.opacity = 1;
    }
    // first prize text appearance after 2 sec
    if (passed > 2000 && passed < 2300) {
      prize1.count.style.opacity = calculateAppearance(passed, 300, 2000);
      prize1.desc.style.opacity = calculateAppearance(passed, 300, 2000);
      prize1.desc.style.transform = calculateTextShiftFromRight(
          passed,
          300,
          2000
      );
    } else if (passed > 2000) {
      prize1.count.style.opacity = 1;
      prize1.desc.style.opacity = 1;
      prize1.desc.style.transform = `translateX(0)`;
    }
    // first prize nove after 3 sec
    if (passed > 3000 && passed < 3500) {
      prizesItem[0].style.transform = calculateShiftFromRight(
          passed,
          500,
          3000
      );
    } else if (passed > 3000) {
      prizesItem[0].style.transform = `translateX(0)`;
    }

    // second prize animation after 3 sec
    if (passed > 3000 && !prize2Path[prize2Path.length - 1]) {
      prize2.img.src = PRIZE2_SRC;
    }
    if (passed > 3000 && passed < 3300) {
      prize2.img.style.opacity = calculateAppearance(passed, 300, 3000);
    } else if (passed > 3000) {
      prize2.img.style.opacity = 1;
    }
    // second prize text appearance after 4 sec
    if (passed > 4000 && passed < 4300) {
      prize2.count.style.opacity = calculateAppearance(passed, 300, 4000);
      prize2.desc.style.opacity = calculateAppearance(passed, 300, 4000);
      prize2.desc.style.transform = calculateTextShiftFromRight(
          passed,
          300,
          4000
      );
    } else if (passed > 4000) {
      prize2.count.style.opacity = 1;
      prize2.desc.style.opacity = 1;
      prize2.desc.style.transform = `translateX(0)`;
    }
    // second prize countup after 4 sec
    if (passed > 4000 && passed < 4600) {
      prize2.count.innerText = countupPrize(passed, 600, 4000, 0, 7);
    } else if (passed > 4000) {
      prize2.count.innerText = 7;
    }

    // third prize appearance after 5.2 sec
    if (passed > 5200 && !prize3Path[prize3Path.length - 1]) {
      prize3.img.src = PRIZE3_SRC_FROM;
    }
    if (passed > 5000 && passed < 5500) {
      prize3.img.style.opacity = calculateAppearance(passed, 500, 5000);
      prize3.img.style.transform = calculateShiftFromRight(passed, 500, 5000);
    } else if (passed > 5000) {
      prize3.img.style.opacity = 1;
      prize3.img.style.transform = `translateX(0)`;
    }
    // third prize text appearance after 6 sec
    if (passed > 6000 && passed < 6300) {
      prize3.count.style.opacity = calculateAppearance(passed, 300, 6000);
      prize3.desc.style.opacity = calculateAppearance(passed, 300, 6000);
      prize3.desc.style.transform = calculateTextShiftFromRight(
          passed,
          300,
          6000
      );
    } else if (passed > 6000) {
      prize3.count.style.opacity = 1;
      prize3.desc.style.opacity = 1;
      prize3.desc.style.transform = `translateX(0)`;
    }
    // third prize countup after 6 sec
    if (passed > 6000 && passed < 6600) {
      prize3.count.innerText = countupPrize(passed, 600, 6000, 3, 900);
    } else if (passed > 6000) {
      prize3.count.innerText = 900;
    }
    // third prize animation after 6.2 sec
    prize3Path = prize3.img.src.split(`/`);
    const prize3RelativePath = `${prize3Path[prize3Path.length - 2]}/${
      prize3Path[prize3Path.length - 1]
    }`;

    if (passed > 6000 && prize3RelativePath !== PRIZE3_SRC_TO) {
      prize3.img.src = PRIZE3_SRC_TO;
    }
  } else {
    // screen unactive
    start = null;
    prizes.forEach((prize) => {
      prize.img.src = ``;
      prize.img.style.opacity = 0;
      prize.count.style.opacity = 0;
      prize.desc.style.opacity = 0;
      prize.desc.style.transform = `translateX(${TEXT_RIGHT_SHIFTING}px)`;
    });

    prizesItem[0].style.transform = `translateX(${RIGHT_SHIFTING}px)`;
    prize3.img.style.transform = `translateX(${RIGHT_SHIFTING}px)`;
  }

  requestAnimationFrame(applyPrizeAnimation);
};

export default applyPrizeAnimation;
