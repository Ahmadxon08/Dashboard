import { Button, Rating } from "@mui/material";
import "./SingleCard.scss";
import { FaArrowLeft } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import useStore from "../../store/useStore";
import StarIcon from "@mui/icons-material/Star";

const SingleCard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products } = useStore((state) => ({
    products: state.products,
  }));
  const product = products.find((item) => item.id === parseInt(id));

  if (!product) {
    return <p>Product not found</p>;
  }

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="single">
      <div className="single_head">
        <Button onClick={handleBackClick} variant="contained">
          <FaArrowLeft size={24} /> Back
        </Button>
        <h2>Product Details</h2>
      </div>
      <div className="singleCard">
        <img src={product.photo} alt={product.title} />
        <div className="single_texts">
          <h3>
            <span>Name: </span>
            {product.title}
          </h3>
          <div className="rating">
            <span>Rating:</span>
            <Rating
              size="large"
              name="product-rating"
              value={product.rating}
              readOnly
              precision={0.5}
              icon={
                <StarIcon
                  style={{ color: "rgb(252, 164, 64)" }}
                  fontSize="inherit"
                />
              }
              emptyIcon={
                <StarIcon
                  style={{ color: "rgb(252, 164, 64)" }}
                  fontSize="inherit"
                />
              }
            />
          </div>
          <h4>
            <span>Full Price:</span> {product.minFullPrice} Sum
          </h4>
          <h5>
            <span>Sell Price:</span> {product.minSellPrice} Sum
          </h5>
        </div>
      </div>
    </div>
  );
};

export default SingleCard;
