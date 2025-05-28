export default () => {
  const prize3 = document
    .querySelector(`.prizes__item--codes`)
    .querySelector(`img`);

  prize3.src = `img/prize3-from.svg`;

  setTimeout(() => {
    prize3.src = `img/prize3-to.svg`;
  }, 1867);
};
