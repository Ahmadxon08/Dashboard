import { useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import "./AllProducts.scss";
import { useTranslation } from "react-i18next";
import useCategoryStore from "../../store/useCategoryStore";
import ProductTable from "../../components/productsTable/ProductTable";

const AllProducts = () => {
  const { t } = useTranslation();

  const {
    products,
    pageNum,
    totalPages,
    loading,
    error,
    selectedCategoryId,
    fetchProductsByCategoryId,
  } = useCategoryStore((state) => ({
    products: state.products,
    error: state.error,
    pageNum: state.pageNum,
    totalPages: state.totalPages,
    fetchProductsByCategoryId: state.fetchProductsByCategoryId,
    selectedCategoryId: state.selectedCategoryId,
  }));

  useEffect(() => {
    if (selectedCategoryId) {
      fetchProductsByCategoryId(selectedCategoryId, pageNum);
    }
  }, [selectedCategoryId, pageNum]);

  const handlePageChange = (e, page) => {
    e.preventDefault();
    fetchProductsByCategoryId(selectedCategoryId, page);
  };
  if (loading) return <div>Loading...</div>;

  console.log("this is link ", products);

  return (
    <section className="allProducts">
      <div className="all_product_head">
        <h2>{t("categories.allProducts")}</h2>
        <h3>{t("categories.totalItems", { count: totalPages })}</h3>
        <div className="line"></div>
      </div>

      {loading ? (
        <div className="loadingSpinner">
          <CircularProgress color="primary" className="load" />
        </div>
      ) : (
        <>
          {" "}
          <div className="all_product_body">
            <ProductTable categories={products.payLoad || []} />{" "}
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

export default AllProducts;
