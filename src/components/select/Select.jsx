import { MenuItem, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import { useTranslation } from "react-i18next";
import { useState } from "react";
const ru = "assets/img/ru.png";
const en = "assets/img/en.png";
const uz = "assets/img/uz.png";
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
          "& .MuiInputLabel-root": {
            color: "#7000ff",
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "#7000ff",
          },
          "& .MuiInput-underline:before": {
            borderBottomColor: "#7000ff", // Pastki chiziq rangi oddiy holatda
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
