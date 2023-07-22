import React from "react";
import {
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

import { useDispatch, useSelector } from "store";
import { showDialog } from "store/reducers/auth";

const DialogData: any = {
  signin: {
    title: "Put yourself on the Map of NEAR Humans!",
    content: (
      <>
        * Pin the icon anywhere on the map and save. <br />
        * You may edit the location anytime. <br />
        * Let other humans notice you: add your &nbsp;&nbsp;Twitter & Near Social Usernames
        in the profile &nbsp;&nbsp;section. <br />
        * No! The government will not come knocking &nbsp;&nbsp;on your door.
      </>
    ),
    button: false,
    link: false,
  },
  failed: {
    title: "505: Human not found!",
    content: `Looks like you haven't signed up for I Am Human. Use the wallet that you used for IAM Human Verification, or use the following link to verify your personhood:`,
    button: "I-AM-Human Verification",
    link: "https://i-am-human.app/?community=rocketbois&vertical=nft",
  },
};

const DialogWrapper = () => {
  const { dialog } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLink = () => {
    window.open(DialogData[dialog].link, "_blank");
  };

  const handleClose = () => {
    dispatch(showDialog(""));
  };

  if (!dialog) return <></>;
  return (
    <Dialog
      open={true}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{
        "& .MuiPaper-root": {
          width: 464,
          textAlign: "center",
        },
      }}
    >
      <DialogActions sx={{ padding: 0 }}>
        <IconButton onClick={handleClose} sx={{ padding: 0 }}>
          <HighlightOffIcon />
        </IconButton>
      </DialogActions>
      <DialogTitle id="alert-dialog-title" textAlign="center">
        {DialogData[dialog].title}
      </DialogTitle>
      <DialogContent sx={{ mt: 2.5, p: "0 31px", mb: "31px" }}>
        <DialogContentText id="alert-dialog-description">
          {DialogData[dialog].content}
        </DialogContentText>
      </DialogContent>
      {DialogData[dialog].button && (
        <DialogActions
          sx={{ padding: 0, mb: "31px", justifyContent: "center" }}
        >
          <Button
            variant="contained"
            color="secondary"
            onClick={handleLink}
            sx={{ padding: "10px 24px", fontSize: 16 }}
          >
            {DialogData[dialog].button}
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
};
export default DialogWrapper;
