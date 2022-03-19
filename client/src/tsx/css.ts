const SPACING = 8;
const BORDER_RADIUS = 6;

export const spacingCss = (v: number) => v * SPACING + 'px';
export const borderRadiusCss = (v: number) => v * BORDER_RADIUS + 'px';

export const colorsCss = {
    primary: {
        dark: '#76520e',
        darker: '#805b10',
        main: '#926c15',
        lighter: '#a47e1b',
        light: '#b69121',
    },
    secondary: {
        dark: '#c9a227',
        darker: '#dbb42c',
        main: '#edc531',
        lighter: '#fad643',
        light: '#ffe169',
    },
} as const;

export type TColor = keyof typeof colorsCss.primary;
export type TColors = typeof colorsCss;
export type TVariant = keyof typeof colorsCss;

export const colorsACss = (variant: TVariant, color: TColor, a: number) => hexToRgbA(colorsCss[variant][color], a);

export const getColor = (color?: 'primary' | 'secondary') =>
    color === 'secondary' ? colorsCss.secondary : colorsCss.primary;

const hexToRgbA = (hex: string, a: number) => {
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
        let c = hex.substring(1).split('');
        if (c.length === 3) {
            c = [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        const d = Number('0x' + c.join(''));
        return `rgba(${[(d >> 16) & 255, (d >> 8) & 255, d & 255].join(',')},${a})`;
    }
    throw new Error('Bad Hex');
};
