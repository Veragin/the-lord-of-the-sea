let lastId = 0;

export const generateId = () => {
    return lastId++;
};

export const wihtoutItem = <T extends { id: number }>(arr: T[], player: T) => arr.filter((p) => p.id !== player.id);

export const wihtoutId = <T extends { id: number }>(arr: T[], id: number) => arr.filter((p) => p.id !== id);
