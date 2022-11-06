import { useEffect, useRef, useState } from 'react';

import { Game } from '../../Game/Game';
import { GamePanel } from './GamePanel';
import { Row } from '../StyledComponents';
import { createGame } from '../../Game/createGame';
import styled from 'styled-components';
import { useUser } from '../Contexts/UserContext';

type Props = {
    room: TRoom;
};

export const GameComponent = ({ room }: Props) => {
    const user = useUser();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [game, setGame] = useState<Game | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (canvasRef.current) {
            setGame(
                createGame(room, user, canvasRef.current, () => {
                    setIsLoading(false);
                })
            );
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <StyledCont>
            {isLoading && <StyledLoading />}
            <StyledCanvas ref={canvasRef} />
            {game && <GamePanel game={game} />}
        </StyledCont>
    );
};

const StyledCont = styled(Row)`
    height: 100vh;
    width: 100vw;
`;

const StyledCanvas = styled.canvas`
    height: 100%;
    width: 100%;
`;

const StyledLoading = styled.div`
    height: 100px;
    width: 100px;
    left: calc(50% - 50px);
    top: calc(50% - 50px);
    position: absolute;
    background-color: red;
`;
