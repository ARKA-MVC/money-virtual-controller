import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import WalletSelect from "../Select/WalletSelect";
import CategorySelect from "../Select/CategorySelect";
import { TextField } from "@material-ui/core";
import { WalletContext } from "../../contexts/WalletContext";
import TransactionSelect from "../Select/TransactionSelect";

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  gridRow: {
    marginTop: "15px",
    marginBottom: "15px",
  },
}));

const CreateTransForm = React.forwardRef((props, ref) => {
  const classes = useStyles();
  const [walletType, setWalletType] = useState("");
  const [walletId, setWalletId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [note, setNote] = useState("");
  const [toTransaction, setToTransaction] = useState("");
  const [categoryList, setCategoryList] = useState({
    income: [],
    expense: [],
    debtLoan: [],
  });
  const [transList, setTransList] = useState([]);
  const [concatString, setConcatString] = useState("");
  const { reloadWallets } = useContext(WalletContext);

  const handleWalletSelected = (concatString) => {
    setConcatString(concatString);
    setWalletType(concatString.charAt(0));
    setWalletId(concatString.substring(1));
  };

  useEffect(() => {
    const getCategoriesByWalletType = () => {
      if (walletType === "d") {
        getCategoriesDaily();
      } else {
        getCategoriesSaving();
      }
    };
    if (walletType !== "") {
      getCategoriesByWalletType();
    }
  }, [walletType]);

  useEffect(() => {
    if (categoryId === "DC-23" || categoryId === "R-24") {
      getToTransactions();
    }
    setToTransaction("");
  }, [categoryId]);

  const getCategoriesDaily = () => {
    axios
      .get("/category/getall")
      .then((res) => {
        const income = [];
        const expense = [];
        const debtLoan = [];
        console.log(res);
        res.data.data.forEach((category) => {
          if (category.type === "Pay") {
            expense.push(category);
          } else if (category.type === "Collect") {
            income.push(category);
          } else {
            if (category.type !== "Transfer") {
              debtLoan.push(category);
            }
          }
        });
        setCategoryList({
          income: income,
          expense: expense,
          debtLoan: debtLoan,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getCategoriesSaving = () => {
    axios
      .get("/category/getsaving")
      .then((res) => {
        const income = [];
        const expense = [];
        console.log(res);
        res.data.data.forEach((category) => {
          if (category.type === "Pay") {
            expense.push(category);
          } else if (category.type === "Collect") {
            income.push(category);
          }
        });
        setCategoryList({
          income: income,
          expense: expense,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getToTransactions = () => {
    axios
      .get("/trans/getToTransactions", {
        params: { categoryId: categoryId, walletId: walletId },
      })
      .then((res) => {
        console.log(res.data.results);
        setTransList(res.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const transaction = {
      walletType: walletType,
      walletId: walletId,
      note: note,
      amount: amount,
      categoryId: categoryId.toString().split("-")[1],
      categoryType: categoryId.toString().split("-")[0],
      toTransaction: toTransaction,
      transactionTime: date,
    };
    console.log(transaction);
    axios
      .post("/trans/create", transaction)
      .then((res) => {
        console.log(res);
        reloadWallets();
        props.handleModalAction();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={props.paper}>
        <Typography component="h1" variant="h5" style={{ marginTop: "10px" }}>
          Add Transaction
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2} className={classes.gridRow}>
            <Grid item xs={5}>
              <WalletSelect
                variant="outlined"
                noAll
                setState={handleWalletSelected}
                state={concatString}
                fullWidth={true}
                withLabel={true}
                compactSize
                required
              ></WalletSelect>
            </Grid>
            <Grid item xs={4}>
              <CategorySelect
                variant="outlined"
                listCategories={categoryList}
                state={categoryId}
                setState={setCategoryId}
                disabled={walletId === "" ? true : false}
                required
              ></CategorySelect>
            </Grid>
            <Grid item xs={3}>
              <TextField
                type="number"
                label="Amount"
                InputLabelProps={{ shrink: true }}
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                }}
                variant="outlined"
                disabled={walletId === "" ? true : false}
                placeholder="0"
                required
                fullWidth
              ></TextField>
            </Grid>
          </Grid>
          {categoryId === "DC-23" || categoryId === "R-24" ? (
            <Grid container spacing={2} className={classes.gridRow}>
              <Grid item xs={12}>
                <TransactionSelect
                  variant="outlined"
                  listTransactions={transList}
                  state={toTransaction}
                  setState={setToTransaction}
                  fullWidth
                  required
                ></TransactionSelect>
              </Grid>
            </Grid>
          ) : null}
          <Grid container spacing={2} className={classes.gridRow}>
            <Grid item xs={4}>
              <TextField
                type="date"
                label="Date"
                InputLabelProps={{ shrink: true }}
                value={date}
                onChange={(e) => {
                  setDate(e.target.value);
                }}
                variant="outlined"
                disabled={walletId === "" ? true : false}
                required
                fullWidth
              ></TextField>
            </Grid>
            <Grid item xs={8}>
              <TextField
                type="text"
                label="Note"
                InputLabelProps={{ shrink: true }}
                value={note}
                onChange={(e) => {
                  setNote(e.target.value);
                }}
                variant="outlined"
                disabled={walletId === "" ? true : false}
                fullWidth
              ></TextField>
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submit}
            fullWidth
            style={{
              marginBottom: "2px",
            }}
            size="large"
          >
            Add
          </Button>
        </form>
      </div>
    </Container>
  );
});
export default CreateTransForm;
