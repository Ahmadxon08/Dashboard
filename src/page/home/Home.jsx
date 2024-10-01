import "./Home.scss";
import Table1 from "../../components/table/Table";
import { useCallback, useEffect, useState } from "react";
import useSearchStore from "../../store/useSearchStore";
import debounce from "lodash.debounce";
import Loading from "../../components/loader/Loading";
import { IoSearch } from "react-icons/io5";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  // const navigate = useNavigate();

  const {
    products,
    loading,
    fetchProducts,

    setSearchText,
  } = useSearchStore((state) => ({
    loading: state.loading,
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
            <label htmlFor="search">
              {" "}
              <IoSearch />
            </label>

            <input
              type="search"
              id="search"
              onChange={handleSearchChange}
              value={searchTerm}
            />
          </div>
        </div>
      </section>
      <section className="content_body">
        {loading ? <Loading /> : <Table1 products={products} />}
      </section>
    </div>
  );
};

export default Home;
