import { borderRadiusCss, colorsACss, spacingCss } from '../css';
import { useEffect, useState } from 'react';

import { Alert } from '../Components/Alert';
import { Column } from '../StyledComponents';
import { EnterName } from './EnterName';
import { RoomList } from './RoomList';
import { User } from '../../User/User';
import styled from 'styled-components';
import { useUser } from '../Contexts/UserContext';

type TEnterNameType = null | 'login' | 'nameChange';

export const RoomManager = () => {
    const user = useUser();
    const [data, setData] = useState<TRoomData>({ users: [], rooms: [] });

    const [openNameEdit, setOpenNameEdit] = useState<TEnterNameType>('login');
    const [alert, setAlert] = useState('');

    useEffect(() => {
        console.log('Room: Register room events.');
        const roomId = user.eventRegister.subscribe({
            type: 'roomData',
            do: (d) => {
                setUserFromData(user, d);
                setData(d);
            },
        });

        return () => user.eventRegister.unsubscribe('roomData', roomId);
    }, [user]);

    return (
        <StyledCont>
            <StyledTitle>The Lord of the Sea</StyledTitle>
            <StyledWindow>
                <Alert msg={alert} onClose={() => setAlert('')} />
                {openNameEdit ? (
                    <EnterName
                        type={openNameEdit}
                        onClose={() => {
                            setOpenNameEdit(null);
                        }}
                        setAlert={setAlert}
                    />
                ) : user.room === null ? (
                    <RoomList
                        data={data}
                        setAlert={setAlert}
                        onEditName={() => setOpenNameEdit('nameChange')}
                    />
                ) : null}
            </StyledWindow>
        </StyledCont>
    );
};

const setUserFromData = (user: User, data: TRoomData) => {
    const id = user.id();
    const userData = data.users.find((u) => u.id === id);
    const room = data.rooms.find(
        (r) => r.teamA.includes(id) || r.teamB.includes(id)
    );

    user.room = room ?? null;
    user.name = userData?.name ?? 'Error name';
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
    background-color: ${colorsACss('secondary', 'light', 0.3)};
    padding: ${spacingCss(3)};
    min-width: 500px;
    max-width: 80%;
    max-height: 600px;
    row-gap: ${spacingCss(2)};
    border-radius: ${borderRadiusCss(2)};
`;
