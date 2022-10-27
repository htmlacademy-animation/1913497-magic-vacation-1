import makeTypegraphyAccent from "./modules/make-typegraphy-accent.js";

const defaultAnimationRules = {
  name: `fadeAccentUp`,
  duration: 1,
  delay: 0,
  timingFunction: `ease-out`,
};

export default () => {
  const introTitle = document.querySelector(`.intro__title`);
  const introDate = document.querySelector(`.intro__date`);
  const sliderTitle = document.querySelector(`.slider__item-title`);
  const prizesTitle = document.querySelector(`.prizes__title`);
  const rulesTitle = document.querySelector(`.rules__title`);
  const gameTitle = document.querySelector(`.game__title`);

  makeTypegraphyAccent(introTitle, {
    ...defaultAnimationRules,
  });

  makeTypegraphyAccent(introDate, {
    ...defaultAnimationRules,
    duration: 0.5,
    delay: 1.25,
  });

  makeTypegraphyAccent(sliderTitle, {
    ...defaultAnimationRules,
    duration: 0.75,
  });

  makeTypegraphyAccent(prizesTitle, {
    ...defaultAnimationRules,
    duration: 0.5,
    delay: 0.5,
  });

  makeTypegraphyAccent(rulesTitle, {
    ...defaultAnimationRules,
    duration: 0.5,
  });

  makeTypegraphyAccent(gameTitle, {
    ...defaultAnimationRules,
    duration: 0.75,
  });
};
