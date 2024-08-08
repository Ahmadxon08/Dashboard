import { MenuItem, TextField } from "@mui/material";
import Box from "@mui/material/Box";
// import InputLabel from "@mui/material/InputLabel";
// import FormControl from "@mui/material/FormControl";
// import NativeSelect from "@mui/material/NativeSelect";

const currencies = [
  {
    value: "English",
    label: "English",
  },
  {
    value: "Russian",
    label: "Russian",
  },
  {
    value: "Uzbek",
    label: "Uzbek",
  },
  // Add more languages as needed
];
const Select1 = () => {
  return (
    <Box sx={{ minWidth: 120 }}>
      <TextField
        id="standard-select-currency"
        select
        label="Languages"
        defaultValue="English"
        variant="standard">
        {currencies.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
};

export default Select1;
