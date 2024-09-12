import { TextField } from "@mui/material";
import "./Home.scss";
import Table1 from "../../components/table/Table";
import { useCallback, useEffect, useState } from "react";
import useSearchStore from "../../store/useSearchStore";
import debounce from "lodash.debounce";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  // const navigate = useNavigate();

  const {
    products,

    fetchProducts,

    setSearchText,
  } = useSearchStore((state) => ({
    totals: state.totals,
    products: state.products,
    openSearch: state.openSearch,
    fetchProducts: state.fetchProducts,
    handleSearchClose: state.handleSearchClose,
    setSearchText: state.setSearchText,
  }));

  // Using useCallback to debounce the fetchProducts method
  const debouncedFetchProducts = useCallback(
    debounce((value) => {
      setSearchText(value);
      fetchProducts(value, 1);
    }, 500),
    [setSearchText, fetchProducts]
  );

  useEffect(() => {
    if (searchTerm.trim()) {
      debouncedFetchProducts(searchTerm);
    }
    // Clean up debounce
    return () => {
      debouncedFetchProducts.cancel();
    };
  }, [searchTerm, debouncedFetchProducts]);

  // const handleClose = () => {
  //   setSearchTerm("");
  //   handleSearchClose();
  // };

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
  };

  console.log(products);

  return (
    <div className="content">
      <section className="content_header">
        <div className="items">
          <div className="item">
            <span>Search Product</span>
            <TextField
              type="search"
              className="input"
              label="Search..."
              id="filled-basic"
              variant="filled"
              value={searchTerm}
              onChange={handleSearchChange}
              InputProps={{
                style: {
                  width: "100%",
                  height: "40px",
                },
              }}
            />
          </div>
        </div>
      </section>
      <section className="content_body">
        <Table1 products={products} /> {/* Mahsulotlar jadvalda ko'rsatiladi */}
      </section>
    </div>
  );
};

export default Home;
