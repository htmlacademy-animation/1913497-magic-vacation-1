export const rotateCtx = (ctx, angle, cx, cy) => {
  ctx.translate(cx, cy);
  ctx.rotate((Math.PI / 180) * angle);
  ctx.translate(-cx, -cy);
};

export const easeOut = (progress) => {
  return 1 - Math.pow(1 - progress, 3);
};

export const easeInOut = (progress) => {
  if (progress < 0.5) {
    return 4 * progress * progress * progress; // ускорение в начале
  } else {
    const f = 2 * progress - 2;
    return 0.5 * f * f * f + 1; // замедление в конце
  }
};

export const stageHelper = (from, passed, durations, stageIndex, callback) => {
  let sum = from;

  durations.forEach((el, index) => {
    if (index < stageIndex) {
      sum += el;
    }
  });

  const progress = Math.min((passed - sum) / durations[stageIndex], 1);

  if (passed > sum && passed < sum + durations[stageIndex]) {
    callback(progress);
  }
};

export const getAnimationTick = (from, to, progress) => {
  return from + progress * (to - from);
};
