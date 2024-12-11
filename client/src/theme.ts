import { createTheme } from '@mui/material/styles';

const headingsFont = `"Slabo 27px", serif`;
const bodyFont = `"Lato", Arial, sans-serif`;
export const customColors = {
  primary: '#00796b',
  secondary: '#ff5722',
  error: '#d32f2f',
  success: '#1e88e5',
  info: '#76ff03',
  white: '#ffffff',
  darkGray: '#36474F',
  irishGreen: '#376E66',
  avoGreen: '#769053',
  eggplant: '#712A8D',
};

const theme = createTheme({
  palette: {
    primary: {
      main: customColors.primary,
    },
    secondary: {
      main: customColors.secondary,
    },
    error: {
      main: customColors.error,
    },
    success: {
      main: customColors.success,
    },
    info: {
      main: customColors.info,
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
          flexDirection: 'row',
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          width: '100%',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: customColors.white,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: customColors.irishGreen,
          color: customColors.white,
          boxShadow: 'none',
          '&:hover': {
            backgroundColor: customColors.avoGreen,
            boxShadow: 'none',
          },
          '&:focus': {
            backgroundColor: customColors.avoGreen,
            outlineColor: customColors.secondary,
            boxShadow: 'none',
          },
        },
        text: {
          backgroundColor: 'transparent',
          color: customColors.white,
          '.MuiAlert-message > &': {
            backgroundColor: 'transparent',
            color: customColors.darkGray,
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: customColors.avoGreen,
            color: customColors.white,
          },
          '&:focus': {
            backgroundColor: customColors.avoGreen,
            outlineColor: customColors.secondary,
            color: customColors.white,
          },
        },
      },
    },
    MuiImageListItemBar: {
      styleOverrides: {
        root: {
          background: 'rgba(54, 71, 79, 0.8)', // customColors.darkGray
        },
      },
    },
    MuiFormGroup: {
      styleOverrides: {
        root: {
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 50%)',
          gridTemplateRows: 'auto',
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          '&.fancy_text': {
            fontFamily: headingsFont,
          },
          '&.logo': {
            color: customColors.white,
            paddingLeft: '8px',
          },
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontSize: '1.3rem',
          '&.MuiInputLabel-shrink': {
            fontSize: '1rem',
          },
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          color: customColors.white,
          backgroundColor: customColors.avoGreen,
        },
      },
    },
  },
});

export default theme;
