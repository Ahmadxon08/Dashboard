import { Button, TextField } from "@mui/material";
import "./Home.scss";
import Table1 from "../../components/table/Table";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { main_url } from "../../utils/api";
import axios from "axios";
// import  { useState } from 'react';

const Home = () => {
  const { t } = useTranslation();
  const [categories, setCategories] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [pageNum, setPageNum] = useState(1);
  const [total, setTotal] = useState(0);

  // API ma'lumotlarini olish uchun useEffect
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.post(`${main_url}category`, {
          jss: { pathDepth: 3 },
          pageNum: "1",
        });

        setCategories(response.data.payLoad);
        setTotal(response.data.total);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, [pageNum]);
  console.log(categories);
  console.log(total);

  return (
    <div className="content">
      <section className="content_header">
        <div className="items">
          <div className="item">
            <label htmlFor="name">{t("mainContent.productName")} :</label>
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
            <label htmlFor="store">{t("mainContent.storeName")} :</label>
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
            <label htmlFor="product">{t("mainContent.price")} :</label>
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
            <label htmlFor="order">{t("mainContent.orderBy")} :</label>
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
          <Button variant="text">{t("mainContent.search")}</Button>
        </div>
      </section>
      <section className="content_body">
        <Table1 />
      </section>
    </div>
  );
};

export default Home;
