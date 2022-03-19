import { borderRadiusCss, colorsCss, getColor, spacingCss } from '../css';
import styled, { css } from 'styled-components';

export const HoverButton = styled.button`
    padding: ${spacingCss(1)} ${spacingCss(1)};
    border-radius: ${borderRadiusCss(1)};
    cursor: pointer;
    display: flex;
    column-gap: ${spacingCss(1)};
    align-items: center;
    border: 0;
    background-color: transparent;
    font-size: 14px;
    color: ${colorsCss.primary.dark};
    fill: ${colorsCss.primary.dark};

    &:hover {
        background-color: rgba(255, 255, 255, 0.3);
    }

    &:disabled {
        cursor: default;
        fill: grey;
        background-color: transparent;
    }

    & svg {
        width: 1rem;
        height: 1rem;
    }
`;

export const IconButton = styled(HoverButton)`
    padding: ${spacingCss(0.5)} ${spacingCss(0.5)};
    height: fit-content;
`;

export const Button = styled.button<{
    $color?: 'primary' | 'secondary';
    $small?: boolean;
}>`
    ${({ $small }) =>
        $small
            ? css`
                  padding: ${spacingCss(1)} ${spacingCss(1)};
                  font-size: 14px;
              `
            : css`
                  padding: ${spacingCss(2)} ${spacingCss(3)};
                  font-size: 16px;
              `};

    border: 0;
    background-color: ${({ $color }) => getColor($color).main};
    cursor: pointer;
    border-radius: ${borderRadiusCss(1)};
    color: white;
    font-size: 16px;
    width: min-content;

    &:hover {
        background-color: ${({ $color }) => getColor($color).light};
    }

    &:disabled {
        cursor: default;
        background-color: grey;
    }
`;
