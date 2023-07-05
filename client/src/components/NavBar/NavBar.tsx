import { AppBar, IconButton, Typography, Toolbar } from "@mui/material";
import { Menu } from "@mui/icons-material";
import { User } from "@models/user";
import { NavBarLoggedInView } from "./NavBarLoggedInView";
import { NavBarLoggedOutView } from "./NavBarLoggedOutView";

// Null if user not logged in, but we don't want an optional prop here
type NavBarProps = {
  loggedInUser: User | null;
  onSignUpClicked: () => void;
  onLoginClicked: () => void;
  onLogOutSuccess: () => void;
  onMenuIconClicked: () => void;
};

const NavBar = ({
  loggedInUser,
  onSignUpClicked,
  onLoginClicked,
  onLogOutSuccess,
  onMenuIconClicked,
}: NavBarProps) => {
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
        {loggedInUser ? (
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
