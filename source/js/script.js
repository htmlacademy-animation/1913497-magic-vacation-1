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
import drawCloak from "./modules/game-counter.js";
import applyPrizeAnimation from "./modules/apply-prize-animation.js";
import applyWinCanvas from "./modules/apply-win-canvas.js";

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

requestAnimationFrame(drawCloak);
requestAnimationFrame(applyPrizeAnimation);
requestAnimationFrame(applyWinCanvas);

const fullPageScroll = new FullPageScroll();
fullPageScroll.init();
