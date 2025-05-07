import { CellType } from '@/types/maze';
import { GridProps } from '@/types/maze';

export default function Grid({ grid, cols, onCellClick }: GridProps) {
  const getCellColor = (type: CellType) => {
    switch (type) {
      case 'empty':
        return 'bg-slate-50';
      case 'wall':
        return 'bg-black';
      case 'start':
        return 'bg-blue-500';
      case 'end':
        return 'bg-rose-500';
      case 'visited':
        return 'bg-violet-200';
      case 'path':
        return 'bg-emerald-400';
      default:
        return 'bg-slate-50';
    }
  };

  return (
    <div
      className="grid overflow-hidden border rounded-lg border-slate-200"
      style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)` }}
    >
      {grid.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className={`${getCellColor(
              cell,
            )} hover:opacity-80 aspect-square cursor-pointer transition-all duration-200`}
            onClick={() => onCellClick(rowIndex, colIndex)}
          />
        )),
      )}
    </div>
  );
}
