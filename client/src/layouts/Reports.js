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
  Typography,
} from "@material-ui/core";
import { Doughnut } from "react-chartjs-2";
import { currencyFormat } from "../utils/StringFormat";

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
  typo: {
    margin: "20px 0px",
  },
}));

const Reports = () => {
  const { currentWallet } = useContext(WalletContext);
  const [date, setDate] = useState({ from: firstDay, to: lastDay });
  const [selected, setSelected] = useState("ThisMonth");
  const classes = useStyles();
  const [other, setOther] = useState({
    debt: 0,
    debtCol: 0,
    repayment: 0,
    loan: 0,
    totalInc: 0,
    totalExp: 0,
  });

  const [income, setIncome] = useState("");
  const [expense, setExpense] = useState("");

  //TODO:
  // 1. finish chart
  // 2. all trans  proc doesn't have by time
  // 3. check debt collection proc by Long

  useEffect(() => {
    const incummPie = {
      labels: [],
      datasets: [
        {
          label: "Income",
          data: [],
          backgroundColor: [],
          borderWidth: 1,
          borderAlign: "inner",
          borderColor: "#424242",
        },
      ],
    };
    const expensePie = {
      labels: [],
      datasets: [
        {
          label: "Expense",
          data: [],
          backgroundColor: [],
          borderWidth: 1,
          borderAlign: "inner",
          borderColor: "#424242",
        },
      ],
    };
    const getSumCategoryByTimeRange = (timeRange) => {
      console.log(currentWallet.charAt(0));
      const path = (() => {
        if (currentWallet === "all") {
          return "/wallet/common/getSumAll";
        } else if (currentWallet.charAt(0) === "d") {
          return "/wallet/daily/getSum";
        } else if (currentWallet.charAt(0) === "s") {
          return "/wallet/saving/getSum";
        }
      })();
      axios
        .post(
          path,
          {
            walletId: currentWallet,
            from: timeRange.from,
            to: timeRange.to,
          },
          { withCredentials: true }
        )
        .then((results) => {
          console.log(results.data.results[0]);
          sumFilter(results.data.results[0]);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    const sumFilter = (listSum) => {
      let debt = 0,
        debtCol = 0,
        repayment = 0,
        loan = 0,
        totalInc = 0,
        totalExp = 0;
      listSum.forEach((sum) => {
        if (sum.type === "Collect") {
          incummPie.labels.push(sum.name);
          incummPie.datasets[0].data.push(parseInt(sum.Sum));
          incummPie.datasets[0].backgroundColor.push(sum.icon);
          totalInc += parseInt(sum.Sum);
        } else if (sum.type === "Pay") {
          expensePie.labels.push(sum.name);
          expensePie.datasets[0].data.push(parseInt(sum.Sum));
          expensePie.datasets[0].backgroundColor.push(sum.icon);
          totalExp += parseInt(sum.Sum);
        } else if (sum.type === "Debt Collection") {
          debtCol += parseInt(sum.Sum);
        } else if (sum.type === "Debt") {
          debt += parseInt(sum.Sum);
        } else if (sum.type === "Repayment") {
          repayment += parseInt(sum.Sum);
        } else if (sum.type === "Loan") {
          loan += parseInt(sum.Sum);
        }
      });
      setIncome(incummPie);
      setExpense(expensePie);
      setOther({
        totalInc: totalInc,
        totalExp: totalExp,
        debt: debt,
        debtCol: debtCol,
        repayment: repayment,
        loan: loan,
      });
    };
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
    getSumCategoryByTimeRange(timeRange);
  }, [selected, currentWallet, date]);

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
                        setDate({ ...date, from: e.target.value });
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
                        setDate({ ...date, to: e.target.value });
                      }}
                      required
                    />
                  </>
                ) : null}
              </RadioGroup>
            </Grid>
            {income !== "" && expense !== "" ? (
              <Grid container>
                <Grid item xs={6} align="center">
                  <Doughnut
                    data={income}
                    options={{
                      legend: {
                        fontColor: "#fff",
                        labels: {
                          fontColor: "white",
                        },
                        display: false,
                      },
                      title: {
                        display: true,
                        text: "Income",
                        fontColor: "#fff",
                        fontSize: 15,
                      },
                    }}
                  />
                  <Typography
                    variant="h5"
                    component="p"
                    className={classes.typo}
                  >
                    <span style={{ color: "#03a9f4" }}>Total Income: </span>
                    {currencyFormat.format(other.totalInc)}
                  </Typography>
                </Grid>
                <Grid item xs={6} align="center">
                  <Doughnut
                    data={expense}
                    options={{
                      legend: {
                        fontColor: "#fff",
                        labels: {
                          fontColor: "white",
                        },
                        display: false,
                      },
                      title: {
                        display: true,
                        text: "Expense",
                        fontColor: "#fff",
                        fontSize: 15,
                      },
                    }}
                  />
                  <Typography
                    variant="h5"
                    component="p"
                    className={classes.typo}
                  >
                    <span style={{ color: "#f50057" }}>Total Expense: </span>
                    {currencyFormat.format(other.totalExp)}
                  </Typography>
                </Grid>
              </Grid>
            ) : null}
            {currentWallet.charAt(0) === "s" ? null : (
              <Grid item xs={12} align="center">
                <table style={{ marginTop: "20px" }}>
                  <tbody>
                    <tr>
                      <td>
                        <Typography
                          variant="h6"
                          component="p"
                          className={classes.typo}
                          style={{ color: "#03a9f4" }}
                        >
                          Total Debt:
                        </Typography>
                      </td>
                      <td>
                        <Typography
                          variant="h6"
                          component="p"
                          className={classes.typo}
                        >
                          {currencyFormat.format(other.debt)}
                        </Typography>
                      </td>
                      <td style={{ width: "10px" }}></td>
                      <td>
                        <Typography
                          variant="h6"
                          component="p"
                          className={classes.typo}
                          color="primary"
                        >
                          Remaining:
                        </Typography>
                      </td>
                      <td>
                        <Typography
                          variant="h6"
                          component="p"
                          className={classes.typo}
                        >
                          {currencyFormat.format(other.debt - other.repayment)}
                        </Typography>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Typography
                          variant="h6"
                          component="p"
                          style={{ color: "#f50057" }}
                        >
                          Total Loan:
                        </Typography>
                      </td>
                      <td>
                        <Typography variant="h6" component="p">
                          {currencyFormat.format(other.loan)}
                        </Typography>
                      </td>
                      <td style={{ width: "10px" }}></td>
                      <td>
                        <Typography variant="h6" component="p" color="primary">
                          Remaining:
                        </Typography>
                      </td>
                      <td>
                        <Typography variant="h6" component="p">
                          {currencyFormat.format(other.loan - other.debtCol)}
                        </Typography>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Grid>
            )}
          </Grid>
          <div style={{ height: "30px" }}></div>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Reports;
