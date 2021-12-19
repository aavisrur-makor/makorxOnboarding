import React, { useContext, useEffect, useState } from "react";
import { TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { withStyles } from "@material-ui/core";
import axios from "axios";
import AuthContext from "../context/auth";
import FieldContext from "../context/fields";
import { Email } from "@material-ui/icons";
import { BASE_URL, END_POINT } from "../constant";

const CustomAutoComplete = (props) => {
  const [data, setData] = useState([]);
  const { fieldState } = useContext(FieldContext);
  const [dataState, setDataState] = useState({});
  const [dataStateInput, setDataStateInput] = useState("");
  const { authState, setAuthState } = useContext(AuthContext);

  useEffect(async () => {
    const dataType = await axios.get(
      `${BASE_URL}${END_POINT.UTILS}${props.dataKey}`
    );
    console.log("THE DATA TYPE", props.dataKey, dataType);
    setData(dataType.data);
    setDataState(fieldState[props.id]);
    setDataStateInput(fieldState[props.id]);
  }, [fieldState[props.id]]);

  const handleChange = (e) => {
    let field = {};
    setDataState(e);
    if (props.dataKey === "Company") {
      setAuthState((prev) => ({
        ...prev,
        companyForProducts: e && e.uuid,
      }));
    }

    if (e) {
      field = {
        fieldToUpdate: {
          field: props.id,
          value: e && e.name,
        },
      };
    } else if (e === null) {
      field = {
        fieldToUpdate: {
          field: props.id,
          value: null,
        },
      };
    }

    axios
      .put(`${BASE_URL}${END_POINT.onboarding}${authState.uuid}`, field)
      .then((res) => {})
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <StyledAutoComplete
      id={props.label}
      autoComplete="off"
      fullWidth
      value={dataState}
      onClose={(e) => {
        console.log(e);
      }}
      className={props.className}
      label={props.label}
      options={data}
      autoHighlight
      getOptionLabel={(option) => option.name || ""}
      loadingText={props.label}
      onChange={(e, value) => handleChange(value, e)}
      onInputChange={(e, inputValue) => setDataStateInput(inputValue)}
      inputValue={dataStateInput || ""}
      renderInput={(params) => (
        <StyledTextFieldCountry
          {...params}
          disableOutline
          variant="outlined"
          label={props.label}
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
