import { ThemeProvider } from "@material-ui/core";
import React, { useContext } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { UserContext, UserContextProvider } from "./contexts/UserContext";
import WalletContextProvider from "./contexts/WalletContext";
import "./index.css";
import Wallets from "./layouts/Wallets";
import Dashboard from "./pages/Dashboard";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import theme from "./theme/theme";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <UserContextProvider>
        <WalletContextProvider>
          <BrowserRouter>
            <Switch>
              <Route path="/sign-in" component={SignIn} exact></Route>
              <Route path="/sign-up" component={SignUp} exact></Route>
              <Route path="/" component={Dashboard}></Route>
            </Switch>
          </BrowserRouter>
        </WalletContextProvider>
      </UserContextProvider>
    </ThemeProvider>
  );
};

export default App;
