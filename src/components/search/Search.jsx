import { useState, useEffect, useCallback } from "react";
import Modal from "react-bootstrap/Modal";
import ListGroup from "react-bootstrap/ListGroup";
import { useNavigate } from "react-router-dom";
import { Button, IconButton, styled, TextField } from "@mui/material";
import "./Search.scss";
import { IoClose } from "react-icons/io5";
import useSearchStore from "../../store/useSearchStore";
import debounce from "lodash.debounce";

const CustomTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#ccc",
    },
    "&:hover fieldset": {
      borderColor: "#7000FF",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#7000FF",
    },
  },
  "& .MuiFormLabel-root.Mui-focused": {
    color: "#7000FF",
  },
});

function SearchModal() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const {
    products,
    openSearch,
    fetchProducts,
    handleSearchClose,
    setSearchText,
  } = useSearchStore((state) => ({
    products: state.products,
    openSearch: state.openSearch,
    fetchProducts: state.fetchProducts,
    handleSearchClose: state.handleSearchClose,
    setSearchText: state.setSearchText,
  }));

  // Using useCallback to debounce the fetchProducts method
  const debouncedFetchProducts = useCallback(
    debounce((value) => {
      setSearchText(value);
      fetchProducts(value, 1);
    }, 500),
    [setSearchText, fetchProducts]
  );

  useEffect(() => {
    if (searchTerm.trim()) {
      debouncedFetchProducts(searchTerm);
    }
    // Clean up debounce
    return () => {
      debouncedFetchProducts.cancel();
    };
  }, [searchTerm, debouncedFetchProducts]);

  const handleClose = () => {
    setSearchTerm("");
    handleSearchClose();
  };

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
  };

  const handleResultClick = (id) => {
    handleClose();
    navigate(`/single/${id}`);
  };

  return (
    <>
      <Modal
        show={openSearch}
        className="Modall"
        onHide={handleClose}
        scrollable={true}
        dialogClassName="custom-modal"
        style={{ height: "60vh" }}>
        <Modal.Header className="search_head">
          <Modal.Title>Search Products</Modal.Title>
          <IconButton onClick={handleClose}>
            <IoClose size={30} />
          </IconButton>
        </Modal.Header>
        <div className="inputSearch">
          <CustomTextField
            fullWidth
            variant="outlined"
            label="Search ..."
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Enter product name"
            autoFocus
          />
        </div>
        <Modal.Body className="modal_body">
          {searchTerm && products.length === 0 && (
            <div className="no-results">
              <video width="100%" autoPlay muted loop>
                <source
                  src="./assets/video/DataNotFound.mp4"
                  type="video/mp4"
                />
              </video>
            </div>
          )}
          {products.length > 0 && (
            <ListGroup>
              {products.map((product) => (
                <ListGroup.Item
                  action
                  key={product.id}
                  onClick={() => handleResultClick(product.id)}>
                  {product.title}
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="contained"
            style={{
              backgroundColor: "#7000FF",
              color: "#fff",
            }}
            onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default SearchModal;
