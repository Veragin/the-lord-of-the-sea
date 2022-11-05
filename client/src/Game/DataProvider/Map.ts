export class Map {
    islands: TIsland[] = [];
    width: number = 2000;
    height: number = 2000;

    init(data: TGameLoad['map']) {
        this.islands = data.islands;
        this.width = data.width;
        this.height = data.height;
    }
}
