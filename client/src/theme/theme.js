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
