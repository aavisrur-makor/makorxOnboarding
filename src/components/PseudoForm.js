import React, { useEffect, useLayoutEffect, useContext, useState } from "react";
import { Grid, makeStyles, Typography } from "@material-ui/core";
import DispatcherField from "./DispatcherField";
import formData from "../data/formData";
import {
  TextField,
  Checkbox,
  FormControlLabel,
  withStyles,
} from "@material-ui/core";
import FieldContext from "../context/fields";
import AuthContext from "../context/auth";
import CustomAutoComplete from "./CutomAutoComplete";
import axios from "axios";
import { BASE_URL, END_POINT } from "../constant";
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
  const { authState } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const { steps } = props;
  const classes = useStyles();

  useEffect(() => {
    axios
      .get(
        `${BASE_URL}${END_POINT.UTILS}${END_POINT.assets}${authState.companyForProducts}`
      )
      .then((res) => {
        console.log("product DETAILS", res);
        setProducts(res.data);
      });
  }, [authState.companyForProducts]);
  useLayoutEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  const handleChange = (e, type, product, i) => {
    setFieldState((prev) => {
      const index = prev.onboarding_has_company_entity_asset.findIndex(
        (str) => str === product.name
      );

      if (index === -1) {
        return {
          ...prev,
          onboarding_has_company_entity_asset: [
            ...prev.onboarding_has_company_entity_asset,
            product.name,
          ],
        };
      } else
        return {
          ...prev,
          onboarding_has_company_entity_asset:
            prev.onboarding_has_company_entity_asset.filter(
              (curr_item, curr_index) => {
                return curr_item[curr_index] !== curr_item[index];
              }
            ),
        };
    });

    e.preventDefault();
    if (type === "checkboxArray") {
      const field = {
        fieldToUpdate: {
          field: e.target.id,
          value: product.name,
          isAdd: e.target.checked,
        },
      };
      axios
        .put(`${BASE_URL}${END_POINT.onboarding}${authState.uuid}`, field)
        .then((res) => {})
        .catch((err) => console.log(err));
    } else if (type === "") {
    } else
      setFieldState((prev) => ({
        ...prev,
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
    } else if (type === "auto-complete") {
      component = <CustomAutoComplete label={label} dataKey={label} id={id} />;
    } else if (type === "checkboxArray") {
      component = products.map((product, i) => {
        return (
          <FormControlLabel
            style={{ display: "flex" }}
            control={
              <Checkbox
                key={id}
                id={id}
                value={product.name}
                checked={fieldState.onboarding_has_company_entity_asset.includes(
                  product.name
                )}
                onChange={(e) => handleChange(e, type, product, i)}
              />
            }
            label={product.name}
            labelPlacement="right"
            id={id}
          />
        );
      });
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
    color: "#6d6d6d",
    textAlign: "center",
  },
}))(TextField);
