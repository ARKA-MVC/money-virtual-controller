import {
  Avatar,
  FormControl,
  InputLabel,
  ListSubheader,
  makeStyles,
  MenuItem,
  Select,
} from "@material-ui/core";
import deepOrange from "@material-ui/core/colors/orange";
import deepPurple from "@material-ui/core/colors/deepPurple";
import green from "@material-ui/core/colors/green";
import pink from "@material-ui/core/colors/pink";
import React from "react";
import { currencyFormat } from "../../utils/StringFormat.js"

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
    width: "300px"
  },
  middleDiv: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
  label: {
    backgroundColor: "#424242",
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
  green: {
    color: theme.palette.getContrastText(green[500]),
    backgroundColor: green[500],
  },
  pink: {
    color: theme.palette.getContrastText(pink[500]),
    backgroundColor: pink[500],
  },
}));

const TransactionSelect = (props) => {
  const allTransactions = props.listTransactions;
  console.log(allTransactions);
  const classes = useStyles();
  const handleSelectTransaction = (event) => {
    const targetVal = event.target.value;
    console.log(targetVal);
    props.setState(targetVal !== undefined ? targetVal : "");
  };
  const renderAvatar = (transactionId) => {
    switch (transactionId) {
      case 26:
        return (
          <Avatar
            alt="debtLoan-logo"
            style={props.compactSize ? { height: "19px", width: "19px" } : {}}
            className={classes.pink}
          >
            D
          </Avatar>
        );
      case 25:
        return (
          <Avatar
            alt="debtLoan-logo"
            style={props.compactSize ? { height: "19px", width: "19px" } : {}}
            className={classes.purple}
          >
            L
          </Avatar>
        );
      case 24:
        return (
          <Avatar
            alt="debtLoan-logo"
            style={props.compactSize ? { height: "19px", width: "19px" } : {}}
            className={classes.green}
          >
            R
          </Avatar>
        );
      case 23:
        return (
          <Avatar
            alt="debtLoan-logo"
            style={props.compactSize ? { height: "19px", width: "19px" } : {}}
            className={classes.orange}
          >
            DC
          </Avatar>
        );
      default:
        return null;
    }
  };
  const renderListTransactions = () => {
    let listTransactions = [];
    let itemTransaction;
    if (allTransactions.length > 0) {
      itemTransaction = allTransactions.map(
        (item, index) => {
          return (
            <MenuItem key={index} value={item.id}>
              <div className={classes.card}>
                <div>{renderAvatar(item.category_id)}</div>
                <div
                  className={
                    props.compactSize
                      ? classes.middleDivCompactSize
                      : classes.middleDiv
                  }
                >
                  <div className={classes.walletName}>{item.note}</div>
                  <div>T: {currencyFormat.format(item.amount)}</div>
                  <div>R: {currencyFormat.format(item.remaining)}</div>
                  <div>{item.transaction_time.toString().split("T")[0]}</div>
                </div>
              </div>
            </MenuItem>
          );
        }
      );
    } else {
      itemTransaction = (<ListSubheader key="lshd">You don't have any Debt/Loan</ListSubheader>);
    }
    listTransactions.push(itemTransaction);
    return listTransactions;
  };
  return (
    <FormControl
      className={classes.formInput}
      variant={props.variant || "standard"}
      disabled={props.disabled}
      required={props.required ? true : false}
      fullWidth
    >
      <InputLabel
        id="transaction-label"
        shrink={true}
        className={classes.label}
        htmlFor="grouped-transaction"
      >
        Transaction
      </InputLabel>
      <Select
        labelId="transaction-label"
        label="transaction"
        id="grouped-transaction"
        value={props.state}
        onChange={handleSelectTransaction}
        className={classes.formSelect}
        MenuProps={{
          getContentAnchorEl: null,
          width: "100%",
          PaperProps: {
            style: {
              maxHeight: 48 * 4.75,
              marginTop: "-5px",
            },
          },
        }}
      >
        {renderListTransactions()}
      </Select>
    </FormControl>
  );
};

export default TransactionSelect;
