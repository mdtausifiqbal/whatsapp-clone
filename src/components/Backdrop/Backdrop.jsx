import * as React from "react";
import Loading from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import { useDispatch, useSelector } from "react-redux";
import { showLoading, loadingState } from "@components/basicUISlice";

export default function Backdrop() {
  const { open, isCancelable } = useSelector(loadingState);
  const dispatch = useDispatch();
  const handleClose = () => {
    if (isCancelable) {
      dispatch(showLoading(false));
    }
  };

  return (
    <Loading
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
      onClick={handleClose}
    >
      <CircularProgress color="inherit" />
    </Loading>
  );
}
