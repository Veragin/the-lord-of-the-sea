declare type TAngle = number; // radians in (0,2)

declare type TPoint = {
    x: number;
    y: number;
};

declare type TRect = {
    x: number;
    y: number;
    w: number;
    h: number;
};

declare type TRRect = TRect & {
    angle: number;
};

declare type TArc = {
    x: number;
    y: number;
    r: number;
};
