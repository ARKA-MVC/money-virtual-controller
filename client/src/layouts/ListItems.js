import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import BarChartIcon from "@material-ui/icons/BarChart";
import LayersIcon from "@material-ui/icons/Layers";
import AssignmentIcon from "@material-ui/icons/Assignment";
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import { Link } from "react-router-dom";

export const mainListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <MonetizationOnIcon />
      </ListItemIcon>
      <ListItemText primary="Transaction" />
    </ListItem>
    <ListItem button component={Link} to={"/my-wallets"}>
      <ListItemIcon>
        <AccountBalanceWalletIcon />
      </ListItemIcon>
      <ListItemText primary="Wallets" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Report" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Budget" />
    </ListItem>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Saved reports</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last month" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItem>
  </div>
);

export const thirdListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <PowerSettingsNewIcon />
      </ListItemIcon>
      <ListItemText primary="Log out" />
    </ListItem>
  </div>
);
