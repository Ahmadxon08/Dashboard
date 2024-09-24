/* eslint-disable react/no-unescaped-entities */
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import useCategoryStore from "../../store/useCategoryStore";
import { useTranslation } from "react-i18next";

const ProductTable = ({ categories }) => {
  const { t } = useTranslation();
  const { uniqueItems } = useCategoryStore((state) => ({
    uniqueItems: state.uniqueItems,
  }));

  // const startsWithUrl = (description) => {
  //   if (!description) return false;

  //   const urlRegex = /^(https?:\/\/[^\s]+)/;
  //   return urlRegex.test(description);
  // };

  // const extractAndRemoveUrls = (description) => {
  //   if (!description) return { cleanedDescription: "", urls: [] };

  //   const urlPattern = /https:\/\/[^\s]+\.jpg/g;
  //   const urls = description.match(urlPattern) || [];
  //   const cleanedDescription = description.replace(urlPattern, "").trim();
  //   return { cleanedDescription, urls };
  // };

  // const handleResize = () => {
  //   if (window.innerWidth <= 425) {
  //     setMaxLetter(50);
  //   } else if (window.innerWidth <= 768) {
  //     setMaxLetter(100);
  //   } else {
  //     setMaxLetter(160);
  //   }
  // };

  // useEffect(() => {
  //   handleResize();
  //   window.addEventListener("resize", handleResize);
  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);
  console.log("cateee", categories);
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
                <img src={category.photo} alt="photo" />
              </td>
              <td data-cell="Title">
                {category?.seller?.title.slice(0, 15)}...
                <br />
                <Link
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
