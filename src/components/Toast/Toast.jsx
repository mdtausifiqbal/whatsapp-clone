import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useDispatch, useSelector } from "react-redux";
import { toastState, closeToast } from "@components/basicUISlice";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Toast() {
  const toast = useSelector(toastState);
  const dispatch = useDispatch();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(closeToast());
  };

  return (
    <Snackbar open={toast.open} autoHideDuration={2000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={toast.type} sx={{ width: "100%" }}>
        {toast.message}
      </Alert>
    </Snackbar>
  );
}
