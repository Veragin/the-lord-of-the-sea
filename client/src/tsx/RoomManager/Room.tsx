import { Button, HoverButton } from '../Components/Buttons';
import { Column, HeadTitle, Row, Text, Title } from '../StyledComponents';

import { ReactComponent as EditIcon } from '../../Assets/icons/edit.svg';
import { getTeamUserNames } from './roomUtils';
import { spacingCss } from '../css';
import styled from 'styled-components';
import { useUser } from '../Contexts/UserContext';

type Props = {
    data: TRoomData;
    room: TRoom;
    onBack: () => void;
    onStart: () => void;
    onEditName: () => void;
};

export const Room = ({ data, room, onBack, onStart, onEditName }: Props) => {
    const user = useUser();

    const onTeamSwitch = (team: 'A' | 'B') => {
        user.roomAgent.teamSwitch(team);
    };

    const usersA = getTeamUserNames(room.teamA, data.users);
    const usersB = getTeamUserNames(room.teamB, data.users);

    return (
        <StyledCont>
            <StyledSpaceRow>
                <HeadTitle>Room {room.name}</HeadTitle>
                <HoverButton onClick={onEditName}>
                    {user.name}
                    <EditIcon />
                </HoverButton>
            </StyledSpaceRow>
            <StyledTeamNames>
                <Title>Team A</Title>
                <Title>Team B</Title>
            </StyledTeamNames>
            <StyledSpaceRow>
                <StyledList>
                    {usersA.map((name: string, key: number) => (
                        <Text key={key}>{name}</Text>
                    ))}
                    <Button onClick={() => onTeamSwitch('A')} $small={true}>
                        Change
                    </Button>
                </StyledList>
                <StyledList>
                    {usersB.map((name: string, key: number) => (
                        <Text key={key}>{name}</Text>
                    ))}
                    <Button onClick={() => onTeamSwitch('B')} $small={true}>
                        Change
                    </Button>
                </StyledList>
            </StyledSpaceRow>
            <StyledSpaceRow>
                <Button onClick={onBack} $small={true}>
                    Back
                </Button>
                <Button onClick={onStart} $small={true}>
                    Start
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
    width: 50%;
    align-items: center;
`;

const StyledSpaceRow = styled(Row)`
    justify-content: space-between;
    width: 100%;
    align-items: center;
`;

const StyledTeamNames = styled(Row)`
    align-items: center;
    justify-content: space-evenly;
    width: 100%;
`;
