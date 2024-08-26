import { useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import { TextField, Button, InputAdornment, IconButton } from "@mui/material";
import "./ProductsSearch.scss";
import useSearchStore from "../../store/useSearchStore";
import { useTranslation } from "react-i18next";
import { IoClose, IoSearchSharp } from "react-icons/io5";

const notProduction = "./assets/img/notP.webp";

const ProductsSearch = () => {
  const { t } = useTranslation();
  const {
    products,
    total,
    pageNum,
    loading,
    searchText,
    setSearchText,
    setPageNum,
    fetchProducts,
  } = useSearchStore((state) => ({
    products: state.products,
    total: state.total,
    pageNum: state.pageNum,
    loading: state.loading,
    searchText: state.searchText,
    setSearchText: state.setSearchText,
    setPageNum: state.setPageNum,
    fetchProducts: state.fetchProducts,
  }));

  useEffect(() => {
    fetchProducts(searchText, pageNum);
  }, [searchText, pageNum, fetchProducts]);

  const handlePageChange = (event, newPage) => {
    setPageNum(newPage);
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
    setPageNum(1);
  };
  const handleSearchClick = () => {
    handlePageChange();
  };
  const totalPages = Math.ceil(total / 20);

  const handleClearSearch = () => {
    setSearchText("");
  };
  return (
    <section className="productsSearch">
      <div className="search_head">
        <h1>Search Products</h1>
        <div className="search_action">
          <TextField
            label="Search..."
            value={searchText}
            className="inputSearch"
            onChange={handleSearchChange}
            variant="standard"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IoSearchSharp
                    size={22}
                    color="#7000ff"
                    style={{
                      marginBottom: "5px",
                    }}
                  />
                </InputAdornment>
              ),
              endAdornment: searchText ? (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClearSearch}
                    style={{
                      color: "#7000ff",
                      cursor: "pointer",
                      marginBottom: "10px",
                      width: "30px",
                      height: "30px",
                      marginLeft: "10px",
                    }}>
                    <IoClose />
                  </IconButton>
                </InputAdornment>
              ) : null,
            }}
          />
          <Button
            className="clickBtn"
            variant="contained"
            onClick={handleSearchClick}>
            Search
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="loadingSpinner">
          <CircularProgress color="primary" className="load" />
        </div>
      ) : (
        <>
          {products.length > 0 ? (
            <ul className="search_body">
              {products.map((product, i) => (
                <li key={i} className="productCard">
                  <img src={product.photo} alt="product" />
                  <div className="productText">
                    <h1>
                      Rating : <b>{product.rating}</b>
                    </h1>
                    <p>{product.category.title.slice(0, 10)}...</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="noProducts">
              <img src={notProduction} alt="not found" />
            </div>
          )}
        </>
      )}
      <div className="pagination_footer">
        <span style={{ marginRight: "20px" }}>
          {t("pagination.pageOf", { currentPage: pageNum, totalPages })}
        </span>
        <Stack spacing={2}>
          <Pagination
            count={totalPages}
            page={pageNum}
            onChange={handlePageChange}
            siblingCount={1}
            boundaryCount={1}
          />
        </Stack>
      </div>
    </section>
  );
};

export default ProductsSearch;
