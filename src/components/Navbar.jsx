import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {

    const { user, logout } = useAuth();

    const navigate = useNavigate();

    function salir() {

        logout();

        navigate("/");

    }

    return (

        <header className="bg-white shadow flex justify-between items-center px-8 py-4">

            <div>

                <h2 className="text-2xl font-bold">

                    Sistema Biblioteca

                </h2>

            </div>

            <div className="flex items-center gap-6">

                <div className="text-right">

                    <p className="font-semibold">

                        {user?.nombre}

                    </p>

                    <p className="text-sm text-gray-500">

                        {user?.rol}

                    </p>

                </div>

                <button

                    onClick={salir}

                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"

                >

                    Salir

                </button>

            </div>

        </header>

    );

}