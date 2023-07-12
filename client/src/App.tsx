import { useState, useEffect } from "react";
import * as UserApi from "@api/user.api";
import { Box } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useLoggedInUser } from "./context/userContext";
import { SignUpDialog, LoginDialog, NavBar, OffCanvasMenu } from "./components";
import { ListsPage, InSeasonPage, NotFoundPage } from "./pages";

function App() {
  const { loggedInUser, setLoggedInUser, defaultUser } = useLoggedInUser();
  const [showSignUpDialog, setShowSignUpDialog] = useState(false);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [showOffCanvasMenu, setShowOffCanvasMenu] = useState(false);

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
  }, []);

  return (
    <BrowserRouter>
      <div className="app">
        <NavBar
          onLoginClicked={() => setShowLoginDialog(true)}
          onSignUpClicked={() => setShowSignUpDialog(true)}
          onLogOutSuccess={() => setLoggedInUser(defaultUser)}
          onMenuIconClicked={() => setShowOffCanvasMenu(true)}
        />
        <OffCanvasMenu
          open={showOffCanvasMenu}
          onCloseIconClicked={() => setShowOffCanvasMenu(false)}
          onLinkClicked={() => setShowOffCanvasMenu(false)}
        />
        <Box className="main" p={4}>
          <Routes>
            <Route
              path="/"
              element={<InSeasonPage loggedInUser={loggedInUser} />}
            />
            <Route
              path="/shopping-lists"
              element={<ListsPage loggedInUser={loggedInUser} />}
            />
            <Route path="/*" element={<NotFoundPage />} />
          </Routes>
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
    </BrowserRouter>
  );
}

export default App;
