import React, { useContext, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { FormControl, FormLabel, Radio, RadioGroup } from "@material-ui/core";
import DisabledButton from "../components/Button /DisabledButton";
import { RegisterSchema } from "../schema/Auth";
import { UserContext } from "../contexts/UserContext";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://github.com/ARKA-MVC">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  input: {
    "&:-webkit-autofill": {
      WebkitBoxShadow: "0 0 0 1000px #303030 inset",
    },
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
  errors: {
    color: "#ff9600",
    marginLeft: "14px",
  },
  label: {},
  radio: {},
  otherErrors: {
    width: "100%",
    marginTop: "20px",
    borderWidth: "2px",
    paddingTop: "15px",
    paddingBottom: "15px",
    borderColor: "#FF9600",
    textTransform: "none",
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const history = useHistory();
  const [emailExisted, setEmailExisted] = useState(false);
  const [usernameExisted, setUsernameExisted] = useState(false);
  const { setUser } = useContext(UserContext);
  const [otherErr, setOtherErr] = useState("");
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(RegisterSchema),
  });

  const onSubmit = (data) => {
    console.log(data);
    delete data.cpassword;
    delete data.license;
    console.log(JSON.stringify(data));
    axios
      .post("/auth/create", data)
      .then((res) => {
        setUser(res.data.results);
        if (res.status === 200) {
          history.push("/");
        }
      })
      .catch((err) => {
        const message = err.response.data.message;
        if (message === "Email Used") {
          setEmailExisted(true);
        } else if (message === "Username Used") {
          setUsernameExisted(true);
        } else {
          setOtherErr(message);
        }
        console.log(err.response.data.message);
      });
  };

  return (
    <Container component="main" maxWidth="xs" style={{ maxWidth: "506px" }}>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        {otherErr !== "" ? (
          <DisabledButton content={otherErr}></DisabledButton>
        ) : null}
        <form
          className={classes.form}
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          onFocus={() => {
            setEmailExisted(false);
            setUsernameExisted(false);
            setOtherErr("");
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="fname"
                name="username"
                variant="outlined"
                fullWidth
                id="firstName"
                label="Username"
                autoFocus
                inputRef={register}
              />
              {errors.username && (
                <p className={classes.errors}>{errors.username.message}</p>
              )}
              {usernameExisted ? (
                <p className={classes.errors}>This username has been used</p>
              ) : null}
            </Grid>
            <Grid item xs={12}>
              <FormControl component="fieldset" className={classes.radioGroup}>
                <FormLabel component="span" className={classes.label}>
                  Gender:
                </FormLabel>
                <RadioGroup
                  aria-label="gender"
                  name="gender"
                  row
                  className={classes.radio}
                  defaultValue="0"
                >
                  <FormControlLabel
                    value="0"
                    control={<Radio inputRef={register} />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="1"
                    control={<Radio inputRef={register} />}
                    label="Male"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                inputRef={register}
              />
              {errors.email && (
                <p className={classes.errors}>{errors.email.message}</p>
              )}
              {emailExisted ? (
                <p className={classes.errors}>This email has been used</p>
              ) : null}
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                inputRef={register}
              />
              {errors.password && (
                <p className={classes.errors}>{errors.password.message}</p>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="cpassword"
                label="Confirm Password"
                type="password"
                id="cpassword"
                autoComplete="current-password"
                inputRef={register}
              />
              {errors.cpassword && (
                <p className={classes.errors}>{errors.cpassword.message}</p>
              )}
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                    name="license"
                    value="checked"
                    inputRef={register}
                  />
                }
                label="I have read and accept the terms and conditions."
              />
              {errors.license && (
                <p className={classes.errors}>{errors.license.message}</p>
              )}
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/sign-in" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
