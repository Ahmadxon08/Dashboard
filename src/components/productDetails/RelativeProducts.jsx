import { useEffect } from "react";
import useRelativeStore from "../../store/useRelativeStore";
import Loading from "../loader/Loading";
import { Link } from "react-router-dom";
import "./RelativeProducts.scss";
import { useTranslation } from "react-i18next";

const RelativeProducts = () => {
  const { t } = useTranslation();
  const { products, selectedCategoryId, loading, fetchProductsByTypeId } =
    useRelativeStore((state) => ({
      fetchProductsByTypeId: state.fetchProductsByTypeId,
      products: state.products,
      selectedCategoryId: state.selectedCategoryId,
      loading: state.loading,
    }));

  useEffect(() => {
    const fetchRelativeProducts = async () => {
      await fetchProductsByTypeId();
    };

    fetchRelativeProducts();
  }, [fetchProductsByTypeId]);

  console.log("id for relative", selectedCategoryId);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <h1
            style={{
              fontSize: "30px",
              fontWeight: "bold",
              marginBottom: "20px",
              marginTop: "20px",
              marginLeft: "20px",
              display: "inline-block",
            }}>
            {t("similars")}
          </h1>
          <h1>Total {products.total}</h1>

          <div className="relativeCards">
            {products.payLoad &&
              products?.payLoad.map((product) => (
                <div key={product.id} className="cardRelative">
                  <Link to={`/product/${product.id}`}>
                    <img
                      src={product.photo}
                      alt={product.title}
                      style={{
                        width: "100%",
                        height: "200px",
                        objectFit: "cover",
                      }}
                    />
                  </Link>
                  <div className="textR">
                    <h2>{product.title}</h2>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default RelativeProducts;
