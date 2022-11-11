import { Inventory } from './Inventory';
import { Sailor } from './Sailor';
import { Ship } from './Ship';
import { TItemName } from '../../Const/Items';
import { Team } from '../Team';
import { User } from 'UserManager/User';

export class Player {
    control = {
        // movement
        left: false,
        right: false,
        forward: false,
        back: false,

        sail: false,
        fire: false,
        mine: false,
    };

    ship = new Ship();

    inventory = new Inventory<TItem>();
    crew = new Inventory<Sailor>();
    gold: number = 0;

    constructor(public user: User, public team: Team) {}

    updatePlayerData = (
        d: Partial<{
            goldIncome: number;
            itemsAdd: TItem[];
            itemsRemove: TItem[];
        }>
    ) => {
        if (d.goldIncome) {
            if (this.gold + d.goldIncome < 0) {
                throw new Error('not enoug money');
            }

            this.gold += d.goldIncome;
        }

        if (d.itemsAdd) {
            this.inventory.add(d.itemsAdd);
        }

        if (d.itemsRemove) {
            this.inventory.add(d.itemsRemove);
        }

        this.sendPlayerData();
    };

    sendPlayerData = () => {
        this.user.agent.sendGamePlayerData({
            gold: this.gold,
            inventory: this.inventory.stack.map((i) => i.name as TItemName),
            maxInventory: this.inventory.maxSize,
        });
    };
}
