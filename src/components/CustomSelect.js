import * as React from "react";
import Box from "@material-ui/core/Box";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { useContext } from "react";
import FieldContext from "../context/fields";
import AuthContext from "../context/auth";

const CustomSelect = (props) => {
  const { fieldState, setFieldState } = useContext(FieldContext);
  const { authState, setAuthState } = useContext(AuthContext);
  React.useEffect(() => {
    console.log(
      "🚀 ~ file: CustomSelect.js ~ line 15 ~ CustomSelect ~ fieldState[props.id",
      fieldState[props.id],
      props.id
    );
  }, []);

  console.log(props.id);
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth variant="outlined">
        <InputLabel id="demo-simple-select-label">{props.label}</InputLabel>
        <Select
          labelId={props.id}
          id={props.id}
          name={props.id}
          value={fieldState[props.id]}
          label={fieldState[props.id]}
          onChange={props.handleChange}
        >
          {props.options.map((option) => {
            return <MenuItem value={option.value}>{option.label}</MenuItem>;
          })}
        </Select>
      </FormControl>
    </Box>
  );
};
export default CustomSelect;
