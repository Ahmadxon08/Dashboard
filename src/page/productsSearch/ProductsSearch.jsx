/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import { TextField, Button } from "@mui/material";
import "./ProductsSearch.scss";
import debounce from "lodash.debounce";
import { useTranslation } from "react-i18next";

const ProductsSearch = () => {
  const { t } = useTranslation();
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://65.1.136.0:5050/api/productsByName",
        {
          text: searchText,
          pageNum: pageNum.toString(),
        }
      );

      setProducts(response.data.payLoad || []);
      setTotal(response.data.total || 0);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  }, [pageNum, searchText]);

  const debouncedFetchProducts = useCallback(debounce(fetchProducts, 500), [
    fetchProducts,
  ]);

  useEffect(() => {
    debouncedFetchProducts();
  }, [debouncedFetchProducts]);

  const handlePageChange = (event, newPage) => {
    setPageNum(newPage);
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
    setPageNum(1);
  };

  const totalPages = Math.ceil(total / 20);
  console.log(products);

  return (
    <section className="productsSearch">
      <div className="search_head">
        <h1>Search Products</h1>
        <div className="search_action">
          <TextField
            label="Search"
            value={searchText}
            onChange={handleSearchChange}
          />
          <Button onClick={() => setPageNum(1)}>Search</Button>
        </div>
      </div>
      {loading ? (
        <CircularProgress color="primary" />
      ) : (
        <>
          {products.length > 0 ? (
            <ul className="search_body">
              {products.map((product, i) => (
                <li key={i} className="productCard">
                  <img src={product.photo} alt="product" />
                  <div className="productText">
                    <p>{product.name}</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No products found</p>
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
