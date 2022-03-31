declare type TItemBase = {
    name: string;
    type: string;
};

declare type TMaterial = TItemBase & {
    type: 'material';
};

declare type TFood = TItemBase & {
    type: 'food';
    calories: number;
};

declare type TTreasure = TItemBase & {
    type: 'treasure';
    value: number;
};

declare type TItem = TMaterial | TFood | TTreasure;
