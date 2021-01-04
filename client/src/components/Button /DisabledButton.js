import { Button, withStyles } from "@material-ui/core";
import React from "react";

const StyledButton = withStyles({
  root: {
    width: "100%",
    marginTop: "20px",
    borderWidth: "2px",
    paddingTop: "15px",
    paddingBottom: "15px",
    borderColor: "#FF9600",
    textTransform: "none",
    textAlign: "left",
  },
  label: {
    justifyContent: "initial"
  }
})(Button);

function DisabledButton(props) {
  return (
    <StyledButton color="primary" variant="outlined">
      {props.content}
    </StyledButton>
  );
}

export default DisabledButton;
