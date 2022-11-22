declare type TIsland = TArc;

declare type TMine = TArc & {
    source: TItemName;
};

declare type TWind = {
    angle: TAngle;
    strength: number;
    speedX: number;
    speedY: number;
};
