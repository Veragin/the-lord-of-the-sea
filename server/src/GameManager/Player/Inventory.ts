export class Inventory<T extends { id: number }> {
    maxSize: number = 3;
    stack: T[] = [];

    add = (items: T[]) => {
        items.forEach((i) => {
            if (this.stack.length <= this.maxSize) {
                this.stack.push(i);
            }
        });
    };

    remove = (items: T[]) => {
        const ids = items.map((i) => i.id);
        this.stack = this.stack.filter((i) => !ids.includes(i.id));
    };

    setMaxSize = (size: number) => {
        if (size < this.maxSize) {
            this.stack = this.stack.filter((i, n) => n < size);
        }
        this.maxSize = size;
    };
}
