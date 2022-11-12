import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function InputDialog({ config, open }) {
  const [input, setInput] = useState("");
  /* config = {
    id: "Dialog Id",
    title: "Dialog Title",
    message: "Dialog message",
    onClose: function() {}
    textfield: {
      id: "name",
      placeholder: "Email Address",
      type: "email"
    },
    positive: {
      label: "Cancel",
      callback: function () {}
    },
    negative: {
      label: "Start Chat",
      callback: function() {}
    }
  }*/
  return (
    <div>
      <Dialog open={open} onClose={config.onClose}>
        <DialogTitle>{config.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{config.message}</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id={config.textfield.id}
            label={config.textfield.placeholder}
            type={config.textfield.type}
            fullWidth
            variant="standard"
            value={input}
            onChange={(event) => {
              setInput(event.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={config.negative.callback}>
            {config.negative.label}
          </Button>
          <Button onClick={() => config.positive.callback(input)}>
            {config.positive.label}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
