import { Position } from '@/types/maze';

type IsPausedFn = () => boolean;
type UpdateCellFn = (
  row: number,
  col: number,
  type: 'visited' | 'path',
) => Promise<void>;
type IsValidCellFn = (row: number, col: number) => boolean;

const getNeighbors = (
  position: Position,
  isValidCell: IsValidCellFn,
): Position[] => {
  const { row, col } = position;
  const neighbors: Position[] = [];
  const directions = [
    [-1, 0], // Up
    [1, 0], // Down
    [0, -1], // Left
    [0, 1], // Right
  ];

  for (const [dr, dc] of directions) {
    const newRow = row + dr;
    const newCol = col + dc;

    if (isValidCell(newRow, newCol)) {
      neighbors.push({ row: newRow, col: newCol });
    }
  }

  return neighbors;
};

export const runBFS = async (
  startPos: Position,
  endPos: Position,
  isValidCell: IsValidCellFn,
  updateCell: UpdateCellFn,
  isPaused: IsPausedFn,
): Promise<Map<string, string> | null> => {
  const queue: Position[] = [startPos];
  const visited = new Set<string>();
  const parent = new Map<string, string>();

  visited.add(`${startPos.row},${startPos.col}`);

  while (queue.length > 0 && !isPaused()) {
    const current = queue.shift()!;

    if (current.row === endPos.row && current.col === endPos.col) {
      return parent;
    }

    if (
      !(current.row === startPos.row && current.col === startPos.col) &&
      !(current.row === endPos.row && current.col === endPos.col)
    ) {
      await updateCell(current.row, current.col, 'visited');
    }
    const neighbors = getNeighbors(current, isValidCell);

    for (const neighbor of neighbors) {
      const key = `${neighbor.row},${neighbor.col}`;

      if (!visited.has(key)) {
        visited.add(key);
        parent.set(key, `${current.row},${current.col}`);
        queue.push(neighbor);
      }
    }
  }

  return null;
};

export const runDFS = async (
  startPos: Position,
  endPos: Position,
  isValidCell: IsValidCellFn,
  updateCell: UpdateCellFn,
  isPaused: IsPausedFn,
): Promise<Map<string, string> | null> => {
  const stack: Position[] = [startPos];
  const visited = new Set<string>();
  const parent = new Map<string, string>();

  visited.add(`${startPos.row},${startPos.col}`);

  while (stack.length > 0 && !isPaused()) {
    const current = stack.pop()!;
    if (current.row === endPos.row && current.col === endPos.col) {
      return parent;
    }

    if (
      !(current.row === startPos.row && current.col === startPos.col) &&
      !(current.row === endPos.row && current.col === endPos.col)
    ) {
      await updateCell(current.row, current.col, 'visited');
    }

    const neighbors = getNeighbors(current, isValidCell);

    for (const neighbor of neighbors) {
      const key = `${neighbor.row},${neighbor.col}`;

      if (!visited.has(key)) {
        visited.add(key);
        parent.set(key, `${current.row},${current.col}`);
        stack.push(neighbor);
      }
    }
  }

  return null;
};
