import React, { useContext, useEffect, useState } from "react";
import { TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
// import countries from "../data/countries";
import { withStyles } from "@material-ui/core";
import axios from "axios";
import AuthContext from "../context/auth";
import FieldContext from "../context/fields";
import { Email } from "@material-ui/icons";

const CountryAutoComplete = (props) => {
  const [countries, setCountries] = useState([]);
  const { fieldState } = useContext(FieldContext);
  const [countryState, setCountryState] = useState({});
  const [countryStateInput, setCountryStateInput] = useState("");

  useEffect(async () => {
    console.log("COUNTRY IN USEEFFECT", fieldState.country);
    const countriesData = await axios.get(
      "http://10.0.0.191:3030/api/onboarding/country"
    );
    setCountries(countriesData.data);
    setCountryState(fieldState.country);
    setCountryStateInput(fieldState.country);
  }, [fieldState.country]);
  // const { authState } = useContext(AuthContext);
  // const { uuid } = authState;

  const handleChange = (e) => {
    setCountryState(e);
    console.log("value inside the handlechange", e);
    console.log("COUNTRY VALUE", fieldState.country);
    // if (e) {
    //   const fieldToUpdate = {
    //     field: "country",
    //     value: e.name,
    //   };
    //   axios
    //     .put(`http://10.0.0.191:3030/api/onboarding/${uuid}`, fieldToUpdate)
    //     .then((res) => {
    //       console.log("country res", res);
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // }
  };
  // console.log('COUNTRY STATE', countryState);
  // console.log('Country inputState', countryStateInput);
  return (
    <StyledAutoComplete
      id="country"
      autoComplete="off"
      fullWidth
      value={countryState}
      className={props.className}
      label={props.label}
      options={countries}
      autoHighlight
      getOptionLabel={(option) => option.name || ""}
      onChange={(e, value) => props.handleChange(e, value)}
      onInputChange={(e, inputValue) => setCountryStateInput(inputValue)}
      inputValue={countryStateInput || ""}
      renderInput={(params) => (
        <StyledTextFieldCountry
          {...params}
          disableOutline
          label={props.textLabel}
          inputProps={{
            ...params.inputProps,
            autoComplete: "new-password", // disable autocomplete and autofill
          }}
        />
      )}
    />
  );
};
export default CountryAutoComplete;

export const StyledAutoComplete = withStyles((theme) => ({
  root: {
    color: "#6d6d6d",

    background: "0% 0% no-repeat padding-box",

    border: "1px solid #B9C6CD",

    opacity: "1",

    "& .MuiInputLabel-formControl": {
      top: "50%",

      transform: "translateY(calc(-65%))",
    },

    "& .MuiButtonBase-root": {
      transform: "translate(-20px,-3px)",
    },
    [theme.breakpoints.down("md")]: {
      "& .MuiButtonBase-root": {
        transform: "translate(-20px,-6px)",
      },
      "& .MuiInputLabel-formControl": {
        top: "50%",

        transform: "translateY(calc(-80%))",
      },
    },
  },

  inputRoot: {
    color: "black",
  },

  paper: {
    color: "black",
  },

  popper: {
    color: "white",
  },
}))(Autocomplete);

export const StyledTextFieldCountry = withStyles((theme) => ({
  root: {
    color: "white",
  },
}))(TextField);
