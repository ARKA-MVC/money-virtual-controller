import {
  Avatar,
  FormControl,
  InputLabel,
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
  middleDivCompactSize: {
    display: "flex",
    justifyContent: "space-between",
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
                    style={
                      props.compactSize ? { height: "19px", width: "19px" } : {}
                    }
                    src={
                      type === "daily"
                        ? "https://st4.depositphotos.com/6809168/27246/v/950/depositphotos_272464266-stock-illustration-coin-with-wings-fly-dollar.jpg"
                        : "https://png.pngtree.com/png-clipart/20190515/original/pngtree-save-money-in-a-purse.-illustration-in-vectors-png-image_3545275.jpg"
                    }
                  ></Avatar>
                </div>

                <div
                  className={
                    props.compactSize
                      ? classes.middleDivCompactSize
                      : classes.middleDiv
                  }
                >
                  <div className={classes.walletName}>{wallet.name}</div>
                  {type === "saving" ? (
                    <div>{currencyFormat.format(wallet.starting_amount)}</div>
                  ) : (
                    <div>{currencyFormat.format(wallet.balance)}</div>
                  )}
                </div>
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
    <FormControl
      className={classes.formInput}
      fullWidth={props.fullWidth}
      variant={props.variant || "standard"}
      required={props.required ? true : false}
    >
      {props.withLabel ? (
        <InputLabel id="wallet-label">Wallet</InputLabel>
      ) : null}
      <Select
        labelId="wallet-label"
        label="Wallet"
        fullWidth
        value={props.state}
        onChange={handleSelectWallet}
        MenuProps={{
          getContentAnchorEl: null,
          PaperProps: {
            style: {
              maxHeight: 48 * 7.5,
              marginTop: "-5px"
            },
          }
        }}
      >
        {!props.noAll ? <MenuItem value={"all"}>All Wallets</MenuItem> : null}
        {renderListWallets()}
      </Select>
    </FormControl>
  );
};

export default WalletSelect;
