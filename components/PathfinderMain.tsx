// pathfinder.tsx
import React, { useState, useEffect } from 'react';
import { Node } from '@/components/node';
import { dijkstra } from '@/components/DijkstraAni';


const ANIMATION_SPEED = 10;

const Pathfinder: React.FC = () => {
    const [grid, setGrid] = useState<Node[][]>([]);
    const [startNode, setStartNode] = useState<Node | null>(null);
    const [endNode, setEndNode] = useState<Node | null>(null);
    const [allowDiagonal, setAllowDiagonal] = useState<boolean>(false);

    useEffect(() => {
        initializeGrid();
    }, []);

    const initializeGrid = (): void => {
        const newGrid: Node[][] = [];
        for (let row = 0; row < 15; row++) {
            const currentRow: Node[] = [];
            for (let col = 0; col < 40; col++) {
                const node = new Node(row, col);
                currentRow.push(node);
            }
            newGrid.push(currentRow);
        }
        setGrid(newGrid);
        setStartNode(newGrid[7][5]);
        setEndNode(newGrid[10][35]);
    };
    // const reset = () => {
    //     const newGrid = initializeGrid();
    //     setGrid(newGrid);

    // };
    // useEffect(() => {
    //     reset()}, []);
    const visualizeDijkstra = (): void => {
        if (!startNode || !endNode) return;

        const { animations, path } = dijkstra(grid, startNode, endNode, allowDiagonal);

        for (let i = 0; i < animations.length; i++) {
            setTimeout(() => {
                const node = animations[i];
                const element = document.getElementById(`node-${node.row}-${node.col}`);
                if (element) {
                    element.classList.add('visited');
                }
            }, ANIMATION_SPEED * i);
        }

        for (let i = 0; i < path.length; i++) {
            setTimeout(() => {
                const node = path[i];
                const element = document.getElementById(`node-${node.row}-${node.col}`);
                if (element) {
                    element.classList.add('path');
                }
            }, ANIMATION_SPEED * animations.length + ANIMATION_SPEED * 5 * i);
        }
    };

    return (
        // Html 
        <div>
            <div className="nav flex justify-center items-center my-5 gap-3">
                <button onClick={visualizeDijkstra} className="border rounded-lg">Visualize Dijkstra</button>
                <label>
                    <input
                        type="checkbox"
                        checked={allowDiagonal}
                        onChange={() => setAllowDiagonal(!allowDiagonal)}
                    />
                    Allow Diagonal Movement
                </label>
            </div>
            <div className="grid my-10 justify-center items-center">
                {grid.map((row, rowIdx) => (
                    <div key={rowIdx} className="row">
                        {row.map((node, nodeIdx) => (
                            <div
                                key={nodeIdx}
                                id={`node-${node.row}-${node.col}`}
                                className={`node ${node.isStart ? 'start' : ''} ${node.isEnd ? 'end' : ''}`}
                            ></div>
                        ))}
                    </div>
                ))}
            </div>
            {/* <div className="buttons">
                <button onClick={initializeGrid}>Reset Grid</button>
            </div> */}
        </div>
    );
};

export default Pathfinder;