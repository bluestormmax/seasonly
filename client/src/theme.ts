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
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: "#ffffff",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: "#376E66",
          color: "#ffffff",
          "&:hover": {
            backgroundColor: "#769053",
          },
          "&:focus": {
            backgroundColor: "#769053",
            outlineColor: "#ff5722",
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          "&:focus": {
            backgroundColor: "#769053",
            outlineColor: "#ff5722",
          },
        },
      },
    },
    MuiImageListItemBar: {
      styleOverrides: {
        root: {
          background: "rgba(54, 71, 79, 0.8)",
        },
      },
    },
    MuiFormGroup: {
      styleOverrides: {
        root: {
          display: "grid",
          gridTemplateColumns: "repeat(2, 50%)",
          gridTemplateRows: "auto",
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          "&.fancy_text": {
            fontFamily: headingsFont,
          },
        },
      },
    },
  },
});

export default theme;
