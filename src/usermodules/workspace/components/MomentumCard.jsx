import { useFlow } from "../context/FlowContext";

export default function MomentumCard() {
  const { stats, flowState, FLOW_STATES } = useFlow();

  const getStateColor = (state) => {
    switch (state) {
      case FLOW_STATES.IN_FLOW:
        return "bg-green-600";
      case FLOW_STATES.THINKING:
        return "bg-yellow-500";
      case FLOW_STATES.STUCK:
        return "bg-red-600";
      case FLOW_STATES.RESET:
        return "bg-gray-500";
      default:
        return "bg-zinc-700";
    }
  };

  return (
    <div className="bg-zinc-800 rounded-xl p-6">
      <h3 className="text-lg font-semibold mb-2">Momentum</h3>

      <p className="text-sm text-zinc-400 mb-2">
        Module: Shows your momentum score and streak. Helps track focus over time.
      </p>

      <div className="text-3xl font-bold">{stats.momentumScore}</div>
      <p className="text-sm text-zinc-400">🔥 Streak: {stats.streak}</p>

      <span
        className={`inline-block mt-3 px-3 py-1 rounded ${getStateColor(flowState)}`}
      >
        {flowState}
      </span>
    </div>
  );
}
