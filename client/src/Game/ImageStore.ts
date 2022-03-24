import canoeSrc from '../Assets/image/ships/canoe.png';
import shipSrc from '../Assets/image/ships/ship.png';

const imageStore = {
    ship: new Image(100, 100),
    canoe: new Image(100, 100),
};

export const createImageStore = async () => {
    const imgNames = Object.keys(imageStore) as (keyof typeof imageStore)[];
    const promises = imgNames.map((name) => new Promise((resolve) => (imageStore[name].onload = resolve)));

    imageStore.ship.src = shipSrc;
    imageStore.canoe.src = canoeSrc;

    await Promise.all(promises);

    return imageStore;
};

export type TImageStore = typeof imageStore;
