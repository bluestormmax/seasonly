import { AppBar, IconButton, Typography, Toolbar } from "@mui/material";
import { Menu } from "@mui/icons-material";
import { useLoggedInUser } from "@/context/userContext";
import { NavBarLoggedInView } from "./NavBarLoggedInView";
import { NavBarLoggedOutView } from "./NavBarLoggedOutView";

// Null if user not logged in, but we don't want an optional prop here
type NavBarProps = {
  onSignUpClicked: () => void;
  onLoginClicked: () => void;
  onLogOutSuccess: () => void;
  onMenuIconClicked: () => void;
};

const NavBar = ({
  onSignUpClicked,
  onLoginClicked,
  onLogOutSuccess,
  onMenuIconClicked,
}: NavBarProps) => {
  const { loggedInUser } = useLoggedInUser();

  console.log("LOGGED-NAV NAV: ", loggedInUser);

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={onMenuIconClicked}
        >
          <Menu />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Seasonly
        </Typography>
        {loggedInUser.username !== "" ? (
          <NavBarLoggedInView
            user={loggedInUser}
            onLogoutSuccess={onLogOutSuccess}
          />
        ) : (
          <NavBarLoggedOutView
            onLoginClicked={onLoginClicked}
            onSignUpClicked={onSignUpClicked}
          />
        )}
      </Toolbar>
    </AppBar>
  );
};

export { NavBar };
