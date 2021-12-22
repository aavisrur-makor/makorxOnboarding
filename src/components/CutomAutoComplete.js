import React, { useContext, useEffect, useState } from "react";
import { TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { withStyles } from "@material-ui/core";
import axios from "axios";
import AuthContext from "../context/auth";
import FieldContext from "../context/fields";
import { BASE_URL, END_POINT } from "../constant";
import validate from "../utils/validate";

const CustomAutoComplete = (props) => {
  const [data, setData] = useState([]);
  const { fieldState, setFieldState } = useContext(FieldContext);
  const [error, setError] = useState("");
  const [dataState, setDataState] = useState({});
  const [dataStateInput, setDataStateInput] = useState("");
  const { authState, setAuthState } = useContext(AuthContext);

  useEffect(async () => {
    console.log("THE PROPS IS", props.id);
    const dataType = await axios.get(
      `${BASE_URL}${END_POINT.UTILS}${props.dataKey}`
    );
    console.log(
      "THIS IS THE DATA I GET FROM THE USEEFFECT AUTO COMPLETE ",
      dataType
    );

    // const choosenData = dataType.data.filter((data) => {
    //   return data.id === fieldState.company_id;
    // });

    const currentData = {};
    dataType.data.forEach(({ name, id }) => {
      currentData[id] = name;
    });

    setData(dataType.data);
    setDataState(currentData[fieldState[props.id]]);
    setDataStateInput(currentData[fieldState[props.id]]);
  }, [fieldState[props.id]]);

  const handleChange = (e) => {
    let field = {};
    setDataState(e);
    if (props.dataKey === "Company") {
      setFieldState((prev) => ({
        ...prev,
        checked_assets: [],
      }));
      setAuthState((prev) => ({
        ...prev,
        companyForProducts: e && e.id,
      }));
    } else if (props.dataKey === "Country") {
      setAuthState((prev) => ({
        ...prev,
        currentCountry: e && e.name,
      }));
    }

    if (e) {
      console.log("THIS IS THE E", e);
      field = {
        [props.id]: e && e.id,
      };
    } else if (!e) {
      field = {
        [props.id]: null,
      };
    }

    axios
      .put(`${BASE_URL}${END_POINT.ONBOARDING}${authState.uuid}`, field)
      .then((res) => {})
      .catch((error) => {
        console.log(error);
      });
  };

  const handleInputChange = (e, inputValue) => {
    setDataStateInput(inputValue);
    validate(null, inputValue, setError);
  };

  return (
    <StyledAutoComplete
      id={props.label}
      disableClearable
      fullWidth
      value={dataState || ""}
      className={props.className}
      label={props.label}
      options={data}
      autoHighlight
      getOptionLabel={(option) => option.name || ""}
      loadingText={props.label}
      onChange={(e, value) => handleChange(value, e)}
      onInputChange={(e, inputValue) => handleInputChange(e, inputValue)}
      inputValue={dataStateInput || ""}
      renderInput={(params) => (
        <StyledTextFieldCountry
          {...params}
          variant="outlined"
          label={props.label}
          error={!!error}
          helperText={error && "Field is empty."}
          inputProps={{
            ...params.inputProps,
            autoComplete: "new-password", // disable autocomplete and autofill
          }}
        />
      )}
    />
  );
};
export default CustomAutoComplete;

export const StyledAutoComplete = withStyles((theme) => ({}))(Autocomplete);

export const StyledTextFieldCountry = withStyles((theme) => ({
  root: {
    color: "white",
  },
}))(TextField);
