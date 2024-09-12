/* eslint-disable react/prop-types */

import "./ProductsFilter.scss";
import { motion } from "framer-motion";

import { useEffect } from "react";
import useCategoryStore from "../../store/useCategoryStore";

const ProductsFilter = ({ products }) => {
  const {
    setSelectedCategoryId,
    setUniqueItems,
    uniqueItems,
    filterItemByCategoryId,
    fetchProductsByCategoryId,
  } = useCategoryStore((state) => ({
    filterItemByCategoryId: state.filterItemByCategoryId,
    uniqueItems: state.uniqueItems,
    setUniqueItems: state.setUniqueItems,
    fetchProductsByCategoryId: state.fetchProductsByCategoryId,
    setSelectedCategoryId: state.setSelectedCategoryId,
  }));
  useEffect(() => {
    console.log("Products payload:", products?.payLoad);
    if (products?.payLoad && Array.isArray(products.payLoad)) {
      const seen = new Set();
      const filteredProducts = products.payLoad.filter((item) => {
        console.log("Item:", item);
        const categoryId = item?.id;
        const duplicate = seen.has(categoryId);
        seen.add(categoryId);
        return !duplicate;
      });
      setUniqueItems(filteredProducts);
    }
  }, [products]);

  const handleFilteredClick = (filterId) => {
    setSelectedCategoryId(filterId);
    filterItemByCategoryId(filterId);
    fetchProductsByCategoryId(filterId);
  };
  console.log("ssssssss", uniqueItems);

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
            <span>{item.title || "No Title"}</span>{" "}
          </motion.div>
        ))}
    </div>
  );
};

export default ProductsFilter;
