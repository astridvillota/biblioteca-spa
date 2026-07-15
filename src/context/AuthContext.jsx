import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

const USERS = [
  {
    id: 1,
    nombre: "Administrador",
    email: "admin@biblioteca.com",
    password: "123456",
    rol: "admin",
  },
  {
    id: 2,
    nombre: "Juan Pérez",
    email: "usuario@biblioteca.com",
    password: "123456",
    rol: "member",
  },
];

export function AuthProvider({ children }) {

  const [user, setUser] = useState(null);

  useEffect(() => {

    const saved = localStorage.getItem("usuario");

    if (saved) {

      setUser(JSON.parse(saved));

    }

  }, []);

  const login = (email, password) => {

    const encontrado = USERS.find(
      u => u.email === email && u.password === password
    );

    if (!encontrado) return false;

    localStorage.setItem(
      "usuario",
      JSON.stringify(encontrado)
    );

    setUser(encontrado);

    return true;

  };

  const logout = () => {

    localStorage.removeItem("usuario");

    setUser(null);

  };

  return (

    <AuthContext.Provider
      value={{
        user,
        login,
        logout
      }}
    >

      {children}

    </AuthContext.Provider>

  );

}

export function useAuth(){

    return useContext(AuthContext);

}