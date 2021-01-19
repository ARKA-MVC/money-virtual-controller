import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { WalletContext } from "../contexts/WalletContext";
import axios from "axios";
import {
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@material-ui/core";
import TransactionList from "../components/List/TransactionList";

const date = new Date();
const firstDay = new Date(date.getFullYear(), date.getMonth(), 2)
  .toISOString()
  .split("T")[0];
const firstDayOfLastMonth = new Date(date.getFullYear(), date.getMonth() - 1, 2)
  .toISOString()
  .split("T")[0];
const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 1)
  .toISOString()
  .split("T")[0];
const lastDayOfLastMonth = new Date(date.getFullYear(), date.getMonth(), 1)
  .toISOString()
  .split("T")[0];

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: "48px",
  },
  paper: {
    height: "auto",
    width: "70%",
    maxWidth: "800px",
    minWidth: "600px",
    margin: "0 auto",
  },
  gridRadioGroup: {
    margin: theme.spacing(3),
  },
  radio: {
    "&$checked": {
      color: "#FC9600",
    },
  },
  checked: {},
  textField: {
    marginLeft: "10px",
    marginRight: "20px",
  },
}));

const Transactions = () => {
  const { currentWallet } = useContext(WalletContext);
  const [date, setDate] = useState({ from: firstDay, to: lastDay });
  const [selected, setSelected] = useState("ThisMonth");
  const classes = useStyles();
  const [listTrans, setListTrans] = useState([]);

  useEffect(() => {
    const timeRange = (() => {
      switch (selected) {
        case "ThisMonth":
          return { from: firstDay, to: lastDay };
        case "LastMonth":
          return { from: firstDayOfLastMonth, to: lastDayOfLastMonth };
        default:
          return { from: date.from, to: date.to };
      }
    })();
    getTransByTimeRange(timeRange);
    console.log(listTrans);
  }, [selected, currentWallet]);

  const getTransByTimeRange = (timeRange) => {
    axios
      .get(
        "/trans/getAllTransByTime",
        {
          params: {
            walletId: currentWallet,
            from: timeRange.from,
            to: timeRange.to,
          },
        },
        { withCredentials: true }
      )
      .then((results) => {
        setListTrans(results.data.results[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Grid container className={classes.root} spacing={2} justify="center">
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <Grid container>
            <Grid item className={classes.gridRadioGroup}>
              <FormLabel>Select time range:</FormLabel>
              <RadioGroup
                name="spacing"
                aria-label="spacing"
                value={selected}
                onChange={(e) => {
                  setSelected(e.target.value);
                }}
                row
              >
                <FormControlLabel
                  key="This-month"
                  value="ThisMonth"
                  control={
                    <Radio
                      classes={{
                        root: classes.radio,
                        checked: classes.checked,
                      }}
                    />
                  }
                  label="This month"
                />
                <FormControlLabel
                  key="Last-month"
                  value="LastMonth"
                  control={
                    <Radio
                      classes={{
                        root: classes.radio,
                        checked: classes.checked,
                      }}
                    />
                  }
                  label="Last month"
                />
                <FormControlLabel
                  key="Custom"
                  value="Custom"
                  control={
                    <Radio
                      classes={{
                        root: classes.radio,
                        checked: classes.checked,
                      }}
                    />
                  }
                  label="From/To"
                />
                {selected === "Custom" ? (
                  <>
                    <TextField
                      id="dateFrom"
                      className={classes.textField}
                      label="From"
                      type="date"
                      value={date.from}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={(e) => {
                        setDate(e.target.value);
                      }}
                      required
                    />
                    <TextField
                      id="dateTo"
                      label="To"
                      type="date"
                      value={date.to}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={(e) => {
                        setDate(e.target.value);
                      }}
                      required
                    />
                  </>
                ) : null}
              </RadioGroup>
            </Grid>
            <Grid item xs={12} style={{ padding: "10px" }}>
              <TransactionList listTransactions={listTrans}></TransactionList>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Transactions;
