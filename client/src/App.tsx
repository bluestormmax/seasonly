import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { User as UserModel } from "@models/user";
import * as UserApi from "@api/user.api";
import { SignUpDialog, LoginDialog, NavBar } from "./components";
import {
  ListsPageLoggedInView,
  ListsPageLoggedOutView,
} from "./pages/NotesPage";

function App() {
  const [loggedInUser, setLoggedInUser] = useState<UserModel | null>(null);
  const [showSignUpDialog, setShowSignUpDialog] = useState(false);
  const [showLoginDialog, setShowLoginDialog] = useState(false);

  useEffect(() => {
    async function fetchLoggedInUser() {
      try {
        const user = await UserApi.getLoggedInUser();
        setLoggedInUser(user);
      } catch (error) {
        console.log(error);
      }
    }
    fetchLoggedInUser();
  });

  return (
    <div className="app wrapper">
      <NavBar
        loggedInUser={loggedInUser}
        onLoginClicked={() => setShowLoginDialog(true)}
        onSignUpClicked={() => setShowSignUpDialog(true)}
        onLogOutSuccess={() => setLoggedInUser(null)}
      />
      <Box className="main" mt={2}>
        {loggedInUser ? <ListsPageLoggedInView /> : <ListsPageLoggedOutView />}
      </Box>

      {showSignUpDialog ? (
        <SignUpDialog
          onDismiss={() => setShowSignUpDialog(false)}
          onSignupSuccess={(user) => {
            setLoggedInUser(user);
            setShowSignUpDialog(false);
          }}
        />
      ) : null}
      {showLoginDialog ? (
        <LoginDialog
          onDismiss={() => setShowLoginDialog(false)}
          onLoginSuccess={(user) => {
            setLoggedInUser(user);
            setShowLoginDialog(false);
          }}
        />
      ) : null}
    </div>
  );
}

export default App;
