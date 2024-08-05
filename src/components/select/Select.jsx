import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
const Select1 = () => {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
          Languages
        </InputLabel>
        <NativeSelect
          defaultValue={30}
          inputProps={{
            name: "age",
            id: "uncontrolled-native",
          }}>
          <option value={10}>Russian</option>
          <option value={20}>China</option>
          <option value={30}>Uzbek</option>
        </NativeSelect>
      </FormControl>
    </Box>
  );
};

export default Select1;
