/* eslint-disable react/no-unescaped-entities */
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
// import Table from "react-bootstrap/Table";

const ProductTable = ({ categories }) => {
  const [maxletter, setMaxLetter] = useState(160);
  const removeImageUrls = (description) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return description.replace(urlRegex, "").trim();
  };

  const handleResize = () => {
    if (window.innerWidth <= 425) {
      setMaxLetter(50);
    } else if (window.innerWidth <= 768) {
      setMaxLetter(100);
    } else {
      setMaxLetter(120);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Image</th>
          <th>Title</th>
          <th>Rating</th>
          <th>Price</th>
          <th>Order</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {categories.map((category, index) => (
          <tr key={category._id || index}>
            <td data-cell="No">{index + 1}</td>
            <td data-cell="Image">
              <img src={category.photo} alt="photo" />
            </td>
            <td data-cell="Title">{category.title.slice(0, 15)}...</td>
            <td data-cell="Rating">{category?.rating || 0}</td>
            <td data-cell="Price">
              {category.skuList[0]?.fullPrice || "N/A"} so'm
            </td>
            <td data-cell="Order">{category.ordersAmount || "N/A"}</td>
            <td data-cell="Description">
              {removeImageUrls(
                category.description.slice(0, maxletter) || "N/A"
              )}
              ...
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

ProductTable.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      ordersAmount: PropTypes.number.isRequired,
      someOtherField: PropTypes.string,
      anotherField: PropTypes.string,
    })
  ).isRequired,
};

export default ProductTable;
