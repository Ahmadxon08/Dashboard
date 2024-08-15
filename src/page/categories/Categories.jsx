import { useEffect, useState } from "react";
import useStore from "../../store/useStore";
import { IconButton, Pagination, Rating, Stack } from "@mui/material";
import "./Categories.scss";
import { Link } from "react-router-dom";
import SearchModal from "../../components/search/Search";

import { ImSearch } from "react-icons/im";
import StarIcon from "@mui/icons-material/Star";

const Categories = () => {
  const { products, fetchAllProducts, handleSearchOpen } = useStore(
    (state) => ({
      products: state.products,
      fetchAllProducts: state.fetchAllProducts,
      handleSearchOpen: state.handleSearchOpen,
    })
  );

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    const loadProducts = async () => {
      await fetchAllProducts();
    };
    loadProducts();
  }, [fetchAllProducts]);

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const pageNumbers = Math.ceil(products.length / itemsPerPage);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  return (
    <div className="categories">
      <SearchModal />
      <div className="pro_head">
        <h2>Products</h2>

        <IconButton
          size="large"
          aria-label="search"
          color="inherit"
          onClick={handleSearchOpen}>
          <ImSearch
            style={{
              color: "#7000ff",
            }}
          />
        </IconButton>
      </div>
      <div className="pro_body">
        {currentProducts.length > 0 ? (
          currentProducts.map((product) => (
            <Link
              to={`/single/${product.id}`}
              key={product.id}
              className="pro_card">
              <img src={product.photo} alt="" />
              <div className="card_texts">
                <h3>{truncateText(product.title, 12)}</h3>
                <Rating
                  size="small"
                  name="product-rating"
                  value={product.rating}
                  readOnly
                  precision={0.5}
                  emptyIcon={
                    <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                  }
                />
                <h4>{product.minFullPrice}</h4>
              </div>
            </Link>
          ))
        ) : (
          <p>No products available</p>
        )}
      </div>
      <div className="pro_footer">
        <Stack spacing={2}>
          <Pagination
            count={pageNumbers}
            page={currentPage}
            onChange={handlePageChange}
          />
        </Stack>
      </div>
    </div>
  );
};

export default Categories;
