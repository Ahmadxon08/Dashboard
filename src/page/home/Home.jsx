import { Button, TextField } from "@mui/material";
import "./Home.scss";
import Table1 from "../../components/table/Table";
import { useTranslation } from "react-i18next";
// import  { useState } from 'react';

const Home = () => {
  const { t } = useTranslation();

  return (
    <div className="content">
      <section className="content_header">
        <div className="items">
          <div className="item">
            <label htmlFor="name">{t("MainContent.ProductName")} :</label>
            <TextField
              id="filled-basic"
              variant="filled"
              name="name"
              InputProps={{
                style: {
                  height: "40px",
                },
              }}
            />
          </div>

          <div className="item">
            <label htmlFor="store">{t("MainContent.StoreName")} :</label>
            <TextField
              id="filled-basic"
              variant="filled"
              name="store"
              InputProps={{
                style: {
                  height: "40px",
                },
              }}
            />
          </div>
        </div>
        <div className="items">
          <div className="item">
            <label htmlFor="product">{t("MainContent.Price")} :</label>
            <TextField
              id="filled-basic"
              variant="filled"
              name="price"
              InputProps={{
                style: {
                  height: "40px",
                },
              }}
            />
          </div>

          <div className="item">
            <label htmlFor="order">{t("MainContent.OrderBy")} :</label>
            <TextField
              id="filled-basic"
              variant="filled"
              name="order"
              InputProps={{
                style: {
                  height: "40px",
                },
              }}
            />
          </div>
        </div>
        <div className="items">
          <div className="item">
            <label htmlFor="product">...</label>
            <TextField
              id="filled-basic"
              variant="filled"
              InputProps={{
                style: {
                  height: "40px",
                },
              }}
            />
          </div>

          <div className="item">
            <label htmlFor="produuct">...</label>
            <TextField
              id="filled-basic"
              variant="filled"
              InputProps={{
                style: {
                  height: "40px",
                },
              }}
            />
          </div>
        </div>
        <div className="btn1">
          <Button variant="text">{t("MainContent.Search")}</Button>
        </div>
      </section>
      <section className="content_body">
        <Table1 />
      </section>
    </div>
  );
};

export default Home;
