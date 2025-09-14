import { createContext } from "react";
import type { User } from "../data/users";

type UserContextType = {
  user: User | null;
  login: (username: string) => boolean;
  logout: () => void;
  saveFavorite: (mealId: string) => void;
  removeFavorite: (mealId: string) => void;
  setFavoriteCategory: (category: string) => void;
};

export const UserContext = createContext<UserContextType | undefined>(undefined);
