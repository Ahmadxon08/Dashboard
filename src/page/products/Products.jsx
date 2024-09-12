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
import useMenuStore from "../../store/useMenuStore";
import ProductsFilter from "../../components/productsFilter/ProductsFilter";
// import { Link } from "react-router-dom";

const Products = () => {
  const { t } = useTranslation();
  const itemsPerPage = 20;

  ////these are the stores that using for state management
  const { fetchGrandParents, fetchParents } = useMenuStore((state) => ({
    fetchGrandParents: state.fetchGrandParents,
    grandParents: state.grandParents,
    fetchParents: state.fetchParents,
  }));
  const {
    setSelectedCategoryId,
    products,
    pageNum,
    totalItems,
    loading,
    error,
    selectedCategoryId,
    fetchProductsByCategoryId,
    setPage,
    uniqueItems,
    productDetails,
    selectedParentId,
    selectedGrandParentId,
    setSelectedGrandParentId,
    setSelectedParentId,
  } = useCategoryStore((state) => ({
    productDetails: state.productDetails,
    selectedGrandParentId: state.selectedGrandParentId,
    selectedParentId: state.selectedParentId,
    setSelectedGrandParentId: state.setSelectedGrandParentId,
    setSelectedParentId: state.setSelectedParentId,
    uniqueItems: state.uniqueItems,
    products: state.products,
    error: state.error,
    pageNum: state.currentPage,
    loading: state.loading,
    totalItems: state.totalItems,
    fetchProductsByCategoryId: state.fetchProductsByCategoryId,
    selectedCategoryId: state.selectedCategoryId,
    setPage: state.setPage,
    setSelectedCategoryId: state.setSelectedCategoryId,
  }));
  ///////////////////////////// ending state////////////////
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
  const selectedCategoryId2 = null;
  const textHeader = localStorage.getItem("activeButton") || "Kатегории";
  //////Product section navigation
  const grandParentString = localStorage.getItem("grandParent");
  const grandParent = grandParentString ? JSON.parse(grandParentString) : null;
  const parentString = localStorage.getItem("parent");
  const parent = parentString ? JSON.parse(parentString) : null;
  const categoryIdString = localStorage.getItem("linkIdForCategory");
  const categoryId = categoryIdString ? JSON.parse(categoryIdString) : null;
  useEffect(() => {
    if (selectedCategoryId2 !== null) {
      fetchParents(selectedCategoryId2);
    }
  }, [selectedCategoryId2]);
  useEffect(() => {
    fetchGrandParents();
  }, [fetchGrandParents]);
  console.log("Link categroy", categoryId);
  const handleCategoryIdClick = () => {
    localStorage.removeItem("parent");
    localStorage.removeItem("grandParent");
    localStorage.removeItem("activeButton");
    if (selectedGrandParentId === categoryId) {
      setSelectedGrandParentId(null);
      console.log("Link categroy", categoryId);
      fetchProductsByCategoryId(categoryId);
    } else {
      setSelectedCategoryId(categoryId);
    }
  };
  const handleGrandParentClick = (grandParentId) => {
    localStorage.removeItem("parent");
    if (selectedGrandParentId === grandParentId) {
      console.log(grandParentId);
      fetchProductsByCategoryId(grandParentId);
    }
  };
  // Ota kategoriyasini bosganda nima bo'lishini hal qilish
  const handleParentClick = (parentId) => {
    if (selectedParentId === parentId) {
      setSelectedParentId(null);
      console.log("parent  siddebar", parentId);
    } else {
      setSelectedCategoryId(parentId);
      fetchProductsByCategoryId(parentId);
    }
  };

  console.log("grandparent", grandParent);

  console.log("this is link ", products);

  console.log("loading...", loading);

  console.log("llllllllj", uniqueItems);
  console.log("selectedss", productDetails);

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
              <span className="home_link">{t(`sidebar.home`)}</span>
              <small>/</small>
              <span onClick={handleCategoryIdClick}>Kатегории </span>
              <small> {grandParent?.title ? "/" : ""}</small>
              <span onClick={() => handleGrandParentClick(grandParent?.id)}>
                {grandParent?.title}
              </span>
              <small> {parent?.title ? "/" : ""}</small>
              <span onClick={() => handleParentClick(parent?.id)}>
                {parent?.title}
              </span>
            </div>

            <h2>{textHeader}</h2>

            <h3>{t("categories.totalItems", { count: totalItems })}</h3>
            <ProductsFilter products={products} />
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
