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
import ProductsCarousel from "../../components/productsFilter/ProductsCarousel";
// import { Link } from "react-router-dom";

const Products = () => {
  const { t } = useTranslation();
  const itemsPerPage = 20;

  const {
    products,
    pageNum,
    totalItems,
    loading,
    error,
    selectedCategoryId,
    fetchProductsByCategoryId,
    setPage,
    uniqueItems,
  } = useCategoryStore((state) => ({
    uniqueItems: state.uniqueItems,
    products: state.products,
    error: state.error,
    pageNum: state.currentPage,
    loading: state.loading,
    totalItems: state.totalItems,
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
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const textHeader = localStorage.getItem("activeButton") || "";

  console.log("this is link ", products);

  console.log("loading...", loading);

  console.log("llllllllj", uniqueItems);

  return (
    <section className="allProducts">
      {loading ? (
        <div className="loadingSpinner">
          <CircularProgress color="primary" className="load" />
          <span>Loading...</span>
        </div>
      ) : (
        <>
          <div className="all_product_head">
            <div className="url">
              <span>
                {/* {uniqueItems[0].map((item, i) => (
                  // <span key={i}>{item.category.title}</span>
                ))} */}
              </span>
            </div>

            <h2>{textHeader}</h2>

            <h3>{t("categories.totalItems", { count: totalItems })}</h3>
            <ProductsCarousel products={products} />
          </div>

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
