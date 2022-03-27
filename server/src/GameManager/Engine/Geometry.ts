/** rotate a around s with angle alpha */
export const rotatePoint = (alpha: number, s: TPoint, a: TPoint) => {
    const cosA = Math.cos(alpha);
    const sinA = Math.sin(alpha);
    return {
        x: s.x + cosA * (a.x - s.x) - sinA * (a.y - s.y),
        y: s.y + sinA * (a.x - s.x) + cosA * (a.y - s.y),
    };
};

export const collisionArcRect = (arc: TArc, rect: TRect): boolean => {
    const arcDistanceX = Math.abs(arc.x - rect.x);
    const arcDistanceY = Math.abs(arc.y - rect.y);

    if (arcDistanceX > rect.w / 2 + arc.r) {
        return false;
    }
    if (arcDistanceY > rect.h / 2 + arc.r) {
        return false;
    }

    if (arcDistanceX <= rect.w / 2) {
        return true;
    }
    if (arcDistanceY <= rect.h / 2) {
        return true;
    }

    const cornerDistanceSq =
        (arcDistanceX - rect.w / 2) * (arcDistanceX - rect.w / 2) +
        (arcDistanceY - rect.h / 2) * (arcDistanceY - rect.h / 2);

    return cornerDistanceSq <= arc.r * arc.r;
};

export const collisionArcRRect = (arc: TArc, rect: TRRect): boolean => {
    return collisionArcRect({ ...rotatePoint(-rect.angle, rect, arc), r: arc.r }, rect);
};
