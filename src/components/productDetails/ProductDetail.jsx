/* eslint-disable react/no-unescaped-entities */
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useCategoryStore from "../../store/useCategoryStore";
import "./ProductDetail.scss";
import { Button } from "@mui/material";
import Chart from "../chart/Chart";
import Loading from "../loader/Loading";
import ChartForViewer from "../chart/ChartForViewer";
import ChartForRating from "../chart/ChartForRating";
import { useTranslation } from "react-i18next";
import useRelativeStore from "../../store/useRelativeStore";
import RelativeProducts from "./RelativeProducts";
import Slider1 from "../slider/Slider";

// URL'larni chiqarib olish va tavsifdan olib tashlash funksiyasi
const extractAndRemoveUrls = (description) => {
  const urlPattern = /https:\/\/[^\s]+\.jpg/g;
  const urls = description.match(urlPattern) || [];
  const cleanedDescription = description.replace(urlPattern, "").trim();
  return { cleanedDescription, urls };
};

const ProductDetail = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  // console.log("Product ID:", id);
  const {
    setSelectedCategoryId,
    fetchProductsByTypeId,
    selectedCategoryId,
    products,
  } = useRelativeStore((state) => ({
    products: state.products,
    selectedCategoryId: state.selectedCategoryId,
    setSelectedCategoryId: state.setSelectedCategoryId,
    fetchProductsByTypeId: state.fetchProductsByTypeId,
  }));

  const {
    productDetails,
    filterSelects,
    // setSelectedCategoryId,
    fetchProductDetails,
    // fetchProductsByCategoryId,
    loading,
    error,
    // products,
  } = useCategoryStore((state) => ({
    // products: state.products,
    fetchProductsByCategoryId: state.fetchProductsByCategoryId,
    setSelectedCategoryId: state.setSelectedCategoryId,
    filterSelects: state.filterSelects,
    productDetails: state.productDetails,
    fetchProductDetails: state.fetchProductDetails,
    loading: state.loading,
    error: state.error,
  }));
  const navigate = useNavigate();

  const [cleanedDescription, setCleanedDescription] = useState("");
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    if (id) {
      fetchProductDetails(id);
    }
  }, [id, fetchProductDetails]);

  useEffect(() => {
    if (productDetails) {
      const product = Array.isArray(productDetails)
        ? productDetails[0]
        : productDetails;

      if (product && product.description) {
        const { cleanedDescription, urls } = extractAndRemoveUrls(
          product.description
        );
        setCleanedDescription(cleanedDescription);
        setUrls(urls);
      }
      const productsRelativeId = product?.category?.id;

      console.log("dd", productsRelativeId);
      console.log("productId", product.id);

      console.log("dsssssd", selectedCategoryId);
      if (productsRelativeId) {
        setSelectedCategoryId(productsRelativeId);
        fetchProductsByTypeId();
      }
    }
  }, [productDetails, setSelectedCategoryId, fetchProductsByTypeId]);

  // useEffect(() => {
  //   if (product.category.id) {
  //     // Agar productsRelativeId mavjud bo'lsa
  //     setSelectedRelativeId(product?.category?.id);
  //     fetchRelativeProducts();
  //   }
  // }, [productsRelativeId, fetchRelativeProducts]);

  console.log(filterSelects);

  if (error) return <p>Error: {error}</p>;

  const product = Array.isArray(productDetails)
    ? productDetails[0]
    : productDetails;
  console.log(urls);
  console.log("lohhhh", cleanedDescription.slice(0, 100));
  console.log(product);
  ``;
  // console.log("bor tovar", product);

  const handleBack = () => {
    setSelectedCategoryId(null);
    navigate(-1);
  };

  const totalAvialableAmount = product?.totalAvailableAmount;
  console.log("releted to products" + "   ", products.payLoad);

  return (
    <div className="productDetail">
      {loading ? (
        <Loading />
      ) : (
        <>
          <Button
            variant="text"
            onClick={handleBack}
            style={{
              backgroundColor: "#7000ff",
              color: "#fff",
              marginLeft: "10px",
            }}>
            {t("table.back")}
          </Button>

          {product ? (
            <div className="productBody">
              <div className="product_card">
                <div className="imgWrapper">
                  {urls.length > 0 && urls.length > 1 ? (
                    <Slider1 urls={urls} />
                  ) : (
                    <img src={product.photo} alt={product.title} />
                  )}
                </div>
                <div className="product_text">
                  <h1>{product.title}</h1>

                  <h3>
                    {totalAvialableAmount > 0 ? (
                      <p>
                        {" "}
                        {t("table.remain")}: {totalAvialableAmount}
                      </p>
                    ) : (
                      <p>{t("table.noProduct")}</p>
                    )}
                  </h3>

                  <div className="line"></div>

                  <div className="box_chart">
                    <Chart product={product} />
                    <ChartForRating product={product} />

                    <ChartForViewer product={product} />
                  </div>
                </div>
              </div>
              <RelativeProducts />
            </div>
          ) : (
            <p>Product not found.</p>
          )}
        </>
      )}
    </div>
  );
};

export default ProductDetail;
