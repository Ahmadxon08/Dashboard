import { MenuItem, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import { useTranslation } from "react-i18next";
import { useState } from "react";

const Select1 = () => {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language || "en");

  const handleChange = (e) => {
    const selectedLanguage = e.target.value;
    i18n.changeLanguage(selectedLanguage);
    setLanguage(selectedLanguage);
    localStorage.setItem("changeLg", selectedLanguage);
  };

  const languages = [
    {
      value: "en",
      label: "English",
    },
    {
      value: "ru",
      label: "Russian",
    },
    {
      value: "uz",
      label: "Uzbek",
    },
  ];

  return (
    <Box sx={{ minWidth: 120 }}>
      <TextField
        id="standard-select-language"
        select
        label="Languages"
        value={language}
        onChange={handleChange}
        variant="standard"
        sx={{
          minWidth: 120,
          color: "#7000ff",
          "& .MuiInput-underline:before": {
            borderBottomColor: "#7000ff",
          },
          "& .MuiInput-underline:hover:before": {
            borderBottomColor: "#7000ff",
          },
        }}>
        {languages.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
};

export default Select1;
