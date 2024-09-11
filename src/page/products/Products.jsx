import { useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import "./Products.scss";
import { useTranslation } from "react-i18next";
import useCategoryStore from "../../store/useCategoryStore";
import ProductTable from "../../components/productsTable/ProductTable";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductsCarousel from "../../components/productsCarousel/ProductsCarousel";
// import { Link } from "react-router-dom";

const Products = () => {
  const { t } = useTranslation();

  const {
    products,
    pageNum,
    totalPages,
    loading,
    error,
    selectedCategoryId,
    fetchProductsByCategoryId,
    setPage,
  } = useCategoryStore((state) => ({
    products: state.products,
    error: state.error,
    pageNum: state.currentPage,
    loading: state.loading,
    totalPages: state.totalPages,
    fetchProductsByCategoryId: state.fetchProductsByCategoryId,
    selectedCategoryId: state.selectedCategoryId,
    setPage: state.setPage,
  }));
  useEffect(() => {
    if (selectedCategoryId) {
      fetchProductsByCategoryId(selectedCategoryId, pageNum);
    }
  }, [selectedCategoryId, pageNum]);

  const handlePageChange = (e, page) => {
    e.preventDefault();
    setPage(page);
  };

  const textHeader = localStorage.getItem("activeButton") || "";

  console.log("this is link ", products);

  console.log("loading...", loading);

  return (
    <section className="allProducts">
      <div className="all_product_head">
        {/* <div className="url">
          <span>
            <Link to={`/category/${selectedCategoryId}`}>
              {" "}
              {textHeader.toLocaleLowerCase()}
            </Link>
            /{textHeader.toLocaleLowerCase()}
          </span>
        </div> */}

        <h2>{loading ? " " : textHeader}</h2>
        <h3>
          {loading ? " " : t("categories.totalItems", { count: totalPages })}
        </h3>
        {loading ? "" : <ProductsCarousel products={products} />}
      </div>

      {loading ? (
        <div className="loadingSpinner">
          <CircularProgress color="primary" className="load" />
          <span>Loading...</span>
        </div>
      ) : (
        <>
          <div className="all_product_body">
            <ProductTable categories={products.payLoad || []} />
          </div>
          {error && (
            <div className="error">
              <h1>{t("error.fetchError")}</h1>
            </div>
          )}
          {products.length === 0 && !loading && (
            <div className="noProducts">
              <h1>{t("error.productNotFound")}</h1>
            </div>
          )}
          <div className="all_product_footer">
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
        </>
      )}
    </section>
  );
};

export default Products;
