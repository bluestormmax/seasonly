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
  setLoggedInUser: Dispatch<SetStateAction<UserModel>>;
}

const UserContext = createContext<UserContextModel | null>(null);

type UserProviderProps = {
  children: ReactNode;
};

function UserProvider({ children }: UserProviderProps) {
  const [loggedInUser, setLoggedInUser] = useState<UserModel>({
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
  });
  //   () => ({
  //     loggedInUser: {
  //       _id: "",
  //       username: "",
  //       email: "",
  //       state: "",
  //       zip: "",
  //       zone: {
  //         zone: "",
  //         coordinates: {
  //           lat: "",
  //           lon: "",
  //         },
  //         temperature_range: "",
  //       },
  //     },
  //     setLoggedInUser,
  //   }),
  //   [loggedInUser]
  // );

  return (
    <UserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
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

export { UserProvider, useLoggedInUser, UserContext };
