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

export const cubicBezier = (progress, x1, y1, x2, y2) => {
  // Используем алгоритм для вычисления кривой bezier по прогрессу

  // Вспомогательная функция для вычисления кубической кривой по t
  function bezier(t, p0, p1, p2, p3) {
    const cX = 3 * (p1 - p0);
    const bX = 3 * (p2 - p1) - cX;
    const aX = p3 - p0 - cX - bX;

    return ((aX * t + bX) * t + cX) * t + p0;
  }

  // Вспомогательная функция для вычисления производной кривой bezier
  function bezierDerivative(t, p0, p1, p2, p3) {
    const cX = 3 * (p1 - p0);
    const bX = 3 * (p2 - p1) - cX;
    const aX = p3 - p0 - cX - bX;

    return (3 * aX * t + 2 * bX) * t + cX;
  }

  // Используем численный метод для нахождения t, такого что bezier_x(t) ≈ progress
  // так как нам нужно найти t по x (progress), а bezier по x и y связаны через t

  let t = progress; // начальное приближение
  for (let i = 0; i < 10; i++) {
    const x = bezier(t, 0, x1, x2, 1);
    const dx = bezierDerivative(t, 0, x1, x2, 1);
    const error = x - progress;
    if (Math.abs(error) < 0.001) {
      break;
    }
    t -= error / dx; // итеративное уточнение (метод Ньютона)
    t = Math.min(Math.max(t, 0), 1); // ограничение по диапазону
  }

  // Теперь вычисляем y по найденному t
  const y = bezier(t, 0, y1, y2, 1);
  return y;
};
