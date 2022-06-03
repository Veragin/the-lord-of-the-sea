import { generateId } from '../utils/utils';
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

export type TItemName = typeof itemNames[number];

export const itemNames = itemList.map((i) => i.name);

export const createItem = (name: TItemName): TItem => {
    const d = itemList.find((i) => i.name === name);
    if (d === undefined) {
        throw new Error(`Item with name ${name} not found`);
    }
    return {
        id: generateId(),
        ...d,
    };
};
