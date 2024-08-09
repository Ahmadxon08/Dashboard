import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useApiContext } from "../../context/Context";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const { show, handleClose } = useApiContext();
  const isLoggedOut = JSON.parse(localStorage.getItem("user"));

  const handleLogOut = () => {
    localStorage.removeItem("user");
    navigate("/login");
    handleClose();
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isLoggedOut ? (
            <>
              <h2>Username: {isLoggedOut.username}</h2>
              <h4>Password: {isLoggedOut.password}</h4>
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
