import { createContext, useContext, useState } from "react";

const FlowContext = createContext();
export const useFlow = () => useContext(FlowContext);

export const FLOW_STATES = {
  IN_FLOW: "IN_FLOW",
  THINKING: "THINKING",
  STUCK: "STUCK",
  OFFLINE: "OFFLINE",
  RESET: "RESET",
};

export const FlowProvider = ({ children }) => {
  const [activeSession, setActiveSession] = useState(false);
  const [flowState, setFlowState] = useState(FLOW_STATES.OFFLINE);
  const [stats, setStats] = useState(() => {
    const saved = localStorage.getItem("flowStats");
    return saved
      ? JSON.parse(saved)
      : { momentumScore: 0, streak: 0 };
  });

  const saveStats = (newStats) => {
    setStats(newStats);
    localStorage.setItem("flowStats", JSON.stringify(newStats));
  };

  const startFlow = () => {
    setActiveSession(true);
    setFlowState(FLOW_STATES.IN_FLOW);
  };

  const endFlow = (finalState) => {
    if (!activeSession && finalState !== FLOW_STATES.RESET) return;

    setActiveSession(false);

    switch (finalState) {
      case FLOW_STATES.IN_FLOW: // user finished session
        saveStats({
          momentumScore: stats.momentumScore + 10,
          streak: stats.streak + 1,
        });
        setFlowState(FLOW_STATES.THINKING);
        break;

      case FLOW_STATES.STUCK: // user clicked stuck
        saveStats({
          momentumScore: stats.momentumScore,
          streak: 0,
        });
        setFlowState(FLOW_STATES.STUCK);
        break;

      case "AUTO": // timer ended naturally
        saveStats({
          momentumScore: stats.momentumScore + 10,
          streak: stats.streak + 1,
        });
        setFlowState(FLOW_STATES.THINKING);
        break;

      case FLOW_STATES.RESET: // reset session and optionally stats
        setFlowState(FLOW_STATES.RESET);
        setActiveSession(false);
        saveStats({ momentumScore: 0, streak: 0 });
        break;

      default:
        setFlowState(FLOW_STATES.OFFLINE);
        break;
    }
  };

  return (
    <FlowContext.Provider
      value={{
        startFlow,
        endFlow,
        activeSession,
        flowState,
        stats,
        setFlowState,
        FLOW_STATES,
      }}
    >
      {children}
    </FlowContext.Provider>
  );
};
