import { colorsCss, spacingCss } from '../css';

import { Game } from '../../Game/Game';
import { Row } from '../StyledComponents';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import { useUser } from '../Contexts/UserContext';

type Props = {
    game: Game;
};

export const GamePanel = observer(({ game }: Props) => {
    const user = useUser();

    return (
        <StyledCont>
            Name: {user.name}
            Gold: {game.data.playerData.gold}
            Inventory: {game.data.playerData.inventory.join(', ')}
        </StyledCont>
    );
});

const StyledCont = styled(Row)`
    position: absolute;
    height: calc(100vh - ${spacingCss(4)});
    width: 300px;
    border-left: 2px solid ${colorsCss.primary.dark};
    background-color: ${colorsCss.secondary.lighter};
    box-sizing: border-box;
    padding: ${spacingCss(2)};
`;
