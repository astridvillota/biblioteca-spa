import { createContext, useContext, useEffect, useState } from "react";

import {
  getHistory,
  saveHistory,
} from "../services/storage";

const HistoryContext = createContext();

export function HistoryProvider({ children }) {

  const [history, setHistory] = useState(getHistory());

  useEffect(() => {
    saveHistory(history);
  }, [history]);

  function addHistory(action) {

    const newAction = {
      id: Date.now(),
      fecha: new Date().toLocaleDateString(),
      hora: new Date().toLocaleTimeString(),
      ...action,
    };

    setHistory((prev) => [newAction, ...prev]);

  }

  return (

    <HistoryContext.Provider
      value={{
        history,
        addHistory,
      }}
    >
      {children}
    </HistoryContext.Provider>

  );

}

export function useHistory() {
  return useContext(HistoryContext);
}