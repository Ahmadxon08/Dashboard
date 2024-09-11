/* eslint-disable react/prop-types */

import "./ProductsCarousel.scss";
import { motion } from "framer-motion";

import { useEffect } from "react";
import useCategoryStore from "../../store/useCategoryStore";

const ProductsCarousel = ({ products }) => {
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
    if (products?.payLoad) {
      const seen = new Set();
      const filteredProducts = products.payLoad.filter((item) => {
        const duplicate = seen.has(item.category.id);
        seen.add(item.category.id);
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
            onClick={() => handleFilteredClick(item.category.id)}>
            <span>{item.category.title}</span>
          </motion.div>
        ))}
    </div>
  );
};

export default ProductsCarousel;
