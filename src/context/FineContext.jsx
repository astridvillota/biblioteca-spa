import { createContext, useContext, useEffect, useState } from "react";

import {
  getFines,
  saveFines,
} from "../services/storage";

const FineContext = createContext();

export function FineProvider({ children }) {

  const [fines, setFines] = useState(getFines());

  useEffect(() => {
    saveFines(fines);
  }, [fines]);

  function addFine(fine) {
    setFines((prev) => [
      ...prev,
      {
        ...fine,
        id: Date.now(),
      },
    ]);
  }

  function updateFine(updatedFine) {
    setFines((prev) =>
      prev.map((fine) =>
        fine.id === updatedFine.id
          ? updatedFine
          : fine
      )
    );
  }

  function deleteFine(id) {
    setFines((prev) =>
      prev.filter((fine) => fine.id !== id)
    );
  }

  return (
    <FineContext.Provider
      value={{
        fines,
        addFine,
        updateFine,
        deleteFine,
      }}
    >
      {children}
    </FineContext.Provider>
  );
}

export function useFines() {
  return useContext(FineContext);
}