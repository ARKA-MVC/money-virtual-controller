import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../contexts/UserContext";

export const WalletContext = React.createContext();

const WalletContextProvider = (props) => {
  const { user } = useContext(UserContext);
  const [wallets, setWallets] = useState({
    daily: [],
    saving: [],
  });
  const [currentWallet, setCurrentWallet] = useState("all");

  const reloadWallets = () => {
    getAllWallets();
  };

  const getAllWallets = () => {
    axios
      .get("/wallet/common/getall", { withCredentials: true })
      .then((res) => {
        const dailyWallets = res.data.data[0][0];
        const savingWallets = res.data.data[1][0];
        setWallets({ daily: dailyWallets, saving: savingWallets });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    if (user === null || user === undefined) return;

    getAllWallets();
  }, [user]);

  return (
    <WalletContext.Provider
      value={{ wallets, reloadWallets, currentWallet, setCurrentWallet }}
    >
      {props.children}
    </WalletContext.Provider>
  );
};

export default WalletContextProvider;
