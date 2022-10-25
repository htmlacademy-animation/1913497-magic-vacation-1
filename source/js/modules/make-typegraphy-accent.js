const defaultRules = {
  name: `fadeAccentUp`,
  duration: 1,
  delay: 0,
  timingFunction: `ease-out`,
};

const MIN_DURATION_COEFFICIENT = 0.2;

export default (elementSelector, rules = defaultRules) => {
  const element =
    typeof elementSelector === `string`
      ? document.querySelector(elementSelector)
      : elementSelector;
  const elementText = element.innerText;

  const animationTules = `
    display: inline-block;
    animation-delay: ${rules.delay}s;
    animation-name: ${rules.name}; 
    animation-duration: ${rules.duration ? rules.duration + `s` : `.3s`};
    animation-timing-function: ${rules.timingFunction || `ease-out`};
    animation-fill-mode: both;
  `;

  const lines = elementText.split(` `).map((line) => {
    return line
      .split(``)
      .map((letter) => {
        const maxValue =
          rules.duration - rules.duration * MIN_DURATION_COEFFICIENT;
        const minValue = 0;
        const randomDelay = Math.random() * (maxValue - minValue) + minValue;
        return `<span style="will-change: transform; ${animationTules} 
            animation-delay: ${
  randomDelay + rules.delay
}s;  animation-duration: ${
  rules.duration - randomDelay
}s">${letter}</span>`;
      })
      .join(``);
  });

  const newHTML = lines
    .map(
        (line) =>
          `<span style="display: inline-block;white-space: nowrap; overflow-y: hidden; padding-top: .2em; padding-right: .2em; margin-bottom: -.2em; margin-right: -.2em;">
        ${line}
      </span>`
    )
    .join(` `);

  element.innerHTML = newHTML;
};
