import { Column, HeadTitle, Input } from '../StyledComponents';

import { Button } from '../Components/Buttons';
import { spacingCss } from '../css';
import styled from 'styled-components';
import { useState } from 'react';
import { useUser } from '../Contexts/UserContext';

type Props = {
    type: 'login' | 'nameChange';
    onClose: () => void;
    setAlert: (msg: string) => void;
};

export const EnterName = ({ type, onClose, setAlert }: Props) => {
    const user = useUser();
    const [name, setName] = useState(user.name);
    const isLogin = type === 'login';

    const onNameChange = async (name: string) => {
        if (name === '') {
            setAlert('Your name input is empty.');
            return;
        }

        if (isLogin) {
            await user.userAgent.login(name);
        } else {
            user.userAgent.userChangeName(name);
        }

        onClose();
    };

    return (
        <StyledCont>
            <HeadTitle>Please enter your name:</HeadTitle>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
            <Button onClick={() => onNameChange(name)}>
                {isLogin ? 'Login' : 'Change'}
            </Button>
        </StyledCont>
    );
};

const StyledCont = styled(Column)`
    row-gap: ${spacingCss(2)};
    align-items: center;
`;
