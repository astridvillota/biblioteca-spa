import { useAuth } from "../context/AuthContext";

export default function Dashboard() {

    const { user } = useAuth();

    return (

        <div>

            <h1 className="text-4xl font-bold">

                Bienvenido

            </h1>

            <p className="mt-4 text-xl">

                {user?.nombre}

            </p>

            <p className="text-gray-600">

                Rol:

                <strong>

                    {" "}

                    {user?.rol}

                </strong>

            </p>

        </div>

    );

}