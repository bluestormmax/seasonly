import {
  ReactNode,
  createContext,
  Dispatch,
  SetStateAction,
  useState,
  useContext,
} from "react";
import { UserModel } from "@/models/user";

interface UserContextModel {
  loggedInUser: UserModel | null;
  setLoggedInUser: Dispatch<SetStateAction<UserModel | null>>;
}

const defaultUserContext = {
  loggedInUser: {
    _id: "",
    username: "",
    email: "",
    state: "",
    zip: "",
    zone: {
      zone: "",
      coordinates: {
        lat: "",
        lon: "",
      },
      temperature_range: "",
    },
  },
  setLoggedInUser: () => {},
} as UserContextModel;

const UserContext = createContext(defaultUserContext);

type UserProviderProps = {
  value?: UserContextModel;
  children: ReactNode;
};

function UserProvider({ children }: UserProviderProps) {
  const [loggedInUser, setLoggedInUser] = useState<UserModel | null>(null);

  return (
    <UserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
      {children}
    </UserContext.Provider>
  );
}

function useLoggedInUser() {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("useLoggedInUser must be used within a UserProvider");
  }
  return context;
}

export { UserProvider, useLoggedInUser, UserContext };
