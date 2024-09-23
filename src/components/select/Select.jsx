import { MenuItem, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import useSearchStore from "../../store/useSearchStore";
import useMenuStore from "../../store/useMenuStore";
import useCategoryStore from "../../store/useCategoryStore";
import { useParams } from "react-router-dom";

const ru = "assets/img/ru.png";
const en = "assets/img/en.png";
const uz = "assets/img/uz.png";
// const china = "assets/img/china.png";

const Select1 = () => {
  const { i18n } = useTranslation();
  const { id } = useParams();

  const [language, setLanguage] = useState(i18n.language || "en"); // o'zgarish
  useEffect(() => {
    const savedLanguage = localStorage.getItem("changeLg");
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
      setLanguage(savedLanguage);
    }
  }, []);

  const handleChange = (e) => {
    const selectedLanguage = e.target.value;
    i18n.changeLanguage(selectedLanguage);
    setLanguage(selectedLanguage);
    localStorage.setItem("changeLg", selectedLanguage);
  };

  useEffect(() => {
    setLanguage(i18n.language);
  }, [i18n.language]);

  const {
    selectedGrandParentId,
    fetchProductDetails,
    selectedParentId,
    fetchProductsByCategoryId,
  } = useCategoryStore((state) => ({
    fetchProductDetails: state.fetchProductDetails,
    selectedParentId: state.selectedParentId,
    selectedGrandParentId: state.selectedGrandParentId,
    fetchProductsByCategoryId: state.fetchProductsByCategoryId, // grandparent id ni olish
  }));
  const { fetchGrandParents, fetchParents, grandParents } = useMenuStore(
    (state) => ({
      grandParents: state.grandParents, // grandParents ni olish
      fetchParents: state.fetchParents,
      fetchGrandParents: state.fetchGrandParents,
    })
  );

  const { fetchProducts } = useSearchStore((state) => ({
    fetchProducts: state.fetchProducts,
  }));

  useEffect(() => {
    fetchProducts("", 1);
  }, [language, fetchProducts]); // add language

  useEffect(() => {
    fetchGrandParents(language);
  }, [language, fetchGrandParents]);

  useEffect(() => {
    fetchParents(selectedGrandParentId, language);
  }, [language, selectedGrandParentId, fetchParents]);

  useEffect(() => {
    fetchProductsByCategoryId(selectedParentId, language);
  }, [language, selectedParentId, fetchProductsByCategoryId]);

  useEffect(() => {
    fetchProductDetails(id, language);
  }, [language, id, fetchProductDetails]);

  const languages = [
    {
      icon: en,
      value: "en",
      label: "English",
    },
    { icon: ru, value: "ru", label: "Russian" },
    {
      icon: uz,
      value: "uz",
      label: "Uzbek",
    },
    // {
    //   icon: china,
    //   value: "ch",
    //   label: "Chinese",
    // },
  ];
  console.log(grandParents);

  console.log("id for parent", selectedGrandParentId);

  return (
    <Box sx={{ minWidth: 120 }}>
      <TextField
        id="standard-select-language"
        select
        label="Languages"
        value={language} // to'g'ri qiymat
        onChange={handleChange}
        variant="standard"
        sx={{
          minWidth: 120,
          color: "#7000ff",
          "& .MuiInputLabel-root": {
            color: "#7000ff",
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "#7000ff",
          },
          "& .MuiInput-underline:before": {
            borderBottomColor: "#7000ff",
          },
          "& .MuiInput-underline:hover:before": {
            borderBottomColor: "#7000ff",
          },
          "& .MuiInput-underline:after": {
            borderBottomColor: "#7000ff",
          },
        }}
        SelectProps={{
          MenuProps: {
            PaperProps: {
              sx: {
                "& .MuiMenuItem-root": {
                  display: "flex",
                  alignItems: "center",
                  padding: "8px 16px",
                },
              },
            },
          },
        }}>
        {languages.map((option) => (
          <MenuItem
            key={option.value}
            value={option.value}
            sx={{
              display: "flex",
              alignItems: "center",
              padding: "3px",
            }}>
            <img
              src={option.icon}
              alt={`${option.label} flag`}
              width={22}
              height={29}
              style={{
                objectFit: "center",
                verticalAlign: "middle",
              }}
            />
            <span
              style={{
                fontFamily: "Roboto",
                paddingTop: "6px",
                marginLeft: "10px",
                textTransform: "capitalize",
              }}>
              {option.label}
            </span>
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
};

export default Select1;
