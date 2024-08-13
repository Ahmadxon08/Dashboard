import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
// import { useApiContext } from "../../context/Context";
import { useTranslation } from "react-i18next";
import useStore from "../../store/useStore";
``;

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const Delete = () => {
  const { t } = useTranslation();
  // const { openDel, handleDeleteClose } = useApiContext();
  const { handleDeleteClose, openDel } = useStore((state) => ({
    openDel: state.openDel,
    handleDeleteClose: state.handleDeleteClose,
  }));

  return (
    <>
      <Dialog
        open={openDel}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleDeleteClose}
        aria-describedby="alert-dialog-slide-description">
        <DialogTitle
          style={{
            fontSize: "20px",
            fontWeight: "bold",
            fontFamily: "Roboto",
          }}>
          {t("dialog.deleteTitle")}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-slide-description"
            style={{
              fontSize: "16px",
              fontWeight: "bold",
              marginBottom: "20px",
              fontFamily: "Roboto",
            }}>
            {t("dialog.deleteMessage")}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleDeleteClose}
            style={{
              backgroundColor: "#837777",
              color: "#fff",
              marginLeft: "10px",
              fontFamily: "Roboto",
            }}>
            {t("dialog.cancel")}
          </Button>
          <Button
            onClick={handleDeleteClose}
            style={{
              backgroundColor: "#ff0000",
              color: "#fff",
              fontFamily: "Roboto",
              marginLeft: "10px",
            }}>
            {t("dialog.delete")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Delete;
