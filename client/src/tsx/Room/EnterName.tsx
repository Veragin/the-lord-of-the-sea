import { Button, Column, Input, Title } from "../StyledComponents";

import { spacingCss } from "../css";
import styled from "styled-components";
import { useState } from "react";

type Props = {
    onSubmit: (name: string) => void;
};

export const EnterName = ({ onSubmit }: Props) => {
    const [name, setName] = useState("");

    return (
        <StyledCont>
            <Title>Please enter your name:</Title>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
            <Button onClick={() => onSubmit(name)}>Change</Button>
        </StyledCont>
    );
};

const StyledCont = styled(Column)`
    row-gap: ${spacingCss(2)};
`;
