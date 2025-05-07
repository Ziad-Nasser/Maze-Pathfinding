export default function Legend() {
  return (
    <div className="flex items-center justify-between p-4 border-b border-slate-200 bg-slate-50">
      <div className="flex items-center space-x-4">
        <div className="flex items-center">
          <div className="w-4 h-4 mr-2 bg-blue-500 rounded-full"></div>
          <span className="text-sm text-slate-600">Start</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 mr-2 rounded-full bg-rose-500"></div>
          <span className="text-sm text-slate-600">End</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 mr-2 bg-black rounded-full"></div>
          <span className="text-sm text-slate-600">Wall</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 mr-2 rounded-full bg-emerald-400"></div>
          <span className="text-sm text-slate-600">Path</span>
        </div>
      </div>
    </div>
  );
}
