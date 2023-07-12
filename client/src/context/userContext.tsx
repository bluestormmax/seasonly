import {
  ReactNode,
  createContext,
  useState,
  useContext,
  Dispatch,
  SetStateAction,
} from "react";
import { UserModel } from "@/models/user";

interface UserContextModel {
  loggedInUser: UserModel | null;
  defaultUser: UserModel;
  setLoggedInUser: Dispatch<SetStateAction<UserModel>>;
}

const UserContext = createContext<UserContextModel | null>(null);

type UserProviderProps = {
  children: ReactNode;
};

const defaultUser: UserModel = {
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
};

function UserProvider({ children }: UserProviderProps) {
  const [loggedInUser, setLoggedInUser] = useState<UserModel>(defaultUser);

  return (
    <UserContext.Provider
      value={{ loggedInUser, setLoggedInUser, defaultUser }}
    >
      {children}
    </UserContext.Provider>
  );
}

function useLoggedInUser() {
  const context = useContext(UserContext);

  if (context === null) {
    throw new Error("useLoggedInUser must be used within a UserProvider");
  }
  return context;
}

export { UserProvider, useLoggedInUser, UserContext, defaultUser };
