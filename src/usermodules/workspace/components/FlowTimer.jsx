import { useEffect, useState } from "react";
import { useFlow } from "../context/FlowContext";

export default function FlowTimer() {
  const { startFlow, endFlow, activeSession, FLOW_STATES } = useFlow();
  const SESSION_TIME = 1500; // 25 min
  const [time, setTime] = useState(SESSION_TIME);

  useEffect(() => {
    if (!activeSession) return;

    setTime(SESSION_TIME); // reset timer on new session
    const interval = setInterval(() => {
      setTime((t) => {
        if (t <= 1) {
          clearInterval(interval);
          endFlow("AUTO"); // timer ended naturally
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [activeSession]);

  const handleReset = () => {
    setTime(SESSION_TIME);
    endFlow(FLOW_STATES.RESET);
  };

  return (
    <div className="bg-zinc-800 rounded-xl p-6">
      <h2 className="text-xl font-semibold mb-2">Flow Session</h2>

      <p className="text-sm text-zinc-400 mb-4">
        Module: Track your focused 25-min sessions to boost momentum and streak.
      </p>

      <div className="text-4xl font-mono text-center mb-6">
        {Math.floor(time / 60)}:{String(time % 60).padStart(2, "0")}
      </div>

      {!activeSession ? (
        <button
          onClick={startFlow}
          className="w-full bg-indigo-600 py-2 rounded"
        >
          Start Flow
        </button>
      ) : (
        <div className="flex gap-3">
          <button
            onClick={() => endFlow(FLOW_STATES.IN_FLOW)}
            className="flex-1 bg-green-600 py-2 rounded"
          >
            Done
          </button>
          <button
            onClick={() => endFlow(FLOW_STATES.STUCK)}
            className="flex-1 bg-red-600 py-2 rounded"
          >
            Stuck
          </button>
          <button
            onClick={handleReset}
            className="flex-1 bg-gray-500 py-2 rounded"
          >
            Reset
          </button>
        </div>
      )}
    </div>
  );
}
