/* eslint-disable react/no-unescaped-entities */
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const ProductTable = ({ categories }) => {
  const [maxLetter, setMaxLetter] = useState(160);

  const removeImageUrls = (description) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return description.replace(urlRegex, "").trim();
  };

  const startsWithUrl = (description) => {
    const urlRegex = /^(https?:\/\/[^\s]+)/;
    return urlRegex.test(description);
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
        {categories.map((category, index) => {
          const hasUrl = startsWithUrl(category.description);
          const truncatedDescription = removeImageUrls(
            category.description
          ).slice(0, maxLetter);
          const showMore = category.description.length > maxLetter;

          return (
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
              <td data-cell="Order">{category.ordersAmount || 0}</td>
              <td data-cell="Description">
                {hasUrl
                  ? category.title
                  : (truncatedDescription || "N/A") + (showMore ? "..." : "")}
              </td>
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
      _id: PropTypes.string,
      photo: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      rating: PropTypes.number,
      skuList: PropTypes.arrayOf(
        PropTypes.shape({
          fullPrice: PropTypes.string,
        })
      ),
      ordersAmount: PropTypes.number,
    })
  ).isRequired,
};

export default ProductTable;
