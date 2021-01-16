import { makeStyles, Modal } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import CreateTransForm from "../Form/CreateTransForm";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    minWidth: "800px",
  },
}));

const CreateTransModal = (props) => {
  const classes = useStyles();
  const [transaction, setTransaction] = useState({
    note: "",
    amount: "",
    categoryId: "",
    toTransaction: "",
    walletId: "",
    transType: "Income",
    date: "",
  });
  const [category, setCategory] = useState({
    income: [],
    expense: [],
    debtLoan: [],
  });

  useEffect(() => {
    if (!props.open) return;
    axios
      .get("/category/getall")
      .then((res) => {
        const income = [];
        const expense = [];
        const debtLoan = [];
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
        setCategory({ income: income, expense: expense, debtLoan: debtLoan });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.open]);
  return (
    <>
      <Modal
        open={props.open}
        onClose={props.handleModalAction}
        className={classes.modal}
      >
        <CreateTransForm
          category={category}
          paper={classes.paper}
          transaction={transaction}
          setTransaction={setTransaction}
          handleModalAction={props.handleModalAction}
        ></CreateTransForm>
      </Modal>
    </>
  );
};

export default CreateTransModal;
