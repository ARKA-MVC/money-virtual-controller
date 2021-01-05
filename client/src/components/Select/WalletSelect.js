import {
  Avatar,
  FormControl,
  makeStyles,
  MenuItem,
  Select,
} from "@material-ui/core";
import React, { useContext } from "react";
import { WalletContext } from "../../contexts/WalletContext";
import { currencyFormat } from "../../utils/StringFormat";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: "48px",
  },
  walletType: {
    marginBottom: theme.spacing(1),
  },
  walletList: {
    width: "100%",
  },
  card: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
  },
  walletName: {
    color: "#ff9600",
  },
  middleDiv: {
    flexGrow: "1",
    marginLeft: "15px",
    marginBottom: "0px",
  },
  lastDiv: {
    justifyItems: "end",
  },
  formInput: {
    minWidth: "180px",
  },
}));

const WalletSelect = (props) => {
  const { wallets } = useContext(WalletContext);
  const classes = useStyles();
  const handleSelectWallet = (event) => {
    console.log(event.target.value);
    props.setState(event.target.value);
  };
  console.log(props.state);
  console.log(typeof props.state);
  const renderListWallets = () => {
    let listWallets = [];
    for (const wallet in wallets) {
      const type = wallet;
      if (wallets[wallet].length > 0) {
        const itemWallet = wallets[wallet].map((wallet, index) => {
          return (
            <MenuItem
              key={index}
              value={`${type.toString().charAt(0)}${wallet.id}`}
            >
              <div
                className={classes.card}
                data-id={wallet.id}
                data-type={type}
              >
                <div>
                  <Avatar
                    alt="daily-logo"
                    src={
                      type === "daily"
                        ? "https://st4.depositphotos.com/6809168/27246/v/950/depositphotos_272464266-stock-illustration-coin-with-wings-fly-dollar.jpg"
                        : "https://png.pngtree.com/png-clipart/20190515/original/pngtree-save-money-in-a-purse.-illustration-in-vectors-png-image_3545275.jpg"
                    }
                  ></Avatar>
                </div>
                {type === "saving" ? (
                  <div className={classes.middleDiv}>
                    <div className={classes.walletName}>{wallet.name}</div>
                    <div>{currencyFormat.format(wallet.starting_amount)}</div>
                  </div>
                ) : (
                  <>
                    <div className={classes.middleDiv}>
                      <div className={classes.walletName}>{wallet.name}</div>
                      <div>{currencyFormat.format(wallet.balance)}</div>
                    </div>
                  </>
                )}
              </div>
            </MenuItem>
          );
        });
        // </div>
        listWallets.push(itemWallet);
      }
    }
    return listWallets;
  };
  return (
    <FormControl className={classes.formInput}>
      <Select
        autoWidth={true}
        value={props.state}
        onChange={handleSelectWallet}
      >
        <MenuItem value={"all"}>All Wallets</MenuItem>
        {renderListWallets()}
      </Select>
    </FormControl>
  );
};

export default WalletSelect;
