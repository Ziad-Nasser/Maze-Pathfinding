export type CellType = 'empty' | 'wall' | 'start' | 'end' | 'visited' | 'path';

export interface Position {
  row: number;
  col: number;
}

export interface PathStats {
  visited: number;
  pathLength: number;
  found: boolean;
  timeElapsed: number;
}

export interface GridProps {
  grid: CellType[][];
  cols: number;
  onCellClick: (row: number, col: number) => void;
}

export interface SpeedControlProps {
  speed: number;
  setSpeed: (speed: number) => void;
}

export interface ControlPanelProps {
  isVisualizing: boolean;
  isPaused: boolean;
  onStart: () => void;
  onTogglePause: () => void;
  onClearPath: () => void;
  onClearGrid: () => void;
  onGenerateRandomMaze: () => void;
}

export interface StatsDisplayProps {
  stats: PathStats;
  compact?: boolean;
}

export type IsPausedFn = () => boolean;
export type UpdateCellFn = (
  row: number,
  col: number,
  type: 'visited' | 'path',
) => Promise<void>;

export type IsValidCellFn = (row: number, col: number) => boolean;