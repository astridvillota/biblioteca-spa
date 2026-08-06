import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  function login(email, password) {

    let userData = null;

    // ADMINISTRADOR

    if (
      email === "admin@biblioteca.com" &&
      password === "123456"
    ) {

      userData = {

        email: "admin@biblioteca.com",

        nombre: "Administrador",

        rol: "Administrador",

      };

    }

    // MIEMBRO

    if (
      email === "usuario@biblioteca.com" &&
      password === "123456"
    ) {

      userData = {

        email: "usuario@biblioteca.com",

        nombre: "Usuario",

        rol: "Miembro",

      };

    }

    if (userData) {

      setUser(userData);

      localStorage.setItem(
        "user",
        JSON.stringify(userData)
      );

      return true;

    }

    return false;

  }

  function logout() {

    setUser(null);

    localStorage.removeItem("user");

  }

  return (

    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >

      {children}

    </AuthContext.Provider>

  );

}

export function useAuth() {
  return useContext(AuthContext);
}