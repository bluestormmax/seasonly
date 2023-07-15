import { createTheme } from "@mui/material/styles";

const headingsFont = `"Slabo 27px", serif`;
const bodyFont = `"Lato", Arial, sans-serif`;
const colors = {
  primary: "#00796b",
  secondary: "#ff5722",
  error: "#d32f2f",
  success: "#1e88e5",
  info: "#76ff03",
  white: "#ffffff",
  darkGray: "#36474F",
  irishGreen: "#376E66",
  avoGreen: "#769053",
};

const theme = createTheme({
  palette: {
    primary: {
      main: colors.primary,
    },
    secondary: {
      main: colors.secondary,
    },
    error: {
      main: colors.error,
    },
    success: {
      main: colors.success,
    },
    info: {
      main: colors.info,
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
    MuiAppBar: {
      styleOverrides: {
        root: {
          flexDirection: "row",
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          width: "100%",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: colors.white,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: colors.irishGreen,
          color: colors.white,
          boxShadow: "none",
          "&:hover": {
            backgroundColor: colors.avoGreen,
            boxShadow: "none",
          },
          "&:focus": {
            backgroundColor: colors.avoGreen,
            outlineColor: colors.secondary,
            boxShadow: "none",
          },
        },
        text: {
          backgroundColor: "transparent",
          color: colors.white,
          ".MuiAlert-message > &": {
            backgroundColor: "transparent",
            color: colors.darkGray,
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: colors.avoGreen,
            color: colors.white,
          },
          "&:focus": {
            backgroundColor: colors.avoGreen,
            outlineColor: colors.secondary,
            color: colors.white,
          },
        },
      },
    },
    MuiImageListItemBar: {
      styleOverrides: {
        root: {
          background: "rgba(54, 71, 79, 0.8)", // colors.darkGray
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
          "&.logo": {
            color: colors.white,
            paddingLeft: "8px",
          },
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontSize: "1.3rem",
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          color: colors.white,
          backgroundColor: colors.avoGreen,
        },
      },
    },
  },
});

export default theme;
