import { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import "./AllProducts.scss";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const AllProducts = () => {
  const [categories, setCategories] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [pathDepth, setPathDepth] = useState(2);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 20;

  useEffect(() => {
    setPageNum(1);
  }, [pathDepth]);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await axios.post(
          "http://65.1.136.0:5050/api/category",
          { jss: { pathDepth }, pageNum: pageNum.toString() }
        );
        setCategories(response.data.payLoad);
        setTotalPages(Math.ceil(response.data.total / itemsPerPage));
      } catch (error) {
        console.error("Xatolik yuz berdi:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [pageNum, pathDepth]);

  const handlePageChange = (event, newPage) => {
    setPageNum(newPage);
  };

  return (
    <section className="allProducts">
      <div className="all_product_head">
        <h2>Barcha mahsulotlar</h2>

        <Box
          sx={{
            minWidth: 60,
          }}>
          <FormControl
            variant="standard"
            sx={{ minWidth: 60, textAlign: "center" }}>
            <InputLabel id="demo-simple-select-standard-label">
              Languages
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={pathDepth}
              onChange={(e) => setPathDepth(parseInt(e.target.value))}
              label="Languages"
              sx={{
                textAlign: "center",
                color: "#7000ff",
                "& .MuiInput-underline:before": {
                  borderBottomColor: "#7000ff",
                },
                "& .MuiInput-underline:hover:before": {
                  borderBottomColor: "#7000ff",
                },
              }}>
              <MenuItem
                value={2}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "14px",
                  fontWeight: 500,
                }}>
                2
              </MenuItem>
              <MenuItem
                value={3}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "14px",
                  fontWeight: 500,
                }}>
                3
              </MenuItem>
              <MenuItem
                value={4}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "14px",
                  fontWeight: 500,
                }}>
                4
              </MenuItem>
            </Select>
          </FormControl>
        </Box>
      </div>

      {loading ? (
        <div className="loadingSpinner">
          <CircularProgress color="primary" className="load" />
        </div>
      ) : (
        <>
          <ul className="all_product_body">
            {categories.map((category) => (
              <li key={category._id} className="body_card">
                <img src={category.iconLink} alt=" this is a card image" />
                <div className="body_card_text">
                  <p>{category.title}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="all_product_footer">
            <span style={{ marginRight: "20px" }}>
              {`Sahifa ${pageNum} dan ${totalPages} gacha`}
            </span>
            <Stack spacing={2}>
              <Pagination
                count={totalPages}
                page={pageNum}
                onChange={handlePageChange}
                siblingCount={1}
                boundaryCount={1}
              />
            </Stack>
          </div>
        </>
      )}
    </section>
  );
};

export default AllProducts;
