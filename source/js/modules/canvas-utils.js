export const rotateCtx = (ctx, angle, cx, cy) => {
  ctx.translate(cx, cy);
  ctx.rotate((Math.PI / 180) * angle);
  ctx.translate(-cx, -cy);
};

export const easeOut = (progress) => {
  return 1 - Math.pow(1 - progress, 2);
};

export const easeIn = (progress) => {
  return Math.pow(progress, 2);
};

export const easeInOut = (progress) => {
  if (progress < 0.5) {
    return 4 * progress * progress * progress;
  } else {
    const f = 2 * progress - 2;
    return 0.5 * f * f * f + 1;
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

export const getBezierPoint = (t, p0, p1, p2, p3) => {
  const x =
    (1 - t) ** 3 * p0.x +
    3 * (1 - t) ** 2 * t * p1.x +
    3 * (1 - t) * t ** 2 * p2.x +
    t ** 3 * p3.x;
  const y =
    (1 - t) ** 3 * p0.y +
    3 * (1 - t) ** 2 * t * p1.y +
    3 * (1 - t) * t ** 2 * p2.y +
    t ** 3 * p3.y;
  return {x, y};
};
