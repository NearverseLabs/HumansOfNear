import { createTheme } from "@mui/material/styles";
import colors from "assets/scss/_themes-vars.module.scss";

const theme = createTheme({
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "unset",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        contained: {
          backgroundColor: colors.main,
          color: colors.white,
          "&:hover": {
            backgroundColor: colors.btn_hover, // Change this to your desired hover color
          },
        },
        containedSecondary: {
          backgroundColor: colors.white,
          color: colors.main,
          "&:hover": {
            backgroundColor: colors.btn_hover2, // Change this to your desired hover color
          },
        },
        root: {
          padding: "10px 22px",
          borderRadius: 6,
          color: colors.white,
          backgroundColor: "unset",
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: colors.white,
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          margin: 0,
          padding: 16,
          backgroundColor: colors.dialog_bg,
          opacity: 0.8,
          borderRadius: 12,
          border: "1px solid #FFF",
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          backgroundColor: colors.main,
          borderRadius: 12,
          border: "1px solid #FFF",
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          fontSize: 20,
          padding: 0,
          fontWeight: 900,
        },
      },
    },
    MuiDialogContentText: {
      styleOverrides: {
        root: {
          fontSize: 16,
          textAlign: "left",
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        h6: {
          fontSize: 15,
        },
        body1: {
          fontSize: 16,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          border: "1px solid #FFF",
          fontSize: 13,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          padding: "10px 15px",
          fontSize: 16,
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        icon: {
          fontSize: 25,
          alignItems: "center",
        },
      },
    },
    MuiCircularProgress: {
      styleOverrides: {
        root: {
          color: colors.white,
        },
      },
    },
  },
  palette: {
    common: {
      black: "#22272B",
      white: colors.main,
    },
    primary: {
      light: "#22272B",
      main: colors.main,
      dark: "#22272B",
    },
    secondary: {
      light: "#22272B",
      main: colors.main,
      dark: "#22272B",
    },
    text: {
      primary: colors.white,
      secondary: colors.white,
    },
    background: {
      default: colors.main,
    },
    action: {
      disabledBackground: "#d7d7d7",
      disabled: "gray",
      disabledOpacity: 0.7,
    },
    error: {
      light: "#54577A",
      main: "#ff6f1a",
      dark: "#54577A",
    },
    warning: {
      light: "#54577A",
      main: "#F3F3F3",
      dark: "#54577A",
    },
    success: {
      light: "rgb(102, 187, 106)",
      200: "#54577A",
      main: "rgb(102, 187, 106)",
      dark: "#54577A",
    },
    grey: {
      50: "#E6E6E6",
      100: "#B3B3B3",
      500: "#F5F1F1",
      600: "#595959",
      700: "#808080",
      900: "#54577A",
    },
  },
  typography: {
    fontFamily: "Poppins",
    fontSize: 15,
    fontWeightMedium: 400,
    button: {
      textTransform: "none",
      textAlign: "center",
      fontStyle: "normal",
      lineHeight: "normal",
      border: "1px solid #FFF",
    },
  },
});

export default theme;
