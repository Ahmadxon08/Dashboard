/* eslint-disable react/prop-types */

import "./ProductsFilter.scss";
import { motion } from "framer-motion";

import { useEffect } from "react";
import useCategoryStore from "../../store/useCategoryStore";
import { Link, useParams } from "react-router-dom";

const ProductsFilter = ({ products }) => {
  const { id } = useParams();
  const {
    selectedCategoryId,
    setUniqueItems,
    uniqueItems,
    filterSelectId,
    setFilterSelects,
    fetchProductDetails,
    productDetails,
  } = useCategoryStore((state) => ({
    setFilterSelects: state.setFilterSelects,
    productDetails: state.productDetails,
    fetchProductDetails: state.fetchProductDetails,
    setFilterSelectId: state.setFilterSelectId,
    filterSelectId: state.filterSelectId,
    selectedCategoryId: state.selectedCategoryId,
    filterItemByCategoryId: state.filterItemByCategoryId,
    uniqueItems: state.uniqueItems,
    setUniqueItems: state.setUniqueItems,
    fetchProductsByCategoryId: state.fetchProductsByCategoryId,
    setSelectedCategoryId: state.setSelectedCategoryId,
  }));
  useEffect(() => {
    if (products?.payLoad) {
      const seen = new Set();
      const filteredProducts = products?.payLoad.filter((item) => {
        const duplicate = seen.has(item?.id);
        seen.add(item?.id);
        return !duplicate;
      });
      setUniqueItems(filteredProducts);
    }
  }, [products]);
  ////to get filtered product

  useEffect(() => {
    if (id) {
      fetchProductDetails(id);
    }
  }, [id, fetchProductDetails]);

  useEffect(() => {
    setFilterSelects(productDetails);
  }, [setFilterSelects, productDetails]);
  /////////////////

  const handleFilteredClick = (filterId) => {
    fetchProductDetails(filterId);

    console.log("Selected Category ID:", filterId);
  };
  console.log("Selected Category ID:", filterSelectId);
  console.log("selected", selectedCategoryId);

  console.log("ssssssss", uniqueItems);
  console.log("filtered products", productDetails);

  return (
    <div className="productsFilter">
      {uniqueItems &&
        uniqueItems.map((item, i) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="filter"
            key={item.id}
            custom={i}
            onClick={() => handleFilteredClick(item.id)}>
            <Link key={i} to={`/product/${item.id}`}>
              <span>{item.title || "No Title"}</span>
            </Link>
          </motion.div>
        ))}
    </div>
  );
};

export default ProductsFilter;
