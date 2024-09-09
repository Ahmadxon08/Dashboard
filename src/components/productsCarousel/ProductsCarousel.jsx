/* eslint-disable react/prop-types */

import "./ProductsCarousel.scss";

import { useEffect, useState } from "react";
import useCategoryStore from "../../store/useCategoryStore";

const ProductsCarousel = ({ products }) => {
  const [uniqueItems, setUniqueItems] = useState([]);
  const { setSelectedCategoryId, fetchProductsByCategoryId } = useCategoryStore(
    (state) => ({
      fetchProductsByCategoryId: state.fetchProductsByCategoryId,
      setSelectedCategoryId: state.setSelectedCategoryId,
    })
  );
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

    fetchProductsByCategoryId(filterId);
  };
  return (
    <div className="productsFilter">
      {uniqueItems.length > 0 &&
        uniqueItems.map((item) => (
          <div
            className="filter"
            key={item.id}
            onClick={() => handleFilteredClick(item.category.id)}>
            <span>{item.category.title}</span>
          </div>
        ))}
    </div>
  );
};

export default ProductsCarousel;
