import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useStore from "../../store/useStore";

const Profile = () => {
  const { t } = useTranslation();

  ///////////// getting info about Profile/////
  const navigate = useNavigate();
  const { show, handleClose } = useStore((state) => ({
    show: state.show,
    handleClose: state.handleClose,
  }));
  const isLoggedOut = JSON.parse(localStorage.getItem("user"));

  ///////////////Log out from Profile/////
  const handleLogOut = () => {
    localStorage.removeItem("user");
    navigate("/login");
    handleClose();
  };
  ///////////////////////////////////////
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        style={{
          zIndex: 999999,
        }}>
        <Modal.Header closeButton>
          <Modal.Title>{t("header.userInfo")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isLoggedOut ? (
            <>
              <h2
                style={{
                  fontWeight: "400",
                  fontFamily: "Roboto",

                  marginBottom: "18px",
                  fontSize: "20px",
                }}>
                {t("header.username")}: {isLoggedOut.username}
              </h2>
              <h4
                style={{
                  fontWeight: "400",
                  fontFamily: "Roboto",

                  marginBottom: "16px",
                  fontSize: "20px",
                }}>
                {t("header.password")}: {isLoggedOut.password}
              </h4>
            </>
          ) : (
            <p>User is not logged in.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {t("dialog.cancel")}
          </Button>
          <Button variant="primary" onClick={handleLogOut}>
            {t("dialog.logout")}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Profile;
