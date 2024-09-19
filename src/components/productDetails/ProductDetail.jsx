/* eslint-disable react/no-unescaped-entities */
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useCategoryStore from "../../store/useCategoryStore";
import "./ProductDetail.scss";
import { Button, CircularProgress } from "@mui/material";
import Chart from "../chart/Chart";
import Slider from "../slider/Slider";

// URL'larni chiqarib olish va tavsifdan olib tashlash funksiyasi
const extractAndRemoveUrls = (description) => {
  const urlPattern = /https:\/\/[^\s]+\.jpg/g;
  const urls = description.match(urlPattern) || [];
  const cleanedDescription = description.replace(urlPattern, "").trim();
  return { cleanedDescription, urls };
};

const ProductDetail = () => {
  const { id } = useParams();
  console.log("Product ID:", id);

  const { productDetails, filterSelects, fetchProductDetails, loading, error } =
    useCategoryStore((state) => ({
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
    }
  }, [productDetails]);

  console.log(filterSelects);

  if (error) return <p>Error: {error}</p>;

  const product = Array.isArray(productDetails)
    ? productDetails[0]
    : productDetails;
  console.log(urls);
  console.log("lohhhh", cleanedDescription);
  console.log(product);

  const handleBack = () => {
    navigate(-1);
  };
  console.log("images massive", urls);

  return (
    <div className="productDetail">
      {loading ? (
        <div className="loadingSpinner">
          <CircularProgress color="primary" className="load" />
          <span>Loading...</span>
        </div>
      ) : (
        <>
          {" "}
          <Button
            variant="text"
            onClick={handleBack}
            style={{
              backgroundColor: "#7000ff",
              color: "#fff",
              marginLeft: "10px",
            }}>
            back
          </Button>
          {product ? (
            <div className="product_card">
              <div className="imgWrapper">
                {urls.length > 0 ? (
                  <Slider urls={urls} />
                ) : (
                  <img src={product.photo} alt={product.title} />
                )}
              </div>
              <div className="product_text">
                <h1>{product.title}</h1>

                <div className="line"></div>

                <span>
                  {product.rating > 0 ? (
                    <span>
                      Rating: <b>{product.rating}</b>
                    </span>
                  ) : (
                    <span>No ratings yet.</span>
                  )}
                </span>

                <span>
                  Reviews:
                  {product.reviewsAmount > 0 ? (
                    <span>{product.reviewsAmount}</span>
                  ) : (
                    <span>No reviews yet.</span>
                  )}
                </span>

                <span>Available: {product.skuList[0]?.availableAmount}</span>
                <Chart product={product} />
              </div>
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
