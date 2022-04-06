export const itemList = [
    {
        name: 'fish',
        type: 'food',
        calories: 200,
    },
    {
        name: 'meat',
        type: 'food',
        calories: 500,
    },
    {
        name: 'rum',
        type: 'food',
        calories: 100,
    },
    {
        name: 'wood',
        type: 'material',
    },
    {
        name: 'iron',
        type: 'material',
    },
    {
        name: 'leather',
        type: 'material',
    },
    {
        name: 'coal',
        type: 'material',
    },
    {
        name: 'stone',
        type: 'material',
    },
    {
        name: 'diamant',
        type: 'treasure',
        value: 1000,
    },
    {
        name: 'ring',
        type: 'treasure',
        value: 500,
    },
] as const;

export const itemNames = itemList.map((i) => i.name);

export type TItemName = typeof itemNames[number];
