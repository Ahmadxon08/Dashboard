import { Button, TextField } from "@mui/material";
import "./Content.scss";
import Table1 from "../../components/table/Table";
// import  { useState } from 'react';

const ContentBody = () => {
  return (
    <div className="content">
      <section className="content_header">
        <div className="items">
          <div className="item">
            <label htmlFor="name">Product name:</label>
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
            <label htmlFor="store">Store name:</label>
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
            <label htmlFor="product">Price:</label>
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
            <label htmlFor="order">Order By:</label>
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
          <Button varinat="text">Search</Button>
        </div>
      </section>
      <section className="content_body">
        <Table1 />
      </section>
    </div>
  );
};

export default ContentBody;
