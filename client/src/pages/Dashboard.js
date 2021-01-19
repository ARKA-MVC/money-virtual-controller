import React, { useContext } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import AddIcon from "@material-ui/icons/Add";
import {
  mainListItems,
  secondaryListItems,
  thirdListItems,
} from "../components/List/ListItems";
import { Button } from "@material-ui/core";
import CreateTransModal from "../components/Modal/CreateTransModal";
import { WalletContext } from "../contexts/WalletContext";
import { UserLogout } from "../utils/Auth";
import { UserContext } from "../contexts/UserContext";
import { Redirect, Route, Switch } from "react-router-dom";
import Wallets from "../layouts/Wallets";
import WalletSelect from "../components/Select/WalletSelect";
import Transactions from "../layouts/Transactions";
import Reports from "../layouts/Reports";

const drawerWidth = 220;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    background: "#424242",
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  const { currentWallet, setCurrentWallet } = useContext(WalletContext);
  const { user, setUser } = useContext(UserContext);
  const [open, setOpen] = React.useState(true);
  const [openModal, setOpenModal] = React.useState(false);
  // console.log(user);
  // console.log(wallets);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleModalAction = () => {
    setOpenModal(openModal ? false : true);
  };

  const handleLogOut = () => {
    setUser(null);
    UserLogout();
  };

  return (
    <div className={classes.root}>
      {user !== undefined ? (
        <>
          <CssBaseline />
          <AppBar
            position="absolute"
            className={clsx(classes.appBar, open && classes.appBarShift)}
          >
            <Toolbar className={classes.toolbar}>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                className={clsx(
                  classes.menuButton,
                  open && classes.menuButtonHidden
                )}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                component="h1"
                variant="h6"
                color="primary"
                noWrap
                className={classes.title}
              >
                Dashboard
              </Typography>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginRight: "20px",
                }}
              >
                <Typography
                  component="span"
                  variant="body1"
                  color="primary"
                  style={{ marginRight: "20px" }}
                >
                  Choose your wallet
                </Typography>
                <WalletSelect
                  state={currentWallet}
                  setState={setCurrentWallet}
                ></WalletSelect>
              </div>

              <Button
                variant="contained"
                color="primary"
                onClick={handleModalAction}
              >
                <AddIcon></AddIcon>
                Add Transaction
              </Button>
            </Toolbar>
          </AppBar>

          <Drawer
            variant="permanent"
            classes={{
              paper: clsx(
                classes.drawerPaper,
                !open && classes.drawerPaperClose
              ),
            }}
            open={open}
          >
            <div className={classes.toolbarIcon}>
              <IconButton onClick={handleDrawerClose}>
                <ChevronLeftIcon />
              </IconButton>
            </div>
            <Divider />
            <List>{mainListItems}</List>
            <Divider />
            <List
              style={{
                flexGrow: "1",
              }}
            >
              {secondaryListItems}
            </List>
            <List onClick={handleLogOut}>{thirdListItems}</List>
          </Drawer>
          <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Switch>
              <Route path="/my-wallets" component={Wallets}></Route>
              <Route path="/transactions" component={Transactions}></Route>
              <Route path="/reports" component={Reports}></Route>
            </Switch>
          </main>

          <CreateTransModal
            open={openModal}
            handleModalAction={handleModalAction}
          ></CreateTransModal>
        </>
      ) : (
        <Redirect to="/sign-in"></Redirect>
      )}
    </div>
  );
}
