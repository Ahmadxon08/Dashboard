/* eslint-disable react/no-unescaped-entities */
import PropTypes from "prop-types";
import Table from "react-bootstrap/Table";

const ProductTable = ({ categories }) => {
  return (
    <Table bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Image</th>
          <th>Title</th>
          <th>Rating</th>
          <th>Price</th>
          <th>Order</th>
          <th className="des">Description</th>
        </tr>
      </thead>
      <tbody>
        {categories.map((category, index) => (
          <tr key={category._id || index}>
            <td>{index + 1}</td>
            <td className="imgt">
              <img src={category.photo} alt="photo" />
            </td>
            <td className="title">{category.category.title}</td>
            <td>{category?.rating || 0}</td>
            <td>{category.skuList[0]?.fullPrice || "N/A"} so'm</td>
            <td>{category.ordersAmount || "N/A"}</td>
            <td className="des">
              {category.description.slice(0, 160) || "N/A"}...
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

ProductTable.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      ordersAmount: PropTypes.number.isRequired,
      someOtherField: PropTypes.string,
      anotherField: PropTypes.string,
    })
  ).isRequired,
};

export default ProductTable;
