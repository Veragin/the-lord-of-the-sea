export class Inventory<T> {
    maxSize: number = 3;
    stack: T[] = [];

    add = (item: T) => {
        if (this.stack.length <= this.maxSize) {
            this.stack.push(item);
        }
    };

    remove = (item: T) => {
        this.stack = this.stack.filter((i) => i !== item);
    };

    setMaxSize = (size: number) => {
        if (size < this.maxSize) {
            this.stack = this.stack.filter((i, n) => n < size);
        }
        this.maxSize = size;
    };
}
