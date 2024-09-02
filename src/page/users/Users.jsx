import { Button, Pagination, Stack } from "@mui/material";
import Table from "react-bootstrap/Table";
import "./Users.scss";
import { useTranslation } from "react-i18next";

import { useState } from "react";
import Delete from "../../components/deleteUser/Delete";
import { MdDelete, MdEditSquare } from "react-icons/md";
import useStore from "../../store/useStore";
import AddUserCm from "../../components/addUser/AddUser";
import EditUserCm from "../../components/editUser/EditUser";

const Users = () => {
  const { t } = useTranslation();

  const { handleDeleteOpen, handleShowAddUser, allUsers, handleEditOpen } =
    useStore((state) => ({
      allUsers: state.allUsers,
      handleEditOpen: state.handleEditOpen,
      handleDeleteOpen: state.handleDeleteOpen,
      handleShowAddUser: state.handleShowAddUser,
    }));

  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (event, pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = allUsers.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const pageNumbers = Math.ceil(allUsers.length / itemsPerPage);

  return (
    <div className="user">
      <div>
        <div className="user_head">
          <h2>{t("users.usersList")}</h2>
          <Button
            variant="text"
            onClick={handleShowAddUser}
            style={{
              backgroundColor: "#7000ff",
              color: "#fff",
              marginLeft: "10px",
            }}>
            {t("users.add")}
          </Button>
        </div>
        <AddUserCm />
        <EditUserCm />
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
                      <Button onClick={handleEditOpen}>
                        <MdEditSquare size={24} color="orange" />
                      </Button>
                      <Button onClick={handleDeleteOpen}>
                        <MdDelete size={24} color="red" />
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
          <Delete />
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
