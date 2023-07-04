import { SignUpDialog, LoginDialog, NavBar } from "./components";

function App() {
  return (
    <div className="app wrapper">
      <NavBar
        loggedInUser={null}
        onLoginClicked={() => {}}
        onSignUpClicked={() => {}}
        onLogOutSuccess={() => {}}
      />

      {false && (
        <SignUpDialog onDismiss={() => {}} onSignupSuccess={() => {}} />
      )}
      {true && <LoginDialog onDismiss={() => {}} onLoginSuccess={() => {}} />}
    </div>
  );
}

export default App;
