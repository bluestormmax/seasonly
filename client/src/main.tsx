import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { UserProvider } from "./context/userContext.tsx";
import App from "./App.tsx";
import "./global.css";

const theme = createTheme({
  palette: {
    primary: {
      main: "#00796b",
    },
    secondary: {
      main: "#ff5722",
    },
    error: {
      main: "#d32f2f",
    },
    success: {
      main: "#1e88e5",
    },
    info: {
      main: "#76ff03",
    },
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <UserProvider>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </UserProvider>
  </React.StrictMode>
);
