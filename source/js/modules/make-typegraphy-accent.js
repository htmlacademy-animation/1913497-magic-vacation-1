const defaultRules = {
  name: `fadeAccentUp`,
  duration: `1`,
  delay: `0s`,
  timingFunction: `ease-out`,
};

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

  const lines = elementText.split(` `).map((line, lineId) => {
    return line
      .split(``)
      .map(
          (letter, letterId) =>
            `<span style="will-change: transform; ${animationTules} 
            animation-delay: ${
  rules.lines[lineId + 1] && rules.lines[lineId + 1][letterId + 1]
    ? rules.lines[lineId + 1][letterId + 1] + rules.delay
    : rules.delay
}s;  animation-duration: ${
  rules.lines[lineId + 1] && rules.lines[lineId + 1][letterId + 1]
    ? rules.duration - rules.lines[lineId + 1][letterId + 1]
    : rules.duration
}s">${letter}</span>`
      )
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
