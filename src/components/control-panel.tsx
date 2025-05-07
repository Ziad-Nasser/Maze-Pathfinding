import { ControlPanelProps } from '@/types/maze';

export default function ControlPanel({
  isVisualizing,
  isPaused,
  onStart,
  onTogglePause,
  onClearPath,
  onClearGrid,
  onGenerateRandomMaze,
}: ControlPanelProps) {
  return (
    <div className="p-6 bg-white border shadow-md rounded-xl border-slate-200">
      <h2 className="mb-2 text-xl font-semibold text-slate-800">Controls</h2>
      <div className="space-y-3">
        <button
          className={`w-full py-3 px-4 rounded-lg font-medium transition-all ${
            isVisualizing && !isPaused
              ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
              : 'bg-emerald-600 text-white hover:bg-emerald-700'
          }`}
          onClick={onStart}
          disabled={isVisualizing && !isPaused}
        >
          {isVisualizing ? 'Visualizing...' : 'Start Visualization'}
        </button>

        {isVisualizing && (
          <button
            className="w-full px-4 py-3 font-medium transition-all border rounded-lg border-slate-300 hover:bg-slate-100"
            onClick={onTogglePause}
          >
            {isPaused ? 'Resume' : 'Pause'}
          </button>
        )}

        <div className="grid grid-cols-2 gap-3">
          <button
            className={`py-3 px-4 rounded-lg text-black font-medium border border-slate-300 hover:bg-slate-100 transition-all ${
              isVisualizing && !isPaused ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            onClick={onClearPath}
            disabled={isVisualizing && !isPaused}
          >
            Clear Path
          </button>
          <button
            className={`py-3 px-4 rounded-lg text-black font-medium border border-slate-300 hover:bg-slate-100 transition-all ${
              isVisualizing && !isPaused ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            onClick={onClearGrid}
            disabled={isVisualizing && !isPaused}
          >
            Clear All
          </button>
        </div>

        <button
          className={`w-full py-3 px-4 rounded-lg font-medium bg-slate-800 text-white hover:bg-slate-900 transition-all ${
            isVisualizing && !isPaused ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          onClick={onGenerateRandomMaze}
          disabled={isVisualizing && !isPaused}
        >
          Generate Random Maze
        </button>
      </div>
    </div>
  );
}
