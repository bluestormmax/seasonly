import {
  ReactNode,
  createContext,
  useState,
  useContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
} from "react";
import * as UserApi from "@api/user.api";
import { UserModel } from "@models/user";

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

  useEffect(() => {
    async function getAuthedUser() {
      try {
        const authedUser = await UserApi.getLoggedInUser();
        setLoggedInUser(authedUser);
      } catch (error) {
        console.error(error);
      }
    }
    getAuthedUser();
  }, []);

  // Make the provider only update when these values change.
  const memoedUserValues = useMemo(
    () => ({
      loggedInUser,
      setLoggedInUser,
      defaultUser,
    }),
    [loggedInUser, setLoggedInUser, defaultUser]
  );

  return (
    <UserContext.Provider value={memoedUserValues}>
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
