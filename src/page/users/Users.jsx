import { Button, Pagination, Stack } from "@mui/material";
import Table from "react-bootstrap/Table";
import "./Users.scss";
import { useApiContext } from "../../context/Context";
import AddUser from "../../components/addUser/AddUser";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const Users = () => {
  const { t } = useTranslation();
  const { handleAddUser } = useApiContext();
  const { allUsers } = useApiContext();
  console.log(allUsers);

  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (event, pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Pagination calculations
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = allUsers.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const pageNumbers = Math.ceil(allUsers.length / itemsPerPage);

  return (
    <div>
      <div className="user">
        <div className="user_head">
          <h2>{t("users.usersList")}</h2>
          <Button
            variant="text"
            onClick={handleAddUser}
            style={{
              backgroundColor: "#7000ff",
              color: "#fff",
              marginLeft: "10px",
            }}>
            {t("users.add")}
          </Button>
        </div>
        <AddUser />
        <div className="user_body">
          <Table
            bordered
            hover
            responsive="lg"
            style={{
              width: "100%",
            }}>
            <thead
              className="table_head"
              style={{
                backgroundColor: "#f5f5f5",
              }}>
              <tr>
                <th>#</th>
                <th>Username</th>
                <th>Password</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentProducts.length > 0 &&
                currentProducts.map((item, index) => (
                  <tr
                    key={index}
                    style={{
                      cursor: "pointer",
                      transition: "all .5s",
                    }}>
                    <td>{indexOfFirstProduct + index + 1}</td>
                    <td>{item.userName}</td>
                    <td>{item.passWord}</td>
                    <td>
                      <Button>Edit</Button>
                      <Button>Delete</Button>
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
      </div>
    </div>
  );
};

export default Users;
