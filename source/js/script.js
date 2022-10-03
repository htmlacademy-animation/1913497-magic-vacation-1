// modules
import mobileHeight from "./modules/mobile-height-adjust.js";
import slider from "./modules/slider.js";
import menu from "./modules/menu.js";
import footer from "./modules/footer.js";
import chat from "./modules/chat.js";
import result from "./modules/result.js";
import form from "./modules/form.js";
import social from "./modules/social.js";
import FullPageScroll from "./modules/full-page-scroll";
import pageLoad from "./modules/page-load";
import makeTypegraphyAccent from "./make-typegraphy-accent.js";

const defaultAnimationRules = {
  name: `fadeAccentUp`,
  duration: `0.6s`,
  timingFunction: `ease-out`,
};

const introTitle = document.querySelector(`.intro__title`);

// init modules
pageLoad();
mobileHeight();
slider();
menu();
footer();
chat();
result();
form();
social();

makeTypegraphyAccent(introTitle, {
  ...defaultAnimationRules,
  lines: {
    1: {
      1: `.4s`,
      2: `.2s`,
      3: `0`,
      4: `.2s`,
      5: `.4s`,
      6: `.2s`,
      7: `0`,
      8: `.5s`,
      9: `.2s`,
      10: `0`,
      11: `.2s`,
      12: `.1s`,
    },
    2: {
      1: `.6s`,
      2: `.7s`,
      3: `.6s`,
      4: `.4s`,
      5: `.6s`,
      6: `.5s`,
    },
  },
});

const fullPageScroll = new FullPageScroll();
fullPageScroll.init();
