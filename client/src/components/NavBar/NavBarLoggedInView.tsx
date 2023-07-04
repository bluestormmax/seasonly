import { Button, Typography } from "@mui/material";
import { User } from "@models/user";
import * as UserApi from "@api/user.api";

type NavBarLoggedInViewProps = {
  user: User;
  onLogoutSuccess: () => void;
};

const NavBarLoggedInView = ({
  user,
  onLogoutSuccess,
}: NavBarLoggedInViewProps) => {
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
      <Typography variant="body1" component="div">
        Logged in as: {user.username}
      </Typography>
      <Button color="inherit" onClick={logout}>
        Log out
      </Button>
    </>
  );
};

export { NavBarLoggedInView };
