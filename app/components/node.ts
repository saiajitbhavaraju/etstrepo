export class Node {
    row: number;
    col: number;
    isStart: boolean;
    isEnd: boolean;
    isWall: boolean;
    distance: number;
    isVisited: boolean;
    prevNode: Node | null;

    constructor(row: number, col: number) {
        this.row = row;
        this.col = col;
        this.isStart = false;
        this.isEnd = false;
        this.isWall = false;
        this.distance = Infinity;
        this.isVisited = false;
        this.prevNode = null;

    }
}