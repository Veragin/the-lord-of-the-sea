import { borderRadiusCss, spacingCss } from '../css';

import { ReactComponent as CloseIcon } from '../../Assets/icons/close.svg';
import { IconButton } from './Buttons';
import { Row } from '../StyledComponents';
import styled from 'styled-components';

type Props = {
    msg: string;
    onClose: () => void;
};

export const Alert = ({ msg, onClose }: Props) => {
    if (msg === '') return null;

    return (
        <StyledCont>
            {msg}
            <IconButton onClick={onClose}>
                <CloseIcon />
            </IconButton>
        </StyledCont>
    );
};

const StyledCont = styled(Row)`
    width: 100%;
    box-sizing: border-box;
    padding: ${spacingCss(0.5)} ${spacingCss(1)};
    border-radius: ${borderRadiusCss(1)};
    border: 2px solid red;
    background-color: pink;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
`;
