'use client';

import { useState, useEffect } from 'react';
import Grid from '@/components/grid';
import AlgorithmSelector from '@/components/algorithm-selector';
import ToolSelector from '@/components/tool-selector';
import SpeedControl from '@/components/speed-control';
import ControlPanel from '@/components/control-panel';
import StatsDisplay from '@/components/stats-display';
import Legend from '@/components/legend';
import { CellType, Position, PathStats } from '@/types/maze';
import { runBFS, runDFS } from '@/utils/pathfinding';

export default function MazePathfinding() {
  const rows = 15;
  const cols = 25;
  const [grid, setGrid] = useState<CellType[][]>([]);
  const [algorithm, setAlgorithm] = useState<'bfs' | 'dfs'>('bfs');
  const [speed, setSpeed] = useState(50);
  const [currentTool, setCurrentTool] = useState<'wall' | 'start' | 'end'>(
    'wall',
  );
  const [startPos, setStartPos] = useState<Position | null>(null);
  const [endPos, setEndPos] = useState<Position | null>(null);
  const [isVisualizing, setIsVisualizing] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [pathStats, setPathStats] = useState<PathStats>({
    visited: 0,
    pathLength: 0,
    found: false,
    timeElapsed: 0,
  });

  useEffect(() => {
    initializeGrid();
  }, []);

  const initializeGrid = () => {
    const newGrid: CellType[][] = [];
    for (let i = 0; i < rows; i++) {
      const row: CellType[] = [];
      for (let j = 0; j < cols; j++) {
        row.push('empty');
      }
      newGrid.push(row);
    }
    setGrid(newGrid);
    setStartPos(null);
    setEndPos(null);
    setPathStats({ visited: 0, pathLength: 0, found: false, timeElapsed: 0 });
  };

  const handleCellClick = (row: number, col: number) => {
    if (isVisualizing) return;

    const newGrid = [...grid];

    if (currentTool === 'start') {
      if (startPos) {
        newGrid[startPos.row][startPos.col] = 'empty';
      }
      newGrid[row][col] = 'start';
      setStartPos({ row, col });
    } else if (currentTool === 'end') {
      if (endPos) {
        newGrid[endPos.row][endPos.col] = 'empty';
      }
      newGrid[row][col] = 'end';
      setEndPos({ row, col });
    } else if (currentTool === 'wall') {
      if (newGrid[row][col] === 'empty') {
        newGrid[row][col] = 'wall';
      } else if (newGrid[row][col] === 'wall') {
        newGrid[row][col] = 'empty';
      }
    }

    setGrid(newGrid);
  };

  const generateRandomMaze = () => {
    if (isVisualizing) return;
    const newGrid: CellType[][] = [];
    for (let i = 0; i < rows; i++) {
      const row: CellType[] = [];
      for (let j = 0; j < cols; j++) {
        row.push(Math.random() < 0.3 ? 'wall' : 'empty');
      }
      newGrid.push(row);
    }

    setStartPos(null);
    setEndPos(null);
    setGrid(newGrid);
    setPathStats({ visited: 0, pathLength: 0, found: false, timeElapsed: 0 });
  };

  const clearGrid = () => {
    if (isVisualizing) return;
    initializeGrid();
  };

  const clearPath = () => {
    if (isVisualizing) return;

    const newGrid = grid.map((row) =>
      row.map((cell) =>
        cell === 'visited' || cell === 'path' ? 'empty' : cell,
      ),
    );

    setGrid(newGrid);
    setPathStats({ visited: 0, pathLength: 0, found: false, timeElapsed: 0 });
  };

  const reconstructPath = async (parent: Map<string, string>) => {
    if (!endPos) return;

    const path: Position[] = [];
    let current = `${endPos.row},${endPos.col}`;

    while (parent.has(current)) {
      const [row, col] = current.split(',').map(Number);
      path.push({ row, col });
      current = parent.get(current)!;
    }

    path.reverse();

    setPathStats((prev) => ({
      ...prev,
      pathLength: path.length,
    }));

    for (const pos of path) {
      if (
        !(pos.row === startPos?.row && pos.col === startPos?.col) &&
        !(pos.row === endPos.row && pos.col === endPos.col)
      ) {
        const newGrid = [...grid];
        newGrid[pos.row][pos.col] = 'path';
        setGrid(newGrid);

        await new Promise((resolve) => setTimeout(resolve, 50));
      }
    }
  };

  const startVisualization = async () => {
    if (!startPos || !endPos) {
      alert('Please set start and end positions');
      return;
    }
    setIsVisualizing(true);
    setIsPaused(false);
    clearPath();

    const startTime = performance.now();
    let visitedCount = 0;
    const updateCell = async (row: number, col: number, type: CellType) => {
      if (type === 'visited') visitedCount++;
      const newGrid = [...grid];
      newGrid[row][col] = type;
      setGrid(newGrid);
      setPathStats((prev) => ({
        ...prev,
        visited: visitedCount,
      }));

      await new Promise((resolve) => setTimeout(resolve, 101 - speed));
    };

    const isValidCell = (row: number, col: number) => {
      return (
        row >= 0 &&
        row < rows &&
        col >= 0 &&
        col < cols &&
        grid[row][col] !== 'wall'
      );
    };

    let result: Map<string, string> | null = null;

    if (algorithm === 'bfs') {
      result = await runBFS(
        startPos,
        endPos,
        isValidCell,
        updateCell,
        () => isPaused,
      );
    } else {
      result = await runDFS(
        startPos,
        endPos,
        isValidCell,
        updateCell,
        () => isPaused,
      );
    }

    const endTime = performance.now();

    if (result) {
      setPathStats((prev) => ({
        ...prev,
        visited: visitedCount,
        found: true,
        timeElapsed: Math.round(endTime - startTime),
      }));
      await reconstructPath(result);
    } else {
      setPathStats((prev) => ({
        ...prev,
        visited: visitedCount,
        found: false,
        timeElapsed: Math.round(endTime - startTime),
      }));
    }

    setIsVisualizing(false);
  };

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  return (
    <div className="min-h-screen p-4 bg-gradient-to-b from-slate-50 to-slate-100 md:p-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 text-center">
          <h1 className="mb-2 text-4xl font-bold text-slate-800">
            Maze Pathfinding Visualizer
          </h1>
        </header>

        <div className="grid lg:grid-cols-[1fr_350px] gap-8">
          {/* Main Grid */}
          <div className="overflow-hidden bg-white border shadow-lg rounded-xl border-slate-200">
            <Legend />

            {pathStats.visited > 0 && (
              <div className="flex justify-end px-4 py-2 border-b border-slate-200 bg-slate-50">
                <StatsDisplay stats={pathStats} compact={true} />
              </div>
            )}

            <div className="p-4">
              <Grid grid={grid} cols={cols} onCellClick={handleCellClick} />
            </div>

            {pathStats.visited > 0 && (
              <div className="p-4 border-t border-slate-200 bg-slate-50">
                <StatsDisplay stats={pathStats} />
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="space-y-6">
            <AlgorithmSelector
              algorithm={algorithm}
              setAlgorithm={setAlgorithm}
            />

            <ToolSelector
              currentTool={currentTool}
              setCurrentTool={setCurrentTool}
            />

            <SpeedControl speed={speed} setSpeed={setSpeed} />

            <ControlPanel
              isVisualizing={isVisualizing}
              isPaused={isPaused}
              onStart={startVisualization}
              onTogglePause={togglePause}
              onClearPath={clearPath}
              onClearGrid={clearGrid}
              onGenerateRandomMaze={generateRandomMaze}
            />
          </div>
        </div>

        <footer className="mt-12 text-sm text-center text-slate-500">
          <p>
            Click on the grid to place walls, start and end points. Then select
            an algorithm and start the visualization.
          </p>
        </footer>
      </div>
    </div>
  );
}
