export default () => {
  const prizesIcons = document.querySelectorAll(`.prizes__icon`);

  if (`onhashchange` in window) {
    window.onhashchange = function () {
      const images = [];
      const imagesSrc = [];
      prizesIcons.forEach((prize) => {
        images.push(prize.querySelector(`img`));
        imagesSrc.push(prize.querySelector(`img`).src);
      });

      images.forEach((img) => {
        const src = img.src;
        img.src = ``;
        img.src = src;
      });
    };
  }
};
