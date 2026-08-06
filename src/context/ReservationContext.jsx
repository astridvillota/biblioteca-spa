import { createContext, useContext, useEffect, useState } from "react";

import {
  getReservations,
  saveReservations,
} from "../services/storage";

const ReservationContext = createContext();

export function ReservationProvider({ children }) {

  const [reservations, setReservations] = useState(
    getReservations()
  );

  useEffect(() => {
    saveReservations(reservations);
  }, [reservations]);

  function addReservation(reservation) {

    setReservations((prev) => [
      ...prev,
      {
        ...reservation,
        id: Date.now(),
      },
    ]);

  }

  function updateReservation(updatedReservation) {

    setReservations((prev) =>
      prev.map((reservation) =>
        reservation.id === updatedReservation.id
          ? updatedReservation
          : reservation
      )
    );

  }

  function deleteReservation(id) {

    setReservations((prev) =>
      prev.filter(
        (reservation) => reservation.id !== id
      )
    );

  }

  return (

    <ReservationContext.Provider
      value={{
        reservations,
        addReservation,
        updateReservation,
        deleteReservation,
      }}
    >

      {children}

    </ReservationContext.Provider>

  );

}

export function useReservations() {

  return useContext(ReservationContext);

}