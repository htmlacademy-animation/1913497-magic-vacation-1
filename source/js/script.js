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
import applyTypography from "./applyTypography.js";
import restartAnimations from "./restartAnimations.js";
import changePrize3 from "./modules/changePrize3.js";
import drawCloak from "./modules/game-counter.js";

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
applyTypography();
restartAnimations();
changePrize3();

requestAnimationFrame(drawCloak);

const fullPageScroll = new FullPageScroll();
fullPageScroll.init();
