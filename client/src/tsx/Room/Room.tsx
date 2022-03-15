import { Alert, Column, Title } from "../StyledComponents";
import React, { useState } from "react";

import { EnterName } from "./EnterName";
import { User } from "../../User/User";
import { spacingCss } from "../css";
import styled from "styled-components";

type Props = {
    user: User;
};

export const Room = ({ user }: Props) => {
    const [openNameEdit, setOpenNameEdit] = useState(true);
    const [alert, setAlert] = useState("");

    const onNameChange = (name: string) => {
        if (name === "") {
            setAlert("Your name input is empty.");
            return;
        }

        user.name = name;
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
    row-gap: ${spacingCss(3)};
    flex-grow: 1;
`;

const StyledTitle = styled.span`
    color: white;
    font-size: 70px;
`;

const StyledWindow = styled(Column)`
    border: rgba(255, 255, 255, 0.6) solid 4px;
    background-color: rgba(255, 255, 255, 0.3);
    padding: ${spacingCss(3)};
    min-width: 400px;
`;
