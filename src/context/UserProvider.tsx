import { useState } from "react";
import type { ReactNode } from "react";
import { users } from "../data/users";
import type { User } from "../data/users";
import { UserContext } from "./UserContext";

type UserProviderProps = {
  children: ReactNode;
};

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (username: string): boolean => {
    const found = users.find((u) => u.username === username);
    if (found) {
      setUser({ ...found });
      return true;
    }
    return false;
  };

  const logout = () => setUser(null);
  const saveFavorite = (mealId: string) => {
    if (!user) return;
    if (!user.favorites.includes(mealId)) {
      setUser({ ...user, favorites: [...user.favorites, mealId] });
    }
  };

  const removeFavorite = (mealId: string) => {
    if (!user) return;
    setUser({
      ...user,
      favorites: user.favorites.filter((id) => id !== mealId),
    });
  };

  const setFavoriteCategory = (category: string) => {
    if (!user) return;
    setUser({ ...user, favoriteCategory: category });
  };

  return (
    <UserContext.Provider
      value={{
        user,
        login,
        logout,
        saveFavorite,
        removeFavorite,
        setFavoriteCategory,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
