/* eslint-disable react/no-unescaped-entities */
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useCategoryStore from "../../store/useCategoryStore";
import "./ProductDetail.scss";
import { CircularProgress } from "@mui/material";

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

  const { productDetails, fetchProductDetails, loading, error } =
    useCategoryStore((state) => ({
      productDetails: state.productDetails,
      fetchProductDetails: state.fetchProductDetails,
      loading: state.loading,
      error: state.error,
    }));

  // Tavsif va URL'larni saqlash uchun state
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

      // Tavsif va URL'larni chiqarib olish
      const { cleanedDescription, urls } = extractAndRemoveUrls(
        product.description
      );

      // State'ni yangilash
      setCleanedDescription(cleanedDescription);
      setUrls(urls);
    }
  }, [productDetails]);

  if (error) return <p>Error: {error}</p>;

  if (!productDetails) return <p>Product not found.</p>;

  // Agar productDetails array bo'lsa, birinchi elementni olish
  const product = Array.isArray(productDetails)
    ? productDetails[0]
    : productDetails;
  console.log(urls);

  return (
    <div className="productDetail">
      {loading ? (
        <div className="loadingSpinner">
          <CircularProgress color="primary" className="load" />
          <span>Loading...</span>
        </div>
      ) : (
        <>
          {product && (
            <div className="product_card">
              <div className="imgWrapper">
                <img src={product.photo} alt={product.title} />
              </div>
              <div className="product_text">
                <h1>{product.title}</h1>

                <p>{cleanedDescription}</p>

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

                <span>Price: {product.skuList[0]?.fullPrice} UZS </span>
                <span>Available: {product.skuList[0]?.availableAmount}</span>
                {/* {urls.map((url, i) => (
                  <img src={url} key={i} alt="" width={182} height={192} />
                ))} */}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProductDetail;
