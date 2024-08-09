import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useApiContext } from "../../context/Context";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Profile = () => {
  const { t } = useTranslation();

  ///////////// getting info about Profile/////
  const navigate = useNavigate();
  const { show, handleClose } = useApiContext();
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
      <Modal show={show} onHide={handleClose}>
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
            Close
          </Button>
          <Button variant="primary" onClick={handleLogOut}>
            Log Out
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Profile;
