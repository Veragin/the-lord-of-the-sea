import { Button, HoverButton } from '../Components/Buttons';
import { Column, HeadTitle, Row, Text, Title } from '../StyledComponents';
import { borderRadiusCss, colorsACss, spacingCss } from '../css';

import { ReactComponent as EditIcon } from '../../Assets/icons/edit.svg';
import { User } from '../../User/User';
import { getTeamUserNames } from './roomUtils';
import styled from 'styled-components';
import { useUser } from '../Contexts/UserContext';

type Props = {
    data: TRoomData;
    room: TRoom;
    onEditName: () => void;
};

export const Room = ({ data, room, onEditName }: Props) => {
    const user = useUser();

    const onTeamSwitch = (team: TUserTeam) => {
        user.roomAgent.teamSwitch(team);
    };

    const usersA = getTeamUserNames(room.teamA, data.users);
    const usersB = getTeamUserNames(room.teamB, data.users);

    const userListA = generateUserList(usersA, user);
    const userListB = generateUserList(usersB, user);

    return (
        <StyledCont>
            <StyledSpaceRow>
                <HeadTitle>Room {room.name}</HeadTitle>
                <HoverButton onClick={onEditName}>
                    {user.name}
                    <EditIcon />
                </HoverButton>
            </StyledSpaceRow>
            <StyledListsHolder>
                <StyledTeam>
                    <StyledTitle>Team A</StyledTitle>
                    <StyledList>{userListA}</StyledList>
                    <Button onClick={() => onTeamSwitch('A')} $small={true}>
                        Switch
                    </Button>
                </StyledTeam>
                <StyledTeam>
                    <StyledTitle>Team B</StyledTitle>
                    <StyledList>{userListB}</StyledList>
                    <Button onClick={() => onTeamSwitch('B')} $small={true}>
                        Switch
                    </Button>
                </StyledTeam>
            </StyledListsHolder>
            <StyledSpaceRow>
                <Button
                    onClick={() => user.roomAgent.leaveRoom()}
                    $small={true}
                >
                    Back
                </Button>
                <Button
                    onClick={() => user.roomAgent.startRoom()}
                    $small={true}
                >
                    Start
                </Button>
            </StyledSpaceRow>
        </StyledCont>
    );
};

const generateUserList = (names: string[], user: User) => {
    return names.map((name: string, key: number) => (
        <Text key={key} $highlight={name === user.name}>
            {name}
        </Text>
    ));
};

const StyledCont = styled(Column)`
    row-gap: ${spacingCss(2)};
    flex-grow: 1;
    align-items: center;
    height: 600px;
`;

const StyledTeam = styled(Column)`
    row-gap: ${spacingCss(2)};
    flex-grow: 1;
    height: max-content;
    align-items: center;
    background-color: ${colorsACss('primary', 'lighter', 0.6)};
    padding: ${spacingCss(2)};
    border-radius: ${borderRadiusCss(1)};
    height: 100%;
    box-sizing: border-box;
`;

const StyledList = styled(Column)`
    row-gap: ${spacingCss(1)};
`;

const StyledSpaceRow = styled(Row)`
    justify-content: space-between;
    width: 100%;
    align-items: center;
`;

const StyledListsHolder = styled(StyledSpaceRow)`
    flex-grow: 1;
    column-gap: ${spacingCss(2)};
`;

const StyledTitle = styled(Title)`
    font-size: 16px;
    font-weight: 600;
`;
