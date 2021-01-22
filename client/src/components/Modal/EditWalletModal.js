import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import DateRangeIcon from "@material-ui/icons/DateRange";
import {
  FilledInput,
  FormControl,
  InputAdornment,
  InputLabel,
  Modal,
} from "@material-ui/core";

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
    padding: theme.spacing(4, 4, 3),
    minWidth: "500px",
  },
  title: {
    marginBottom: theme.spacing(2),
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  radioGroup: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    "& $label": {
      flexGrow: "1",
      marginLeft: "14px",
    },
    "& $radio": {
      flexGrow: "2",
      justifyContent: "space-evenly",
    },
  },
  label: {},
  radio: {},
  margin: {
    margin: theme.spacing(1, 0, 2),
  },
}));

const EditWalletModal = (props, ref) => {
  const classes = useStyles();
  const [wallet, setWallet] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(wallet);
    props.handleUpdateWallet(wallet);
  };

  const handleOnChange = (event) => {
    setWallet({ ...wallet, [event.target.name]: event.target.value });
  };
  useEffect(() => {
    setWallet(props.wallet);
  }, [props.wallet]);

  return (
    <Modal
      open={props.open}
      onClose={props.handleModalAction}
      className={classes.modal}
    >
      <Container component="main" maxWidth="xs" style={{ maxWidth: "687px", outline: "0" }}>
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5" className={classes.title}>
            Edit a wallet
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <FormControl fullWidth className={classes.margin} variant="filled">
              <InputLabel htmlFor="filled-adornment-name">
                Wallet Name
              </InputLabel>
              <FilledInput
                id="filled-adornment-name"
                required
                name="name"
                onChange={handleOnChange}
                value={wallet.name}
                startAdornment={
                  <InputAdornment position="start">Abc</InputAdornment>
                }
              />
            </FormControl>
            {wallet.type === "daily" ? (
              <>
                <FormControl
                  fullWidth
                  className={classes.margin}
                  variant="filled"
                >
                  <InputLabel htmlFor="filled-adornment-amount">
                    Amount
                  </InputLabel>
                  <FilledInput
                    id="filled-adornment-amount"
                    name="amount"
                    onChange={handleOnChange}
                    value={wallet.amount}
                    type="number"
                    inputProps={{ min: "500", step: "500" }}
                    required
                    startAdornment={
                      <InputAdornment position="start">$</InputAdornment>
                    }
                  />
                </FormControl>
              </>
            ) : (
              <>
                <FormControl
                  fullWidth
                  className={classes.margin}
                  variant="filled"
                >
                  <InputLabel htmlFor="filled-adornment-stBalance">
                    Starting Balance
                  </InputLabel>
                  <FilledInput
                    id="filled-adornment-stBalance"
                    type="number"
                    name="startingAmount"
                    onChange={handleOnChange}
                    value={wallet.startingAmount}
                    inputProps={{ min: "500", step: "500" }}
                    required
                    startAdornment={
                      <InputAdornment position="start">$</InputAdornment>
                    }
                  />
                </FormControl>
                <FormControl
                  fullWidth
                  className={classes.margin}
                  variant="filled"
                >
                  <InputLabel htmlFor="filled-adornment-glBalance">
                    Goal Balance
                  </InputLabel>
                  <FilledInput
                    id="filled-adornment-glBalance"
                    type="number"
                    min="500"
                    step="500"
                    required
                    name="goalAmount"
                    onChange={handleOnChange}
                    value={wallet.goalAmount}
                    startAdornment={
                      <InputAdornment position="start">$</InputAdornment>
                    }
                  />
                </FormControl>
                <FormControl
                  fullWidth
                  className={classes.margin}
                  variant="filled"
                >
                  <InputLabel htmlFor="filled-adornment-eDate">
                    Ending Date:
                  </InputLabel>
                  <FilledInput
                    id="filled-adornment-eDate"
                    type="date"
                    required
                    name="endingDate"
                    onChange={handleOnChange}
                    value={wallet.endingDate}
                    startAdornment={
                      <InputAdornment position="start">
                        <DateRangeIcon></DateRangeIcon>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Update
            </Button>
          </form>
        </div>
      </Container>
    </Modal>
  );
};
export default EditWalletModal;
