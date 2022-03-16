import { spacingCss } from './css';
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
    font-size: 30px;
`;

export const Input = styled.input`
    outline: none;
`;

export const Button = styled.button`
    border: 0;
`;

export const Alert = styled.div`
    width: 100%;
    box-sizing: border-box;
    padding: ${spacingCss(0.5)} ${spacingCss(1)};
    border: 1px solid yellow;
    background-color: lightyellow;
`;
