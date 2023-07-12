import { Button, Typography } from "@mui/material";
import { useLoggedInUser } from "@/context/userContext";
import * as UserApi from "@api/user.api";

type NavBarLoggedInViewProps = {
  onLogoutSuccess: () => void;
};

const NavBarLoggedInView = ({ onLogoutSuccess }: NavBarLoggedInViewProps) => {
  const { loggedInUser } = useLoggedInUser();

  async function logout() {
    try {
      await UserApi.logout();
      onLogoutSuccess();
    } catch (error) {
      console.log(error);
      alert(error); // TODO: dev only
    }
  }

  return (
    <>
      <Typography
        variant="body1"
        component="div"
        sx={{ fontSize: "0.8rem", mr: 2 }}
      >
        Logged in as: {loggedInUser?.username}
      </Typography>
      <Button color="inherit" onClick={logout}>
        Log out
      </Button>
    </>
  );
};

export { NavBarLoggedInView };
