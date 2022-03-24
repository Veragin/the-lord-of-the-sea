import { useEffect, useRef, useState } from 'react';

import { Column } from '../StyledComponents';
import { Game } from '../../Game/Game';
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
        if (canvasRef.current) {
            const game = new Game(user, canvasRef.current);
            gameRef.current = game;

            const loadId = user.eventRegister.subscribe({
                type: 'gameLoad',
                do: async (loadData) => {
                    await game.init(room, loadData);
                    user.gameAgent.laodDone();
                },
            });

            const startId = user.eventRegister.subscribe({
                type: 'gameStart',
                do: () => {
                    setIsLoading(false);
                    console.log(game);
                },
            });

            // game is ready
            user.gameAgent.initDone();

            return () => {
                user.eventRegister.unsubscribe('gameLoad', loadId);
                user.eventRegister.unsubscribe('gameStart', startId);
            };
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [canvasRef.current]);

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
