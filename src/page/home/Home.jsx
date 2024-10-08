import "./Home.scss";
import Table1 from "../../components/table/Table";
import { useCallback, useEffect, useState } from "react";
import useSearchStore from "../../store/useSearchStore";
import debounce from "lodash.debounce";
import Loading from "../../components/loader/Loading";
import { IoSearch } from "react-icons/io5";
import { useTranslation } from "react-i18next";
import LazyLoad from "../../components/slider/ModalCarousel";

const notfound = "/assets/img/noProduct.jpg";
const Home = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [searched, setSearched] = useState(false);
  const [showImage, setShowImage] = useState(false);

  const { products, loading, fetchProducts, setSearchText } = useSearchStore(
    (state) => ({
      loading: state.loading,
      products: state.products,
      fetchProducts: state.fetchProducts,
      setSearchText: state.setSearchText,
    })
  );

  // Qidiruv uchun debounce funksiyasi
  const debouncedFetchProducts = useCallback(
    debounce((value) => {
      setSearchText(value);
      fetchProducts(value, 1);
      setSearched(true);
      setShowImage(false);
    }, 500),
    [setSearchText, fetchProducts]
  );

  useEffect(() => {
    if (searchTerm.trim()) {
      debouncedFetchProducts(searchTerm);
    } else {
      setSearched(false);
    }
    return () => {
      debouncedFetchProducts.cancel();
    };
  }, [searchTerm, debouncedFetchProducts]);

  useEffect(() => {
    if (searched && products.length === 0) {
      const timer = setTimeout(() => {
        setShowImage(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [searched, products]);

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
  };

  return (
    <div className="content">
      <section className="content_header">
        <div className="items">
          <div className="item">
            <label htmlFor="search">
              <IoSearch />
            </label>
            <input
              type="search"
              id="search"
              onChange={handleSearchChange}
              value={searchTerm}
              placeholder={t("searching")}
            />
          </div>
        </div>
      </section>
      <LazyLoad />

      <section className="content_body">
        {loading ? (
          <Loading />
        ) : searched && products.length === 0 && showImage ? (
          <div className="no_product">
            <img src={notfound} alt="No product found" />
          </div>
        ) : (
          products && products.length > 0 && <Table1 products={products} />
        )}
      </section>
    </div>
  );
};

export default Home;
