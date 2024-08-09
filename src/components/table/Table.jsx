import { useState } from "react";
import Table from "react-bootstrap/Table";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Table.scss";
import { useApiContext } from "../../context/Context";
import { useTranslation } from "react-i18next";

const itemsPerPage = 6;

const Table1 = () => {
  //// page trasnlator
  const { t } = useTranslation();

  ////

  const { items } = useApiContext();
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (event, pageNumber) => {
    setCurrentPage(pageNumber);
  };
  console.log(items);

  ///pagination
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = items.slice(indexOfFirstProduct, indexOfLastProduct);

  const pageNumbers = Math.ceil(items.length / itemsPerPage);

  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  return (
    <div style={{ width: "100%", overflowX: "auto" }} className="table">
      <Table bordered hover responsive="lg" style={{ width: "100%" }}>
        <thead
          className="table_head"
          style={{
            backgroundColor: "#f5f5f5",
          }}>
          <tr>
            <th>#</th>
            <th>Categories Name</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Description ...</th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.map((item, index) => (
            <tr
              key={index}
              style={{
                cursor: "pointer",
                transition: "all .5s",
              }}>
              <td>{indexOfFirstProduct + index + 1}</td>
              <td>{item.category}</td>
              <td>{item.brand}</td>
              <td>{item.price} $</td>
              <td
                style={{
                  maxWidth: "160px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}>
                {truncateText(item.description, 100)}..
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          marginTop: "20px",
          paddingRight: "60px",
        }}>
        <span style={{ marginRight: "20px" }}>
          {t("pagination.pageOf", { currentPage, totalPages: pageNumbers })}
        </span>
        <Stack spacing={2}>
          <Pagination
            count={pageNumbers}
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
