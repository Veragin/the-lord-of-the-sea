import { borderRadiusCss, colorsCss, spacingCss } from './css';

import styled from 'styled-components';

export const Column = styled.div`
    display: flex;
    flex-direction: column;
`;

export const Row = styled.div`
    display: flex;
    flex-direction: row;
`;

export const Title = styled.span`
    font-size: 32px;
    color: ${colorsCss.primary.dark};
`;

export const Input = styled.input`
    outline: none;
    padding: ${spacingCss(1)} ${spacingCss(2)};
    border: 2px solid ${colorsCss.secondary.dark};
    background-color: ${colorsCss.secondary.dark};
    border-radius: ${borderRadiusCss(1)};
    color: white;
    font-size: 14px;

    &:hover {
        background-color: ${colorsCss.secondary.darker};
        border: 2px solid ${colorsCss.secondary.darker};
    }

    &:focus {
        background-color: ${colorsCss.secondary.darker};
        border: 2px solid ${colorsCss.primary.darker};
    }
`;

export const Button = styled.button<{ $color?: 'primary' | 'secondary' }>`
    border: 0;
    padding: ${spacingCss(2)} ${spacingCss(3)};
    background-color: ${({ $color }) => getColor($color).main};
    cursor: pointer;
    border-radius: ${borderRadiusCss(1)};
    color: white;
    font-size: 16px;
    width: min-content;

    &:hover {
        background-color: ${({ $color }) => getColor($color).light};
    }
`;

export const Alert = styled.div`
    width: 100%;
    box-sizing: border-box;
    padding: ${spacingCss(0.5)} ${spacingCss(1)};
    border: 2px solid red;
    background-color: pink;
`;

const getColor = (color?: 'primary' | 'secondary') =>
    color === 'secondary' ? colorsCss.secondary : colorsCss.primary;
