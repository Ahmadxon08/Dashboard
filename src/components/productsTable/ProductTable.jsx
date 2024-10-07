/* eslint-disable react/no-unescaped-entities */
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import useCategoryStore from "../../store/useCategoryStore";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import useRelativeStore from "../../store/useRelativeStore";

const ProductTable = ({ categories }) => {
  const { id } = useParams();
  const { t } = useTranslation();
  const { setSelectedCategoryId, fetchProductsByTypeId } = useRelativeStore(
    (state) => ({
      products: state.products,
      selectedCategoryId: state.selectedCategoryId,
      setSelectedCategoryId: state.setSelectedCategoryId,
      fetchProductsByTypeId: state.fetchProductsByTypeId,
    })
  );
  const { uniqueItems } = useCategoryStore((state) => ({
    uniqueItems: state.uniqueItems,
  }));
  const { productDetails, fetchProductDetails } = useCategoryStore((state) => ({
    productDetails: state.productDetails,
    fetchProductDetails: state.fetchProductDetails,
  }));

  useEffect(() => {
    if (id) {
      fetchProductDetails(id);
    }
  }, [id, fetchProductDetails]);
  // handleClick function
  const handleRelativeType = () => {
    const productsRelativeId = productDetails[0]?.category?.id;
    if (productsRelativeId) {
      setSelectedCategoryId(productsRelativeId);
      fetchProductsByTypeId(); // Fetch products based on selected category
    }
  };

  console.log("ddddddddcs89899", categories);
  console.log("filteres proo", uniqueItems);

  return (
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>{t("table.image")}</th>
          <th>{t("table.title")}</th>
          <th>{t("table.rating")}</th>
          <th>{t("table.order")}</th>
          <th>{t("table.description")}</th>
        </tr>
      </thead>
      <tbody>
        {categories.map((category, index) => {
          return (
            <tr key={category.id || index}>
              <td
                data-cell="No"
                style={{
                  color: "#000",
                  fontSize: "18px",
                  fontWeight: "bold",
                }}>
                {index + 1}
              </td>
              <td data-cell="Image">
                {category?.photo && (
                  <img src={category?.photo} alt="Category" />
                )}
              </td>
              <td data-cell="Title">
                {category?.seller?.title.slice(0, 15)}...
                <br />
                <Link
                  onClick={handleRelativeType}
                  to={`/product/${category.id}`}
                  style={{
                    color: "#007bff",
                    textDecoration: "none",
                    fontSize: "14px",
                    backgroundColor: "#ccc",
                    padding: "4px",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}>
                  see more
                </Link>
              </td>
              <td data-cell="Rating">{category?.seller.rating || 0}</td>

              <td data-cell="Order">{category.ordersAmount || 0}</td>
              <td data-cell="Description">{category.title}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

ProductTable.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      photo: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      rating: PropTypes.number,

      ordersAmount: PropTypes.number,
    })
  ).isRequired,
};

export default ProductTable;
