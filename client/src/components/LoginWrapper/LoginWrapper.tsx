import { Box } from "@mui/material";
import { useLoggedInUser } from "@/context/userContext";
import { NavBarLoggedInView } from "../LoginWrapper/NavBarLoggedInView";
import { NavBarLoggedOutView } from "./NavBarLoggedOutView";
import styles from "./LoginWrapper.module.css";

type LoginWrapperProps = {
  onSignUpClicked: () => void;
  onLoginClicked: () => void;
  onLogOutSuccess: () => void;
};

const LoginWrapper = ({
  onSignUpClicked,
  onLoginClicked,
  onLogOutSuccess,
}: LoginWrapperProps) => {
  const { loggedInUser } = useLoggedInUser();

  return (
    <Box className={styles.login_wrapper}>
      {loggedInUser?.username !== "" ? (
        <NavBarLoggedInView onLogoutSuccess={onLogOutSuccess} />
      ) : (
        <NavBarLoggedOutView
          onLoginClicked={onLoginClicked}
          onSignUpClicked={onSignUpClicked}
        />
      )}
    </Box>
  );
};

export { LoginWrapper };
