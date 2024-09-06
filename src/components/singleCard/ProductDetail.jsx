import { useParams } from "react-router-dom";
import { useEffect } from "react";
import useCategoryStore from "../../store/useCategoryStore";

const ProductDetail = () => {
  const { id } = useParams();
  const { products, fetchProductsByCategoryId, loading, error } =
    useCategoryStore((state) => ({
      products: state.products,
      fetchProductsByCategoryId: state.fetchProductsByCategoryId,
      loading: state.loading,
      error: state.error,
    }));

  useEffect(() => {
    fetchProductsByCategoryId(id);
  }, [id, fetchProductsByCategoryId]);

  // Ensure products is an array before using .find
  const product = Array.isArray(products)
    ? products.find((p) => p._id === id)
    : null;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  if (!product) return <p>Product not found.</p>;

  console.log(product);

  return (
    <div>
      <h1>{product.title}</h1>
      {/* <img src={product.photo} alt={product.title} />
      <p>{product.description}</p>
      <p>Price: {product.skuList[0]?.fullPrice || "N/A"} </p>
      <p>Rating: {product.rating || 0}</p>
      <p>Orders: {product.ordersAmount || "N/A"}</p> */}
    </div>
  );
};

export default ProductDetail;
