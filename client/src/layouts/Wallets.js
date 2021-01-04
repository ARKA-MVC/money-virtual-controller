import { Button } from "@material-ui/core";
import React, { useContext } from "react";
import CreateWalletForm from "../components/Form/CreateWalletForm";
import WrapContentModal from "../components/Modal/WrapContentModal";
import { WalletContext } from "../contexts/WalletContext";
import axios from "axios";

const Wallets = (props) => {
  const { wallets, addWallets } = useContext(WalletContext);
  const [openModal, setOpenModal] = React.useState(false);
  const handleModalAction = () => {
    setOpenModal(!openModal);
  };
  const handleCreateWallet = (wallet) => {
    axios
      .post("/wallet/common/create", wallet, { withCredentials: true })
      .then((res) => {
        setOpenModal(!openModal);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <Button variant="contained" color="primary" onClick={handleModalAction}>
        Create New Wallet
      </Button>
      <WrapContentModal
        open={openModal}
        handleModalAction={handleModalAction}
        handleCreateWallet={handleCreateWallet}
      ></WrapContentModal>
    </>
  );
};

export default Wallets;
