import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const useEye = () => {
  const [visible, setVisible] = useState(false);
  const [eye1, setEye1] = useState(false);
  const [eye2, setEye2] = useState(false);

  const toggleVisibility = (e) => {
    e.stopPropagation();

    setVisible(!visible);
  };
  const toggleEye1 = (e) => {
    e.stopPropagation();
    setEye1(!eye1);
  };
  const toggleEye2 = (e) => {
    e.stopPropagation();
    setEye2(!eye2);
  };
  const icon = (
    <span onClick={toggleVisibility} style={{ cursor: "pointer" }}>
      {visible ? (
        <FaEye color="#000" size={22} />
      ) : (
        <FaEyeSlash color="#000" size={22} />
      )}
    </span>
  );
  const icon1 = (
    <span onClick={toggleEye1} style={{ cursor: "pointer" }}>
      {eye1 ? (
        <FaEye color="#000" size={22} />
      ) : (
        <FaEyeSlash color="#000" size={22} />
      )}
    </span>
  );
  const icon2 = (
    <span onClick={toggleEye2} style={{ cursor: "pointer" }}>
      {eye2 ? (
        <FaEye color="#000" size={22} />
      ) : (
        <FaEyeSlash color="#000" size={22} />
      )}
    </span>
  );

  const inputType1 = eye1 ? "text" : "password";

  const inputType = visible ? "text" : "password";

  const inputType2 = eye2 ? "text" : "password";

  return {
    inputType,
    inputType1,
    inputType2,
    icon,
    icon1,
    icon2,
  };
};

export default useEye;
