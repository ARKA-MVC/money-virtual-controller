import React from "react";
import { Avatar, Card, CardContent, makeStyles } from "@material-ui/core";
import { DateDiffDaysFromToday } from "../../utils/Time";
import { currencyFormat } from "../../utils/StringFormat";

const useStyles = makeStyles((theme) => ({
  card: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
  },
  walletName: {
    color: "#ff9600",
  },
  middleDiv: {
    flexGrow: "1",
  },
  lastDiv: {
    justifyItems: "end",
    textAlign: "right"
  },
}));
const WalletCard = (props) => {
  const classes = useStyles();
  return (
    <Card className={classes.card} data-id={props.id} data-type={props.type}>
      <CardContent>
        <Avatar
          alt="daily-logo"
          src={
            props.type === "daily"
              ? "https://st4.depositphotos.com/6809168/27246/v/950/depositphotos_272464266-stock-illustration-coin-with-wings-fly-dollar.jpg"
              : "https://png.pngtree.com/png-clipart/20190515/original/pngtree-save-money-in-a-purse.-illustration-in-vectors-png-image_3545275.jpg"
          }
        ></Avatar>
      </CardContent>
      {props.type === "saving" ? (
        <>
          <CardContent className={classes.middleDiv}>
            <div className={classes.walletName}>{props.name}</div>
            <div style={{ display: "flex" }}>
              <div style={{ width: "50%" }}>
                Current: {currencyFormat.format(props.startingAmount)}
              </div>
              <div>Goal: {currencyFormat.format(props.goalAmount)}</div>
            </div>
          </CardContent>
          {props.size === "lg" ? (
            <CardContent className={classes.lastDiv}>
              <div>{props.endingDate.split("T")[0]}</div>
              <div>
                {DateDiffDaysFromToday(props.endingDate) > 0
                  ? DateDiffDaysFromToday(props.endingDate) + " days to go"
                  : "Ended"}
              </div>
            </CardContent>
          ) : null}
        </>
      ) : (
        <>
          <CardContent>
            <div className={classes.walletName}>{props.name}</div>
            <div>{currencyFormat.format(props.amount)}</div>
          </CardContent>
        </>
      )}
    </Card>
  );
};

export default WalletCard;
