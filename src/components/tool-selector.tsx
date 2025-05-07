interface ToolSelectorProps {
  currentTool: 'wall' | 'start' | 'end';
  setCurrentTool: (tool: 'wall' | 'start' | 'end') => void;
}

export default function ToolSelector({
  currentTool,
  setCurrentTool,
}: ToolSelectorProps) {
  return (
    <div className="p-6 bg-white border shadow-md rounded-xl border-slate-200">
      <h2 className="mb-2 text-xl font-semibold text-slate-800">Tools</h2>
      <div className="grid grid-cols-3 gap-2">
        <button
          className={`p-3 rounded-lg flex flex-col items-center justify-center transition-all ${
            currentTool === 'wall'
              ? 'bg-slate-800 text-white'
              : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
          }`}
          onClick={() => setCurrentTool('wall')}
        >
          <div className="w-6 h-6 mb-1 rounded-md bg-slate-800"></div>
          <span className="text-sm">Wall</span>
        </button>
        <button
          className={`p-3 rounded-lg flex flex-col items-center justify-center transition-all ${
            currentTool === 'start'
              ? 'bg-emerald-500 text-white'
              : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
          }`}
          onClick={() => setCurrentTool('start')}
        >
          <div className="w-6 h-6 mb-1 rounded-md bg-emerald-500"></div>
          <span className="text-sm">Start</span>
        </button>
        <button
          className={`p-3 rounded-lg flex flex-col items-center justify-center transition-all ${
            currentTool === 'end'
              ? 'bg-rose-500 text-white'
              : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
          }`}
          onClick={() => setCurrentTool('end')}
        >
          <div className="w-6 h-6 mb-1 rounded-md bg-rose-500"></div>
          <span className="text-sm">End</span>
        </button>
      </div>
    </div>
  );
}
