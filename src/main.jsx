import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import "./index.css";

import { AuthProvider } from "./context/AuthContext";
import { LibraryProvider } from "./context/LibraryContext";
import { BookProvider } from "./context/BookContext";
import { UserProvider } from "./context/UserContext";
import { LoanProvider } from "./context/LoanContext";
import { HistoryProvider } from "./context/HistoryContext";
import { ReservationProvider } from "./context/ReservationContext";
import { FineProvider } from "./context/FineContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <LibraryProvider>
          <BookProvider>
            <UserProvider>
              <LoanProvider>
                <HistoryProvider>
                  <ReservationProvider>
                    <FineProvider>
                      <App />
                    </FineProvider>
                  </ReservationProvider>
                </HistoryProvider>
              </LoanProvider>
            </UserProvider>
          </BookProvider>
        </LibraryProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);