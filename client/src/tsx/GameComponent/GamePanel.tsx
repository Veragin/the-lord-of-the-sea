import { colorsCss, spacingCss } from '../css';

import { Game } from '../../Game/Game';
import { Row } from '../StyledComponents';
import styled from 'styled-components';
import { useUser } from '../Contexts/UserContext';

type Props = {
    game: Game;
};

export const GamePanel = ({ game }: Props) => {
    const user = useUser();

    return (
        <StyledCont>
            Name: {user.name}
            Gold: {game.data.playerData.gold}
        </StyledCont>
    );
};

const StyledCont = styled(Row)`
    height: 100vh;
    width: 300px;
    border-left: 2px solid ${colorsCss.primary.dark};
    background-color: ${colorsCss.secondary.lighter};
    box-sizing: border-box;
    padding: ${spacingCss(2)};
`;
