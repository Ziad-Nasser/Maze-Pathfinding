import { SpeedControlProps } from "@/types/maze";

export default function SpeedControl({ speed, setSpeed }: SpeedControlProps) {
  return (
    <div className="p-6 bg-white border shadow-md rounded-xl border-slate-200">
      <h2 className="mb-2 text-xl font-semibold text-slate-800">
        Animation Speed
      </h2>
      <div className="space-y-3">
        <div className="flex justify-between text-sm text-slate-600">
          <span>Slow</span>
          <span>Fast</span>
        </div>
        <input
          type="range"
          min="1"
          max="100"
          value={speed}
          onChange={(e) => setSpeed(parseInt(e.target.value))}
          className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-slate-200 accent-gray-800"
        />
      </div>
    </div>
  );
}
