/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import "./Table.scss";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const itemsPerPage = 20;

const Table1 = ({ products }) => {
  const { t } = useTranslation();

  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (event, pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // /backtop
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [currentPage]);
  ////////
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(products.length / itemsPerPage);

  return (
    <div style={{ width: "100%" }} className="tableContent">
      <span>{("total Results", currentPage.length)}</span>
      <table style={{ width: "100%" }}>
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
                  {loading && <div>Loading...</div>}
                  <img
                    src={category.photo}
                    alt="photo"
                    width={30}
                    height={30}
                    onLoad={() => setLoading(false)}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "path/to/placeholder/image.png";
                      setLoading(false);
                    }}
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
