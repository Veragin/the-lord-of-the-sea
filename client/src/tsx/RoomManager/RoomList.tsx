import { Alert, Column, Title } from '../StyledComponents';
import React, { useState } from 'react';
import { colorsACss, colorsCss, spacingCss } from '../css';

import { EnterName } from './EnterName';
import { User } from '../../User/User';
import styled from 'styled-components';

type Props = {
    user: User;
};

export const RoomList = ({ user }: Props) => {
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
