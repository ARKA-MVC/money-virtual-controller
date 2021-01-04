import React, { useContext, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import DisabledButton from "../components/Button /DisabledButton";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SignInSchema } from "../schema/Auth";
import axios from "axios";
import { useHistory } from "react-router-dom";
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
  errors: {
    color: "#ff9600",
    marginLeft: "14px",
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const history = useHistory();
  const { setUser } = useContext(UserContext);
  const [otherErr, setOtherErr] = useState("");
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(SignInSchema),
  });
  const onSubmit = (data) => {
    delete data.cpassword;
    delete data.license;
    axios
      .post("/auth/login", data)
      .then((res) => {
        setUser(res.data.results)
        if (res.status === 200) {
          history.push("/");
        }
      })
      .catch((err) => {
        const message = err.response.data.message;
        if (message === "Auth Failed") {
          setOtherErr("Username or password is incorrect");
        }
        console.log(err.response.data.message);
      });
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        {otherErr !== "" ? (
          <DisabledButton content={otherErr}></DisabledButton>
        ) : null}
        <form
          className={classes.form}
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          onFocus={() => {
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
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container justify="flex-end">
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/sign-up" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
