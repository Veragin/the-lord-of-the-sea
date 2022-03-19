import { Button, HoverButton } from '../Components/Buttons';
import { Column, HeadTitle, Input, Row, Title } from '../StyledComponents';

import { ReactComponent as EditIcon } from '../../Assets/icons/edit.svg';
import { RoomItem } from './RoomItem';
import { spacingCss } from '../css';
import styled from 'styled-components';
import { useState } from 'react';
import { useUser } from '../Contexts/UserContext';

type Props = {
    data: TRoomData;
    setAlert: (msg: string) => void;
    onEditName: () => void;
};

export const RoomList = ({ data, setAlert, onEditName }: Props) => {
    const user = useUser();
    const [newRoomName, setNewRoomName] = useState('');

    const onCreateRoom = () => {
        if (newRoomName === '') {
            setAlert('Please enter room name.');
            return;
        }

        user.roomAgent.addRoom(newRoomName);
        setNewRoomName('');
    };

    return (
        <StyledCont>
            <StyledSpaceRow>
                <HeadTitle>Room list</HeadTitle>
                <HoverButton onClick={onEditName}>
                    {user.name}
                    <EditIcon />
                </HoverButton>
            </StyledSpaceRow>
            <StyledRow>
                <StyledTitle>Name </StyledTitle>
                <Title>Players </Title>
            </StyledRow>
            <StyledList>
                {data.rooms.map((r: TRoom) => (
                    <RoomItem
                        key={r.id}
                        data={data}
                        room={r}
                        onEnter={() => user.roomAgent.enterRoom(r.id)}
                        onDelete={() => user.roomAgent.removeRoom(r.id)}
                    />
                ))}
            </StyledList>
            <StyledSpaceRow>
                <StyledRow>
                    <Title>Create new room </Title>
                    <Input
                        value={newRoomName}
                        onChange={(e) => setNewRoomName(e.target.value)}
                        placeholder="Room name"
                    />
                </StyledRow>
                <Button $small={true} onClick={onCreateRoom}>
                    Create
                </Button>
            </StyledSpaceRow>
        </StyledCont>
    );
};

const StyledCont = styled(Column)`
    row-gap: ${spacingCss(2)};
    flex-grow: 1;
    align-items: center;
    height: 600px;
`;

const StyledList = styled(Column)`
    row-gap: ${spacingCss(1)};
    width: 100%;
    align-items: center;
`;

const StyledSpaceRow = styled(Row)`
    justify-content: space-between;
    width: 100%;
    align-items: center;
`;

const StyledRow = styled(Row)`
    padding-left: ${spacingCss(1)};
    column-gap: ${spacingCss(2)};
    align-items: center;
    justify-content: start;
    width: calc(100% - ${spacingCss(1)});
`;

const StyledTitle = styled(Title)`
    min-width: 100px;
    max-width: 100px;
`;
