import { useState, useEffect } from "react";
import axios from "axios";

const SearchProducts = () => {
  const [categories, setCategories] = useState([]);
  const [pageNum, setPageNum] = useState(2);
  const [pathDepth, setPathDepth] = useState(2);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.post(
          "http://65.1.136.0:5050/api/productsByType",

          { jss: { rating: 5, isEco: false }, pageNum: 2 }
        );

        setCategories(response.data.payLoad);
      } catch (error) {
        console.error("Xatolik yuz berdi:", error);
      }
    };

    fetchCategories();
  }, [pageNum, pathDepth]);
  console.log(categories);

  return (
    <div>
      <h1>Kategoriyalar</h1>

      <label htmlFor="depth-select">Tanlang:</label>
      <select
        id="depth-select"
        value={pathDepth}
        onChange={(e) => setPathDepth(parseInt(e.target.value))}>
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
      </select>

      <ul
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
          listStyle: "none",
          padding: 0,
        }}>
        {categories.map((category, i) => (
          <li key={i}>
            <p>{category.title}</p>
          </li>
        ))}
      </ul>

      <button onClick={() => setPageNum(pageNum + 1)}>Keyingi sahifa</button>
    </div>
  );
};

export default SearchProducts;
