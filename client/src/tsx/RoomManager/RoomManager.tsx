import { Alert, Column, Title } from '../StyledComponents';
import React, { useState } from 'react';
import { colorsACss, colorsCss, spacingCss } from '../css';

import { EnterName } from './EnterName';
import { User } from '../../User/User';
import styled from 'styled-components';

type Props = {
    user: User;
};

export const RoomManager = ({ user }: Props) => {
    const [openNameEdit, setOpenNameEdit] = useState(true);
    const [alert, setAlert] = useState('');

    const onNameChange = (name: string) => {
        if (name === '') {
            setAlert('Your name input is empty.');
            return;
        }

        user.name = name;
        user.userAgent.userChangeName(name);
        setOpenNameEdit(false);
    };

    return (
        <StyledCont>
            <StyledTitle>The Lord of the Sea</StyledTitle>
            <StyledWindow>
                {alert && <Alert>{alert}</Alert>}
                {openNameEdit ? <EnterName onSubmit={onNameChange} /> : null}
            </StyledWindow>
        </StyledCont>
    );
};

const StyledCont = styled(Column)`
    row-gap: ${spacingCss(10)};
    flex-grow: 1;
    justify-content: center;
    align-items: center;
`;

const StyledTitle = styled.span`
    color: white;
    font-size: 70px;
`;

const StyledWindow = styled(Column)`
    border: ${colorsCss.secondary.dark} solid 4px;
    background-color: ${colorsACss('secondary', 'light', 0.3)};
    padding: ${spacingCss(3)};
    min-width: 500px;
    max-width: 80%;
    max-height: 600px;
    row-gap: ${spacingCss(2)};
`;
