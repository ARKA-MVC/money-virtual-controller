import {
  Button,
  Container,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React, { useContext } from "react";
import WrapContentModal from "../components/Modal/WrapContentModal";
import { WalletContext } from "../contexts/WalletContext";
import axios from "axios";
import WalletCard from "../components/Card/WalletCard";

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
  const handleModalAction = () => {
    setOpenModal(!openModal);
  };
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
    </Container>
  );
};

export default Wallets;
