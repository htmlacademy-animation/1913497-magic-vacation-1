export default () => {
  const screen = document.querySelector(`.screen--show.screen--result`);
  const title = screen.querySelector(`.result__title`);
  const prizeId = screen.getAttribute(`id`);
  const letters = title.querySelectorAll(`path`);

  letters.forEach((letter, index) => {
    const startPointsCount = Math.floor(Math.random() * (3 - 2 + 1)) + 2;
    const length = letter.getTotalLength();
    const seperatedPartLength = length / startPointsCount;
    letter.style = `
      stroke-dasharray: ${`0,${seperatedPartLength} `.repeat(startPointsCount)};
      opacity: 0;
    `;
    if (!letter.innerHTML) {
      const animateElement = `
        <animate
          id="fillLetter"
          attributeName="stroke-dasharray"
          begin="indefinite"
          dur="0.5s"
          values="${`0,${seperatedPartLength} `.repeat(startPointsCount)};
          ${`${seperatedPartLength},0 `.repeat(startPointsCount)}"
          fill="freeze"
        />
      `;
      letter.innerHTML = animateElement;
    }

    if (prizeId === `result3`) {
      const delay = index * 50 + index * 5;
      setTimeout(() => {
        letter.style = `
        animation: fadeOut 0.3s ease-out both, fallLetterOut 0.5s ease-in-out both;
      `;
        letter.querySelector(`#fillLetter`).beginElement();
      }, delay);
    } else {
      letter.style = `
        transform-origin: center;
        animation: zoomLetterOut 0.5s ease-out alternate both;
      `;
      letter.querySelector(`#fillLetter`).beginElement();
    }
  });
};
