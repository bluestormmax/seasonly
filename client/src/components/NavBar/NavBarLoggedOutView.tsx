import { Button } from "@mui/material";

type NavBarLoggedOutViewProps = {
  onSignUpClicked: () => void;
  onLoginClicked: () => void;
};

const NavBarLoggedOutView = ({
  onSignUpClicked,
  onLoginClicked,
}: NavBarLoggedOutViewProps) => {
  return (
    <>
      <Button color="inherit" onClick={onSignUpClicked}>
        Sign Up
      </Button>
      <Button color="inherit" onClick={onLoginClicked}>
        Log in
      </Button>
    </>
  );
};

export { NavBarLoggedOutView };
