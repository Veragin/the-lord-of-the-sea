import { useEffect, useRef } from 'react';

import { Column } from '../StyledComponents';
import { Game } from '../../Game/Game';
import styled from 'styled-components';
import { useUser } from '../Contexts/UserContext';

export const GameComponent = () => {
    const user = useUser();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const gameRef = useRef<Game | null>(null);

    useEffect(() => {
        if (canvasRef.current) {
            gameRef.current = new Game(user, canvasRef.current);
        }
    }, [user, canvasRef]);

    return (
        <StyledCont>
            <StyledCanvas ref={canvasRef} />
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
