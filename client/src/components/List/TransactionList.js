import {
  ListSubheader,
  makeStyles,
  Avatar,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
} from "@material-ui/core";
import deepOrange from "@material-ui/core/colors/orange";
import deepPurple from "@material-ui/core/colors/deepPurple";
import green from "@material-ui/core/colors/green";
import pink from "@material-ui/core/colors/pink";
import red from "@material-ui/core/colors/red";
import blue from "@material-ui/core/colors/blue";
import yellow from "@material-ui/core/colors/yellow";
import indigo from "@material-ui/core/colors/indigo";
import React from "react";
import { currencyFormat } from "../../utils/StringFormat.js";

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
    width: "300px",
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
  red: {
    color: theme.palette.getContrastText(red[500]),
    backgroundColor: red[500],
  },
  blue: {
    color: theme.palette.getContrastText(blue[500]),
    backgroundColor: blue[500],
  },
  yellow: {
    color: theme.palette.getContrastText(yellow[500]),
    backgroundColor: yellow[500],
  },
  indigo: {
    color: theme.palette.getContrastText(indigo[500]),
    backgroundColor: indigo[500],
  },
}));

const TransactionList = (props) => {
  const allTransactions = props.listTransactions;
  const classes = useStyles();
  const renderAvatar = (type) => {
    switch (type) {
      case "Debt":
        return (
          <Avatar
            alt="debtLoan-logo"
            style={props.compactSize ? { height: "19px", width: "19px" } : {}}
            className={classes.pink}
          >
            D
          </Avatar>
        );
      case "Loan":
        return (
          <Avatar
            alt="debtLoan-logo"
            style={props.compactSize ? { height: "19px", width: "19px" } : {}}
            className={classes.purple}
          >
            L
          </Avatar>
        );
      case "Repayment":
        return (
          <Avatar
            alt="debtLoan-logo"
            style={props.compactSize ? { height: "19px", width: "19px" } : {}}
            className={classes.green}
          >
            R
          </Avatar>
        );
      case "Debt Collection":
        return (
          <Avatar
            alt="debtLoan-logo"
            style={props.compactSize ? { height: "19px", width: "19px" } : {}}
            className={classes.orange}
          >
            DC
          </Avatar>
        );
      case "Collect":
        return (
          <Avatar
            alt="debtLoan-logo"
            style={props.compactSize ? { height: "19px", width: "19px" } : {}}
            className={classes.indigo}
          >
            C
          </Avatar>
        );
      case "Pay":
        return (
          <Avatar
            alt="debtLoan-logo"
            style={props.compactSize ? { height: "19px", width: "19px" } : {}}
            className={classes.yellow}
          >
            P
          </Avatar>
        );
      default:
        return null;
    }
  };
  const renderListTransactions = () => {
    let listTransactions = [];
    let itemTransaction;
    itemTransaction = allTransactions.map((item, index) => {
      return (
        <TableRow key={item.id} value={item.id}>
          <TableCell component="th" scope="row">
            {renderAvatar(item.type)}
          </TableCell>
          <TableCell align="left">{item.note}</TableCell>
          <TableCell align="left">{item.type}</TableCell>
          <TableCell align="right">
            {currencyFormat.format(item.amount)}
          </TableCell>
          <TableCell align="right">
            {item.remaining !== null
              ? currencyFormat.format(item.remaining)
              : null}
          </TableCell>
          <TableCell align="right">
            {item.transaction_time.toString().split("T")[0]}
          </TableCell>
        </TableRow>
      );
    });

    listTransactions.push(itemTransaction);
    return listTransactions;
  };
  const renderTableTransactions = () => {
    return (
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell align="left">Note</TableCell>
              <TableCell align="left">Category</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell align="right">Remaining</TableCell>
              <TableCell align="right">Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{renderListTransactions()}</TableBody>
        </Table>
      </TableContainer>
    );
  };
  const renderNoTransaction = () => {
    return (
      <ListSubheader key="lshd">
        Sorry, you don't have any transactions
      </ListSubheader>
    );
  };
  return (
    <>
      {allTransactions.length > 0
        ? renderTableTransactions()
        : renderNoTransaction()}
    </>
  );
};

export default TransactionList;
