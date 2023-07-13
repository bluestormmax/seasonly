import { createTheme } from "@mui/material/styles";

const headingsFont = `"Slabo 27px", serif`;
const bodyFont = `"Lato", Arial, sans-serif`;

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
  typography: {
    h1: {
      fontFamily: headingsFont,
    },
    h2: {
      fontFamily: headingsFont,
    },
    h3: {
      fontFamily: headingsFont,
    },
    body1: {
      fontFamily: bodyFont,
    },
    body2: {
      fontFamily: bodyFont,
    },
    button: {
      fontFamily: bodyFont,
    },
  },
});

export default theme;
