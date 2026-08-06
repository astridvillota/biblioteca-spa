import { createContext, useContext, useEffect, useState } from "react";

import {
  getUsers,
  saveUsers,
} from "../services/storage";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [users, setUsers] = useState(getUsers());

  useEffect(() => {
    saveUsers(users);
  }, [users]);

  function addUser(user) {
    setUsers((prev) => [
      ...prev,
      {
        ...user,
        id: Date.now(),
      },
    ]);
  }

  function deleteUser(id) {
    setUsers((prev) =>
      prev.filter((user) => user.id !== id)
    );
  }

  function updateUser(userUpdated) {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === userUpdated.id ? userUpdated : user
      )
    );
  }

  return (
    <UserContext.Provider
      value={{
        users,
        addUser,
        deleteUser,
        updateUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUsers() {
  return useContext(UserContext);
}