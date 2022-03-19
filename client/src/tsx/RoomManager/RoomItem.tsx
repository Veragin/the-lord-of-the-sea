import { Button, IconButton } from '../Components/Buttons';
import { Row, Text, Title } from '../StyledComponents';
import { borderRadiusCss, colorsACss, spacingCss } from '../css';

import { ReactComponent as DeleteSvg } from '../../Assets/icons/delete.svg';
import { getUsersName } from './roomUtils';
import styled from 'styled-components';

type Props = {
    data: TRoomData;
    room: TRoom;
    onEnter: () => void;
    onDelete: () => void;
};

export const RoomItem = ({ data, room, onEnter, onDelete }: Props) => {
    const users = getUsersName(room, data.users);

    const isEmpty = users.length === 0;

    return (
        <StyledCont>
            <StyledRow>
                <StyledTitle>{room.name}</StyledTitle>
                <Text>{users.join(', ')}</Text>
            </StyledRow>
            <StyledRow>
                <IconButton onClick={onDelete} disabled={!isEmpty}>
                    <DeleteSvg />
                </IconButton>
                {room.inGame ? (
                    <Button $small={true} disabled>
                        In Game
                    </Button>
                ) : (
                    <Button $small={true} onClick={onEnter}>
                        Enter
                    </Button>
                )}
            </StyledRow>
        </StyledCont>
    );
};

const StyledCont = styled(Row)`
    justify-content: space-between;
    width: 100%;
    border-radius: ${borderRadiusCss(1)};
    background-color: ${colorsACss('secondary', 'lighter', 0.6)};
    align-items: center;
`;

const StyledRow = styled(Row)`
    padding-left: ${spacingCss(1)};
    column-gap: ${spacingCss(2)};
    align-items: center;
`;

const StyledTitle = styled(Title)`
    min-width: 100px;
    max-width: 100px;
    text-overflow: ellipsis;
`;
