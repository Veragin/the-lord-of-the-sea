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

export const HeadTitle = styled.span`
    font-size: 32px;
    color: ${colorsCss.primary.dark};
`;

export const Title = styled.span`
    font-size: 14px;
    color: ${colorsCss.primary.dark};
`;

export const Text = styled.span<{ $highlight?: boolean }>`
    font-size: 12px;
    color: ${({ $highlight }) => ($highlight ? 'red' : 'white')};
`;

export const Input = styled.input`
    outline: none;
    padding: ${spacingCss(1)} ${spacingCss(2)};
    border: 2px solid ${colorsCss.secondary.dark};
    background-color: ${colorsCss.secondary.dark};
    border-radius: ${borderRadiusCss(1)};
    color: ${colorsCss.primary.dark};
    font-size: 14px;

    &:hover {
        background-color: ${colorsCss.secondary.darker};
        border: 2px solid ${colorsCss.secondary.darker};
    }

    &:focus {
        background-color: ${colorsCss.secondary.darker};
        border: 2px solid ${colorsCss.primary.dark};
    }
`;
