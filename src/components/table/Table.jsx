/* eslint-disable react/prop-types */
import { useState } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import "./Table.scss";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const itemsPerPage = 6;

const Table1 = ({ products }) => {
  const { t } = useTranslation();

  // const [maxLetter, setMaxLetter] = useState(160);

  // const startsWithUrl = (description) => {
  //   const urlRegex = /^(https?:\/\/[^\s]+)/;
  //   return urlRegex.test(description);
  // };

  // const extractAndRemoveUrls = (description) => {
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

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (event, pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(products.length / itemsPerPage);

  return (
    <div style={{ width: "100%", overflowX: "auto" }} className="tableContent">
      <span>{("total Results", currentPage.length)}</span>
      <table style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>#</th>
            <th>Image</th>
            <th>Title</th>
            <th>Rating</th>

            <th>Order</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.map((category, index) => {
            return (
              <tr key={category._id || index}>
                <td
                  data-cell="No"
                  style={{
                    color: "#000",
                    fontSize: "18px",
                    fontWeight: "bold",
                  }}>
                  {indexOfFirstProduct + index + 1}
                </td>
                <td data-cell="Image">
                  <img
                    src={category.photo}
                    alt="photo"
                    width={30}
                    height={30}
                  />
                </td>
                <td data-cell="Title">
                  {category.title.slice(0, 15)}...
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
                <td data-cell="Rating">{category?.rating || 0}</td>

                <td data-cell="Order">{category.seller.orders || 0}</td>
                <td data-cell="Description">{category.title}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          marginTop: "20px",
          paddingRight: "60px",
        }}>
        <span style={{ marginRight: "20px" }}>
          {t("pagination.pageOf", { currentPage, totalPages })}
        </span>
        <Stack spacing={2}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            siblingCount={1}
            boundaryCount={1}
          />
        </Stack>
      </div>
    </div>
  );
};

export default Table1;
