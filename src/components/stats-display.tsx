import { StatsDisplayProps } from '@/types/maze';

export default function StatsDisplay({
  stats,
  compact = false,
}: StatsDisplayProps) {
  if (compact) {
    return (
      <div className="text-sm text-slate-600">
        {stats.found ? `Found path in ${stats.timeElapsed}ms` : 'No path found'}
      </div>
    );
  }

  return (
    <div className="flex justify-between text-sm text-slate-600">
      <div>Cells visited: {stats.visited}</div>
      {stats.pathLength > 0 && <div>Path length: {stats.pathLength}</div>}
    </div>
  );
}
