let lastId = 0;

export const generateId = () => {
    return lastId++;
};

export const wihtoutItem = <T extends { id: number }>(arr: T[], player: T) =>
    arr.filter((p) => p.id !== player.id);
