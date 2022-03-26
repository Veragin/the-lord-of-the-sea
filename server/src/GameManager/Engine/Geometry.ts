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
    if (arcDistanceY <= rect.height / 2) {
        return true;
    }

    const cornerDistanceSq = (arcDistanceX - rect.width / 2) ^ (2 + (arcDistanceY - rect.height / 2)) ^ 2;

    return cornerDistanceSq <= (arc.r ^ 2);
};
