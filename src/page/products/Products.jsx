import { useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import "./Products.scss";
import { useTranslation } from "react-i18next";
import useCategoryStore from "../../store/useCategoryStore";
import ProductTable from "../../components/productsTable/ProductTable";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useMenuStore from "../../store/useMenuStore";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/loader/Loading";

const Products = () => {
  const { t } = useTranslation();
  const itemsPerPage = 20;
  const navigate = useNavigate();

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
    setIsCategoriesOpen,
    error,
    selectedCategoryId,
    fetchProductsByCategoryId,
    setPage,
    filterSelects,
    uniqueItems,
    productDetails,
    selectedParentId,
    selectedGrandParentId,
    setSelectedGrandParentId,
    setSelectedParentId,
  } = useCategoryStore((state) => ({
    filterSelects: state.filterSelects,
    setIsCategoriesOpen: state.setIsCategoriesOpen,
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
    setSelectedCategoryId(null);
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
      setSelectedCategoryId(grandParentId);

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
  const handleHomeClick = () => {
    setSelectedCategoryId(null);
    setIsCategoriesOpen(false);
    localStorage.removeItem("activeButton");
    localStorage.removeItem("parent");
    localStorage.removeItem("grandParent");
    fetchProductsByCategoryId(null, 1);
    navigate("/");
  };
  const { categoryTitle } = useMenuStore((state) => ({
    setActiveButton: state.setActiveButton,
    activeButton: state.activeButton,
    categoryTitle: state.categoryTitle,
  }));
  // const activeButton = localStorage.getItem("activeButton"); // Kalit bo'yicha qiymatni olish
  // const categoryTitle = activeButton; // Olingan qiymatni ishlatish

  console.log("filtering products", filterSelects);

  console.log("grandparent", grandParent);

  console.log("this is link ", products);

  console.log("loading...", loading);

  console.log("llllllllj", uniqueItems);
  console.log("selectedss", productDetails);
  console.log("produceeeee", categoryTitle);

  return (
    <section className="allProducts">
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="all_product_head">
            <div className="url">
              <span className="home_link" onClick={handleHomeClick}>
                {t(`sidebar.home`)}
              </span>
              <small>/</small>
              <span onClick={handleCategoryIdClick}>{categoryTitle}</span>
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
                page={+pageNum}
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
