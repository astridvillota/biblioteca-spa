import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Assistant from "../components/Assistant";

export default function AdminLayout() {
  return (
    <div className="flex">

      <Sidebar />

      <div className="flex-1 bg-slate-100 min-h-screen">

        <Navbar />

        <main className="p-8">
          <Outlet />
        </main>

      </div>

      {/* Asistente Virtual IA */}
      <Assistant />

    </div>
  );
}