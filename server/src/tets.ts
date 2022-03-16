const a = 5 + 3;

const ll = a;

let b = "aa";

const c = true;

const e = {
    id: 5,
    name: "asdasd",
};

const car: TCar = {
    name: "ford",
    color: "blue",
};

const ee = e;

ee.id = 15;

e.id === 15; //true

const d: number[] = [5, 2, 10, 15];

const runCar = (car: TCar) => {
    if (a === 8) {
        throw new MyError();
    }
    return 5;
};

class MyError extends Error {
    constructor() {
        super("muj error");
    }
}

try {
    runCar(car);
} catch (e) {
    if (e instanceof MyError) {
    }
    console.log(e);
}

class Driver {
    public car?: TCar;
    public eye: string;
    private age: number = 25;

    constructor(public name: string) {
        this.eye = "sdasda";
    }
}

type TCar = {
    name: string;
    color: "red" | "blue";
};

export const driver = new Driver("Lojza");

const ass = setTimeout(() => {}, 10_000);
