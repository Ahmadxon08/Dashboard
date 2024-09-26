import { MenuItem, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import useSearchStore from "../../store/useSearchStore";
import useMenuStore from "../../store/useMenuStore";
import useCategoryStore from "../../store/useCategoryStore";
import { useParams } from "react-router-dom";
import debounce from "lodash.debounce";

// Rasm yo'llari
const flags = {
  en: "/assets/img/en.png",
  uz: "/assets/img/uz.png",
  zh: "/assets/img/china.png",
  ru: "/assets/img/ru.png",
};

const fallbackImage = "/assets/img/default.png"; // Zahira rasm

const Select1 = () => {
  const { i18n, t } = useTranslation();
  const { id } = useParams();
  const [language, setLanguage] = useState(
    localStorage.getItem("changeLg") || i18n.language || "en"
  );

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

  const { fetchGrandParents, setActiveButton, fetchParents } = useMenuStore();
  const { fetchProducts } = useSearchStore();

  useEffect(() => {
    const storedLanguage = localStorage.getItem("changeLg");
    if (storedLanguage && ["en", "uz", "zh", "ru"].includes(storedLanguage)) {
      i18n.changeLanguage(storedLanguage);
      setLanguage(storedLanguage);
    }
  }, [i18n]);

  const handleLanguageChange = (e) => {
    const newLanguage = e.target.value;
    i18n.changeLanguage(newLanguage);
    localStorage.setItem("changeLg", newLanguage);
    setLanguage(newLanguage);
    fetchData();
  };

  const fetchData = debounce(async () => {
    try {
      await Promise.all([
        fetchGrandParents(language),
        fetchParents(selectedGrandParentId, language),
        fetchProductsByCategoryId(selectedParentId, language),
        fetchProductDetails(id, language),
      ]);
    } catch (error) {
      console.error("Ma'lumotlarni olishda xato:", error);
    }
  }, 300);

  useEffect(() => {
    fetchProducts("", 1);
    fetchData();
  }, [language, selectedGrandParentId, selectedParentId, id]);

  useEffect(() => {
    const storedButton = localStorage.getItem("activeButton");
    if (storedButton) {
      setActiveButton(storedButton);
    }
  }, [i18n.language, setActiveButton]);

  const languages = [
    { value: "en", label: "English", icon: flags.en },
    { value: "uz", label: "Uzbek", icon: flags.uz },
    { value: "zh", label: "Chinese", icon: flags.zh },
    { value: "ru", label: "Russian", icon: flags.ru },
  ];

  // Rasm yuklanmaganida zahira rasm qo'shish funksiyasi
  const handleImageError = (e) => {
    e.target.src = fallbackImage;
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <TextField
        id="language-select"
        select
        label={t("dialog.languages")}
        value={language}
        onChange={handleLanguageChange}
        variant="standard"
        sx={{
          minWidth: 120,
          color: "#7000ff",
          "& .MuiInputLabel-root": { color: "#7000ff" },
          "& .MuiInputLabel-root.Mui-focused": { color: "#7000ff" },
          "& .MuiInput-underline:before": { borderBottomColor: "#7000ff" },
          "& .MuiInput-underline:hover:before": {
            borderBottomColor: "#7000ff",
          },
          "& .MuiInput-underline:after": { borderBottomColor: "#7000ff" },
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
        {languages.map(({ value, label, icon }) => (
          <MenuItem
            key={value}
            value={value}
            sx={{ display: "flex", alignItems: "center" }}>
            <img
              src={icon}
              alt={`${label} flag`}
              width={22}
              height={29}
              style={{ verticalAlign: "middle" }}
              onError={handleImageError} // Agar rasm yuklanmasa zahira rasmga o'tadi
            />
            <span style={{ marginLeft: "10px", textTransform: "capitalize" }}>
              {label}
            </span>
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
};

export default Select1;
