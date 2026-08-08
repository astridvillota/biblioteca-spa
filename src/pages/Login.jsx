import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const ingresar = (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Por favor, complete todos los campos.");
      return;
    }

    const ok = login(email, password);

    if (ok) {
      navigate("/dashboard");
    } else {
      setError("Correo o contrasena incorrectos.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">

          <div className="bg-blue-700 text-white px-8 py-8 text-center">
            <div className="mx-auto mb-4 w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg text-4xl">
              📚
            </div>

            <h1 className="text-3xl font-bold">
              Biblioteca SPA
            </h1>

            <p className="mt-2 text-blue-100">
              Sistema de Gestion Bibliotecaria
            </p>
          </div>

          <div className="p-8">

            <h2 className="text-2xl font-bold text-slate-800 text-center mb-2">
              Iniciar sesion
            </h2>

            <p className="text-gray-500 text-center mb-6">
              Ingrese sus datos para acceder al sistema.
            </p>

            <form onSubmit={ingresar}>

              <div className="mb-5">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Correo electronico
                </label>

                <input
                  type="email"
                  className="border border-gray-300 w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ingrese su correo"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="username"
                />
              </div>

              <div className="mb-5">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Contrasena
                </label>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="border border-gray-300 w-full p-3 pr-12 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Ingrese su contrasena"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600"
                  >
                    {showPassword ? "Ocultar" : "Ver"}
                  </button>
                </div>
              </div>

              {error && (
                <div className="mb-5 bg-red-50 border border-red-200 text-red-700 rounded-lg p-3 text-sm text-center">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition shadow-md"
              >
                Ingresar al sistema
              </button>

            </form>
          </div>

          <div className="bg-gray-50 border-t px-6 py-4 text-center">
            <p className="text-sm text-gray-500">
              Sistema de Gestion de Biblioteca
            </p>

            <p className="text-xs text-gray-400 mt-1">
              Biblioteca SPA - 2026
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
