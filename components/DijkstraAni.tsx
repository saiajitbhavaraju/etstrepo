import { Node } from '@/components/node';

export const dijkstra = (
    grid: Node[][],
    startNode: Node,
    endNode: Node,
    allowDiagonal: boolean

): { animations: Node[], path: Node[] } => {
    const animations: Node[] = [];
    const visitedNodes: Node[] = [];
    startNode.distance = 0;

    const unvisitedNodes = getAllNodes(grid);
    while (unvisitedNodes.length > 0) {
        unvisitedNodes.sort((a, b) => a.distance - b.distance);
        const closestNode = unvisitedNodes.shift();
        if (!closestNode || closestNode.isWall) continue;
        if (closestNode.distance === Infinity) {
            return { animations: visitedNodes, path: [] };
        }
        closestNode.isVisited = true;
        animations.push(closestNode);
        if (closestNode === endNode) {
            return { animations, path: getPath(endNode) };
        }
        updateNeighbours(closestNode, grid, allowDiagonal);
    }
    return { animations, path: [] };
}

const getAllNodes = (grid: Node[][]): Node[] => {
    const nodes: Node[] = [];
    for (const row of grid) {
        for (const node of row) {
            nodes.push(node);
        }
    }
    return nodes;
}

const updateNeighbours = (node: Node, grid: Node[][], allowDiagonal: boolean): void => {
    const neighbours = getNeighbours(node, grid, allowDiagonal);
    for (const neighbour of neighbours) {
        const distance = node.distance + 1;
        if (distance < neighbour.distance) {
            neighbour.distance = distance;
            neighbour.prevNode = node;
        }
    }
};

const getNeighbours = (node: Node, grid: Node[][], allowDiagonal: boolean): Node[] => {
    const neighbours: Node[] = [];
    const { row, col } = node;

    if (row > 0) neighbours.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbours.push(grid[row + 1][col]);
    if (col > 0) neighbours.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbours.push(grid[row][col + 1]);

    if (allowDiagonal) {
        if (row > 0 && col > 0) neighbours.push(grid[row - 1][col - 1]);
        if (row > 0 && col < grid[0].length - 1) neighbours.push(grid[row - 1][col + 1]);
        if (row < grid.length - 1 && col > 0) neighbours.push(grid[row + 1][col - 1]);
        if (row < grid.length - 1 && col < grid[0].length - 1) neighbours.push(grid[row + 1][col + 1]);
    }

    return neighbours.filter((neighbour) => !neighbour.isVisited && !neighbour.isWall);
};

const getPath = (endNode: Node): Node[] => {
    const path: Node[] = [];
    let curNode: Node | null = endNode;
    while (curNode != null) {
        path.unshift(curNode);
        curNode = curNode.prevNode;
    }
    return path;
}