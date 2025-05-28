import changePrize3 from "./modules/changePrize3";

export default () => {
  const prizesIcons = document.querySelectorAll(`.prizes__icon`);

  if (`onhashchange` in window) {
    window.onhashchange = function () {
      const images = [];
      prizesIcons.forEach((prize) => {
        images.push(prize.querySelector(`img`));
      });

      images.forEach((img) => {
        const src = img.src;
        img.src = ``;
        img.src = src;
      });

      changePrize3();
    };
  }
};
