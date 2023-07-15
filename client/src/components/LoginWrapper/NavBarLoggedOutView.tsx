import { Button, Stack } from "@mui/material";

type NavBarLoggedOutViewProps = {
  onSignUpClicked: () => void;
  onLoginClicked: () => void;
};

const NavBarLoggedOutView = ({
  onSignUpClicked,
  onLoginClicked,
}: NavBarLoggedOutViewProps) => {
  return (
    <Stack
      spacing={2}
      direction={{ xs: "column", sm: "row" }}
      alignItems={{ xs: "flex-start", sm: "center" }}
    >
      <Button color="inherit" onClick={onSignUpClicked}>
        Sign Up
      </Button>
      <Button color="inherit" onClick={onLoginClicked}>
        Log in
      </Button>
    </Stack>
  );
};

export { NavBarLoggedOutView };
