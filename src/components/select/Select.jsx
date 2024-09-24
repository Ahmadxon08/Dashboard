import { MenuItem, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import useSearchStore from "../../store/useSearchStore";
import useMenuStore from "../../store/useMenuStore";
import useCategoryStore from "../../store/useCategoryStore";
import { useParams } from "react-router-dom";

// Til flaglari
const ru = "assets/img/ru.png";
const en = "assets/img/en.png";
const uz = "assets/img/uz.png";
const china = "assets/img/china.png";

const Select1 = () => {
  const { i18n } = useTranslation();
  const { id } = useParams();

  // default tilni "en" ga o'rnatamiz
  const [language, setLanguage] = useState(i18n.language || "en");

  // localStorage dan saqlangan tilni olish
  useEffect(() => {
    const savedLanguage = localStorage.getItem("changeLg");
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
      setLanguage(savedLanguage);
    } else {
      i18n.changeLanguage(language);
    }
  }, []);

  useEffect(() => {
    const storedLanguage = localStorage.getItem("changeLg");

    // faqat mavjud qiymatlar uchun
    if (storedLanguage && ["en", "uz", "zh", "ru"].includes(storedLanguage)) {
      setLanguage(storedLanguage);
    } else {
      setLanguage("en"); // Agar xato bo'lsa, default til
    }
  }, []);

  const handleChange = (e) => {
    const selectedLanguage = e.target.value;

    // i18n ga yangi tilni o'rnatish
    i18n.changeLanguage(selectedLanguage);

    // Local storage ga saqlash
    setLanguage(selectedLanguage);
    localStorage.setItem("changeLg", selectedLanguage);

    // API chaqiruvlarini bajarish
    fetchGrandParents(selectedLanguage);
    fetchParents(selectedGrandParentId, selectedLanguage);
    fetchProductsByCategoryId(selectedParentId, selectedLanguage);
    fetchProductDetails(id, selectedLanguage);
  };

  useEffect(() => {
    setLanguage(i18n.language);
  }, [i18n.language]);

  // Store dan kerakli qiymatlarni olish
  const {
    selectedGrandParentId,
    fetchProductDetails,
    selectedParentId,
    fetchProductsByCategoryId,
  } = useCategoryStore((state) => ({
    fetchProductDetails: state.fetchProductDetails,
    selectedParentId: state.selectedParentId,
    selectedGrandParentId: state.selectedGrandParentId,
    fetchProductsByCategoryId: state.fetchProductsByCategoryId,
  }));

  const { fetchGrandParents, setActiveButton, fetchParents } = useMenuStore(
    (state) => ({
      fetchParents: state.fetchParents,
      fetchGrandParents: state.fetchGrandParents,
      setActiveButton: state.setActiveButton,
    })
  );

  const { fetchProducts } = useSearchStore((state) => ({
    fetchProducts: state.fetchProducts,
  }));

  // Mahsulotlarni boshlang'ich til bilan yuklash
  useEffect(() => {
    fetchProducts("", 1);
  }, [language, fetchProducts]); // Til o'zgarganda qayta chaqirish
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetching all data in parallel
        await Promise.all([
          fetchGrandParents(language),
          fetchParents(selectedGrandParentId, language),
          fetchProductsByCategoryId(selectedParentId, language),
          fetchProductDetails(id, language),
        ]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [
    language,
    selectedGrandParentId,
    selectedParentId,
    id,
    fetchGrandParents,
    fetchParents,
    fetchProductsByCategoryId,
    fetchProductDetails,
  ]);

  //////////////Change active button name
  useEffect(() => {
    const storedButton = localStorage.getItem("activeButton");
    if (storedButton) {
      setActiveButton(storedButton);
    }
  }, [i18n.language, setActiveButton]);
  // Tillarning ro'yxati
  const languages = [
    { icon: en, value: "en", label: "English" },
    { icon: uz, value: "uz", label: "Uzbek" },
    { icon: china, value: "zh", label: "Chinese" },
    { icon: ru, value: "ru", label: "Russian" },
  ];

  return (
    <Box sx={{ minWidth: 120 }}>
      <TextField
        id="standard-select-language"
        select
        label="Languages"
        value={language} // Tanlangan til
        onChange={handleChange} // O'zgarishlarni boshqarish
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
              "& img": {
                objectFit: "contain",
              },
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
