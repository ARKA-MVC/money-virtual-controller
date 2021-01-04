import { makeStyles, Modal } from "@material-ui/core";
import React from "react";
import CreateWalletForm from "../Form/CreateWalletForm";

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
}));

const WrapContentModal = (props) => {
  const classes = useStyles();
  return (
    <>
      <Modal
        open={props.open}
        onClose={props.handleModalAction}
        className={classes.modal}
      >
        <CreateWalletForm
          classProps={classes.paper}
          handleCreateWallet={props.handleCreateWallet}
        ></CreateWalletForm>
      </Modal>
    </>
  );
};

export default WrapContentModal;
