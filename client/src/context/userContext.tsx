import {
  ReactNode,
  createContext,
  useState,
  useContext,
  useMemo,
  Dispatch,
  SetStateAction,
} from "react";
import { UserModel } from "@/models/user";

interface UserContextModel {
  loggedInUser: UserModel;
  setLoggedInUser: Dispatch<SetStateAction<UserContextModel>>;
}

const UserContext = createContext<UserContextModel | null>(null);

type UserProviderProps = {
  children: ReactNode;
};

function UserProvider({ children }: UserProviderProps) {
  const [loggedInUser, setLoggedInUser] = useState<UserContextModel>({
    loggedInUser: {} as UserModel,
    setLoggedInUser: () => {},
  });

  const memoizedValue = useMemo<UserContextModel>(
    () => ({
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
      setLoggedInUser,
    }),
    [loggedInUser]
  );

  return (
    <UserContext.Provider value={memoizedValue}>
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
