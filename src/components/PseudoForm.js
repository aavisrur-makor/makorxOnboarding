import React, { useEffect, useLayoutEffect, useContext } from "react";
import { Grid, makeStyles, Typography } from "@material-ui/core";
import DispatcherField from "./DispatcherField";
import formData from "../data/formData";
import {
  TextField,
  Checkbox,
  FormControlLabel,
  withStyles,
} from "@material-ui/core";
import CountryAutoComplete from "./CountryAutoComplete";
import FieldContext from "../context/fields";
import CustomSelect from "./CustomSelect";
import countries from "../data/countries";

// const steps = [
//   "Submit on-boarding documentation",
//   "Attach documents",
//   "Terms of Use",
// ];

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiOutlinedInput-root": {
      borderRadius: 0,
    },
  },
  formControl: {
    "& .MuiFormControl-root": {
      background: "0% 0% no-repeat padding-box",
      border: "none",
      opacity: "1",
    },
  },
  titleText: {
    fontWeight: "bold",
    font: "normal normal bold 24px/29px Cormorant Garamond",
  },
  countryAutoComplete: {
    display: "flex",
    marginTop: "0 !important",
    padding: "1rem 0 0 1rem",
    "& .MuiAutocomplete-root": {
      padding: "15px 0 0 10px",
      [theme.breakpoints.down("md")]: {
        paddingBottom: "11px",
      },
    },
    "& .MuiInputBase-root": {
      marginTop: "0",

      // boxShadow: "inset 0 0 0 1px #B9C6CD",
    },
    "& .MuiInputBase-root::before,& .MuiInputBase-root.Mui-focused::before ": {
      content: "none",
    },
    "& .MuiFormLabel-root": { fontSize: "13px", paddingLeft: "4px" },
    "& .MuiButtonBase-root.MuiIconButton-root.MuiAutocomplete-clearIndicator.MuiAutocomplete-clearIndicatorDirty":
      { display: "none" },
  },
}));

const PseudoForm = function (props) {
  const { fieldState, setFieldState } = useContext(FieldContext);
  const { steps } = props;
  const classes = useStyles();

  useLayoutEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  const handleChange = (e, type) => {
    if (type === "checkbox") {
      console.log(
        "🚀 ~ file: PseudoForm.js ~ line 73 ~ handleChange ~ type",
        e.target.checked,
        e.target.id
      );
      setFieldState((prev) => ({
        ...prev,
        // [e.target[type === "select" ? "name" : "id"]]: e.target.value,
        [e.target.id]: e.target.checked,
      }));
    } else if (type === "") {
    } else
      setFieldState((prev) => ({
        ...prev,
        // [e.target[type === "select" ? "name" : "id"]]: e.target.value,
        [e.target[e.target.name ? "name" : "id"]]: e.target.value,
      }));
  };

  const renderAppropriately = ({ label, id, type }) => {
    let component;
    if (type === "text") {
      component = (
        <DispatcherField
          value={fieldState[id]}
          id={id}
          label={label}
          rows={1}
        />
      );
    } else if (type === "textarea") {
      component = (
        <DispatcherField
          value={fieldState[id]}
          id={id}
          label={label}
          multiline
          rows={9}
        />
      );
    } else if (type === "select") {
      component = (
        <CustomSelect
          options={countries}
          handleChange={(e) => handleChange(e, type)}
          label={label}
          id={id}
        />
      );
    } else if (type === "checkbox") {
      console.log(
        "🚀 ~ file: PseudoForm.js ~ line 117 ~ renderAppropriately ~ fieldState[id]",
        fieldState[id],
        id
      );
      component = (
        <FormControlLabel
          control={
            <Checkbox
              id={id}
              value={fieldState[id]}
              onChange={(e) => handleChange(e, type)}
            />
          }
          label={label}
          labelPlacement="top"
          id={id}
        />
      );
    }
    return (
      <Grid item xs={12} md={6}>
        {component}
      </Grid>
    );
  };

  return (
    <Grid container direction="column" className={classes.root} spacing={3}>
      <Grid item xs={11}>
        {!props.query && (
          <Typography className={classes.titleText} variant="body1">
            On-Boarding Documentation
          </Typography>
        )}
      </Grid>

      <Grid item>
        <Grid container spacing={3}>
          {formData.form1.grid1.map(renderAppropriately)}
        </Grid>
      </Grid>
      <Grid item spacing={3}>
        <Grid container spacing={3}>
          {formData.form1.grid2.map(renderAppropriately)}
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Grid container spacing={3}>
          {formData.form1.grid3.map(renderAppropriately)}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default PseudoForm;

export const StyledTextField = withStyles((theme) => ({
  root: {
    // border: "solid #3F3073",
    color: "#6d6d6d",
    // marginTop: "20px",
    textAlign: "center",
  },
}))(TextField);
