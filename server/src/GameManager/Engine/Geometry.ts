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

export const collisionArcs = (arcA: TArc, arcB: TArc): boolean => {
    return Math.pow(arcA.x - arcB.x, 2) + Math.pow(arcA.y - arcB.y, 2) < Math.pow(arcA.r + arcB.r, 2);
};

export const collisionPointRect = (point: TPoint, rect: TRect): boolean => {
    return (
        point.x < rect.x + rect.w / 2 &&
        point.x > rect.x - rect.w / 2 &&
        point.y < rect.y + rect.h / 2 &&
        point.y > rect.y - rect.h / 2
    );
};

export const collisionPointRRect = (point: TPoint, rect: TRRect): boolean => {
    return collisionPointRect(rotatePoint(-rect.angle, rect, point), rect);
};

export const collisionPointArc = (point: TPoint, arc: TArc): boolean => {
    return Math.pow(arc.x - point.x, 2) + Math.pow(arc.y - point.y, 2) < Math.pow(arc.r, 2);
};

export const getNorm = (point: TPoint) => Math.sqrt(point.x * point.x + point.y * point.y);
