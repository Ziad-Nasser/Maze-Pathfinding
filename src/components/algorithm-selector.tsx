interface AlgorithmSelectorProps {
  algorithm: 'bfs' | 'dfs';
  setAlgorithm: (algorithm: 'bfs' | 'dfs') => void;
}

export default function AlgorithmSelector({
  algorithm,
  setAlgorithm,
}: AlgorithmSelectorProps) {
  const getAlgorithmDescription = () => {
    if (algorithm === 'bfs') {
      return 'Guarantees the shortest path. Explores nodes level by level.';
    } else {
      return 'Explores as far as possible before backtracking. May not find shortest path.';
    }
  };

  return (
    <div className="p-6 bg-white border shadow-md rounded-xl border-slate-200">
      <h2 className="mb-2 text-xl font-semibold text-slate-800">Algorithm</h2>
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <div
            className={`flex-1 p-3 rounded-lg border ${
              algorithm === 'bfs'
                ? 'border-slate-700 bg-violet-50'
                : 'border-slate-200'
            } cursor-pointer transition-all`}
            onClick={() => setAlgorithm('bfs')}
          >
            <div className="font-medium text-slate-800">BFS</div>
            <div className="text-xs text-slate-500">Breadth-First Search</div>
          </div>
          <div
            className={`flex-1 p-3 rounded-lg border ${
              algorithm === 'dfs'
                ? 'border-slate-700 bg-violet-50'
                : 'border-slate-200'
            } cursor-pointer transition-all`}
            onClick={() => setAlgorithm('dfs')}
          >
            <div className="font-medium text-slate-800">DFS</div>
            <div className="text-xs text-slate-500">Depth-First Search</div>
          </div>
        </div>
        <p className="text-sm italic text-slate-600">
          {getAlgorithmDescription()}
        </p>
      </div>
    </div>
  );
}
