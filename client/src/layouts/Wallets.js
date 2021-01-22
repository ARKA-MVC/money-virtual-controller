import {
  Button,
  Container,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React, { useContext, useState, useEffect } from "react";
import WrapContentModal from "../components/Modal/WrapContentModal";
import { WalletContext } from "../contexts/WalletContext";
import axios from "axios";
import WalletCard from "../components/Card/WalletCard";
import EditWalletModal from "../components/Modal/EditWalletModal";
import { StringToDate } from "../utils/Time";

const walletName = {
  daily: "Basic Wallet",
  saving: "Saving Wallet",
};

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: "48px",
  },
  walletType: {
    marginBottom: theme.spacing(1),
  },
  walletList: {
    marginBottom: theme.spacing(2),
    width: "100%",
  },
}));
const Wallets = (props) => {
  const classes = useStyles();
  const { wallets, reloadWallets } = useContext(WalletContext);
  const [openModal, setOpenModal] = React.useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState("");
  const handleModalAction = () => {
    setOpenModal(!openModal);
  };
  const handleUpdateModalAction = () => {
    setOpenUpdateModal(!openUpdateModal);
  };
  useEffect(() => {
    if (selectedWallet !== "") {
      handleUpdateModalAction();
    }
  }, [selectedWallet]);
  const handleCreateWallet = (wallet) => {
    axios
      .post("/wallet/common/create", wallet, { withCredentials: true })
      .then((res) => {
        console.log(res);
        setOpenModal(!openModal);
        reloadWallets();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleUpdateWallet = (wallet) => {
    const path = `/wallet/${wallet.type}/update`;
    axios
      .post(path, wallet, { withCredentials: true })
      .then((res) => {
        console.log(res);
        handleUpdateModalAction();
        reloadWallets();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleSelectedWallet = (event) => {
    console.log(event.target);
    console.log(event.target.getAttribute("data-wallet"));
    const wallet = JSON.parse(event.target.getAttribute("data-wallet"));
    console.log(wallet);
    setSelectedWallet(wallet);
    // handleUpdateModalAction();
  };
  const renderListWallets = () => {
    let listWallets = [];
    for (const wallet in wallets) {
      const type = wallet;
      if (wallets[wallet].length > 0) {
        const itemWallet = (
          <div className={classes.walletList} key={wallet}>
            <Typography
              component="p"
              variant="h5"
              className={classes.walletType}
            >
              {walletName[wallet]}
            </Typography>
            {wallets[wallet].map((wallet, index) => {
              return (
                <WalletCard
                  key={wallet.id}
                  id={wallet.id}
                  type={type}
                  name={wallet.name}
                  amount={wallet.balance}
                  startingAmount={wallet.starting_amount}
                  goalAmount={wallet.goal_amount}
                  endingDate={wallet.ending_date}
                  size="lg"
                  onClick={handleSelectedWallet}
                  wallet={{
                    type: type,
                    name: wallet.name,
                    amount: wallet.balance,
                    startingAmount: wallet.starting_amount,
                    goalAmount: wallet.goal_amount,
                    endingDate: StringToDate(wallet.ending_date),
                    id: wallet.id,
                  }}
                ></WalletCard>
              );
            })}
          </div>
        );
        listWallets.push(itemWallet);
      }
    }
    return listWallets;
  };
  return (
    <Container component="main" maxWidth="sm" className={classes.container}>
      <Grid container spacing={2}>
        {renderListWallets()}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleModalAction}
        >
          Create New Wallet
        </Button>
      </Grid>
      <WrapContentModal
        open={openModal}
        handleModalAction={handleModalAction}
        handleCreateWallet={handleCreateWallet}
      ></WrapContentModal>
      <EditWalletModal
        open={openUpdateModal}
        handleModalAction={handleUpdateModalAction}
        wallet={selectedWallet}
        handleUpdateWallet={handleUpdateWallet}
      ></EditWalletModal>
    </Container>
  );
};

export default Wallets;
