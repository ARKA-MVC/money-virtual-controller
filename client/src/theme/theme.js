import { createMuiTheme } from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#ff9600",
    },
    secondary: {
      main: "#fff",
    },
  },
  typography: {
    fontFamily: [
      'Quicksand',
      'Montserrat',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  overrides: {
    MuiOutlinedInput: {
      input: {
        "&:-webkit-autofill": {
          WebkitBoxShadow: "0 0 0 1000px #303030 inset",
        },
      },
    },
    MuiFilledInput: {
      input: {
        "&:-webkit-autofill": {
          WebkitBoxShadow: "0 0 0 1000px #535353 inset",
        },
      },
    },
  },
});

export default theme;
