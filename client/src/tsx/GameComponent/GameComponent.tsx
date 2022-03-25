import { useEffect, useRef, useState } from 'react';

import { Column } from '../StyledComponents';
import { Game } from '../../Game/Game';
import { createGame } from '../../Game/createGame';
import styled from 'styled-components';
import { useUser } from '../Contexts/UserContext';

type Props = {
    room: TRoom;
};

export const GameComponent = ({ room }: Props) => {
    const user = useUser();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const gameRef = useRef<Game | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        console.log('useEffect');
        if (canvasRef.current) {
            gameRef.current = createGame(room, user, canvasRef.current, () =>
                setIsLoading(false)
            );
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <StyledCont>
            <StyledCanvas ref={canvasRef} />
            {isLoading && <StyledLoading />}
        </StyledCont>
    );
};

const StyledCont = styled(Column)`
    height: 100vh;
    width: 100vw;
`;

const StyledCanvas = styled.canvas`
    height: 100vh;
    width: 100vw;
    position: absolute;
    top: 0;
    left: 0;
`;

const StyledLoading = styled.div`
    height: 100px;
    width: 100px;
    left: calc(50% - 50px);
    top: calc(50% - 50px);
    position: absolute;
    background-color: red;
`;
