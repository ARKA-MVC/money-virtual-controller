import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import DateRangeIcon from "@material-ui/icons/DateRange";
import {
  FilledInput,
  FormControl,
  FormLabel,
  InputAdornment,
  InputLabel,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
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

const CreateWalletForm = React.forwardRef((props, ref) => {
  const classes = useStyles();
  const [wallet, setWallet] = useState({
    type: "0",
    name: "",
    amount: "",
    startingAmount: "",
    goalAmount: "",
    endingDate: "",
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(wallet);
    props.handleCreateWallet(wallet);
  };

  const handleOnChange = (event) => {
    setWallet({ ...wallet, [event.target.name]: event.target.value });
  };

  return (
    <Container component="main" maxWidth="xs" style={{maxWidth: "687px"}}>
      <CssBaseline />
      <div className={props.classProps}>
        <Typography component="h1" variant="h5" className={classes.title}>
          Create a new wallet
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid item xs={12}>
            <FormControl
              component="fieldset"
              className={clsx(classes.radioGroup, classes.margin)}
            >
              <FormLabel component="span" className={classes.label}>
                Type:
              </FormLabel>
              <RadioGroup
                aria-label="walletType"
                name="type"
                row
                className={classes.radio}
                defaultValue={wallet.type}
                onChange={handleOnChange}
                value={wallet.type}
              >
                <FormControlLabel
                  value="0"
                  control={<Radio />}
                  label="Basic Wallet"
                />
                <FormControlLabel
                  value="1"
                  control={<Radio />}
                  label="Saving Wallet"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <FormControl fullWidth className={classes.margin} variant="filled">
            <InputLabel htmlFor="filled-adornment-name">Wallet Name</InputLabel>
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
          {wallet.type === "0" ? (
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
                <InputLabel htmlFor="filled-adornment-glBalance">
                  Ending Date:
                </InputLabel>
                <FilledInput
                  id="filled-adornment-glBalance"
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
            Create
          </Button>
        </form>
      </div>
    </Container>
  );
});
export default CreateWalletForm;
