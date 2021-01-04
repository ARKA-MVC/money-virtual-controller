import Axios from "axios";
import React, { useEffect, useState } from "react";
import axios from 'axios';

export const WalletContext = React.createContext();

const WalletContextProvider = (props) => {
  const [wallets, setWallets] = useState([]);
  const addWallet = (wallet) => {
    setWallets([...wallets, wallet]);
  };
  const removeWallet = (id) => {
    setWallets(wallets.filter((wallet) => wallet.id !== id));
  };

  const getAllWallets = () => {
    console.log("asdasd")
  };
  useEffect(() => {
    getAllWallets();
  }, []);

  return (
    <WalletContext.Provider value={{ wallets, addWallet, removeWallet }}>
      {props.children}
    </WalletContext.Provider>
  );
};

export default WalletContextProvider;
