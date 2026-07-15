import { Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Books from "../pages/Books";
import Loans from "../pages/Loans";
import History from "../pages/History";
import NotFound from "../pages/NotFound";

import AdminLayout from "../layouts/AdminLayout";

import ProtectedRoute from "../components/ProtectedRoute";

export default function AppRoutes() {

    return (

        <Routes>

            <Route

                path="/"

                element={<Login />}

            />

            <Route

                element={

                    <ProtectedRoute>

                        <AdminLayout />

                    </ProtectedRoute>

                }

            >

                <Route

                    path="/dashboard"

                    element={<Dashboard />}

                />

                <Route

                    path="/books"

                    element={<Books />}

                />

                <Route

                    path="/loans"

                    element={<Loans />}

                />

                <Route

                    path="/history"

                    element={<History />}

                />

            </Route>

            <Route

                path="*"

                element={<NotFound />}

            />

        </Routes>

    );

}