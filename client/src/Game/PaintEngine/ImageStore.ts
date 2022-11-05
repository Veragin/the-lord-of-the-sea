import baseOffSrc from '../../Assets/image/ships/baseOff.png';
import baseOnSrc from '../../Assets/image/ships/baseOn.png';
import canoeSrc from '../../Assets/image/ships/canoe.png';
import galeraOffSrc from '../../Assets/image/ships/galeraOff.png';
import galeraOnSrc from '../../Assets/image/ships/galeraOn.png';
import shipSrc from '../../Assets/image/ships/ship.png';

const imageStore = {
    ship: new Image(),
    canoe: new Image(),
    baseOn: new Image(),
    baseOff: new Image(),
    galeraOn: new Image(),
    galeraOff: new Image(),
};

export const createImageStore = async () => {
    const imgNames = Object.keys(imageStore) as (keyof typeof imageStore)[];

    const promises = imgNames.map(
        (name) =>
            new Promise((resolve) =>
                imageStore[name].addEventListener(
                    'load',
                    () => {
                        resolve(true);
                    },
                    false
                )
            )
    );

    imageStore.ship.src = shipSrc;
    imageStore.canoe.src = canoeSrc;
    imageStore.baseOn.src = baseOnSrc;
    imageStore.baseOff.src = baseOffSrc;
    imageStore.galeraOn.src = galeraOnSrc;
    imageStore.galeraOff.src = galeraOffSrc;

    await Promise.all(promises);

    return imageStore;
};

export type TImageStore = typeof imageStore;
