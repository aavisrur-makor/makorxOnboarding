import React, {
  useEffect,
  useLayoutEffect,
  useContext,
  useState,
  useMemo,
} from "react";
import { Grid, makeStyles, Typography, Box } from "@material-ui/core";
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
import InfoPopoverButton from "./InfoPopoverButton";
import Divider from "@material-ui/core/Divider";

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
    "& .MuiOutlinedInput-multiline": {
      padding: "16.5px 14px",
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
  checkBox: {
    "& .MuiCheckbox-colorSecondary.Mui-checked": {
      color: "#3E2F71",
    },
    "& .MuiIconButton-colorSecondary": {
      color: "#3E2F71",
    },
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
        `${BASE_URL}${END_POINT.UTILS}${END_POINT.ASSETS}${authState.companyForProducts}`
      )
      .then((res) => {
        const newProducts = {};
        res.data.forEach((product) => {
          if (!newProducts[product.asset_name]) {
            newProducts[product.asset_name] = {
              uuids: [product.uuid],
              mode_names: [product.mode_name],
            };
          } else {
            newProducts[product.asset_name].uuids.push(product.uuid);
            newProducts[product.asset_name].mode_names.push(product.mode_name);
          }
        });

        const productArray = [];
        for (const asset_name of Object.keys(newProducts)) {
          productArray.push({ asset_name, ...newProducts[asset_name] });
        }

        setProducts(productArray);
      });
  }, [authState.companyForProducts, authState.currentCountry]);

  useLayoutEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  const handleChange = (e, product) => {
    console.log(
      "🚀 ~ file: PseudoForm.js ~ line 122 ~ handleChange ~ e, type, product, i",
      e.target.value,

      product
    );

    setFieldState((prev) => {
      console.log(
        "🚀 ~ file: PseudoForm.js ~ line 131 ~ setFieldState ~ prev",
        prev.onboarding_has_company_asset,
        e.target.value
      );
      const index = prev.onboarding_has_company_asset.findIndex(
        (clientProduct) => clientProduct === product.uuids[0]
      );

      if (index === -1) {
        return {
          ...prev,
          onboarding_has_company_asset: [
            ...prev.onboarding_has_company_asset,
            ...product.uuids,
          ],
        };
      } else
        return {
          ...prev,
          onboarding_has_company_asset:
            prev.onboarding_has_company_asset.filter((checkedProduct) => {
              return (
                checkedProduct !== product.uuids[0] &&
                checkedProduct !== product.uuids[1]
              );
            }),
        };
    });

    e.preventDefault();

    const field = {
      fieldToUpdate: {
        field: e.target.id,
        value: product.uuids,
        asset_name: product.asset_name,
        is_add: e.target.checked,
      },
    };
    axios
      .put(`${BASE_URL}${END_POINT.ONBOARDING}${authState.uuid}`, field)
      .then((res) => {})
      .catch((err) => console.log(err));
  };

  const showStates = useMemo(
    () =>
      authState.currentCountry === "United States" ||
      fieldState.country_id === "United States",
    [fieldState]
  );

  return (
    <Grid container direction="column" className={classes.root} spacing={3}>
      <Grid item xs={11}>
        {!props.query && (
          <Typography className={classes.titleText} variant="body1">
            Info
          </Typography>
        )}
      </Grid>
      <Grid item>
        <Grid container spacing={3}>
          <Grid md={6} xs={12} item>
            <CustomAutoComplete
              isRequired={formData.form1.grid1[0].isRequired}
              label={formData.form1.grid1[0].label}
              dataKey={formData.form1.grid1[0].label}
              id={formData.form1.grid1[0].id}
            />
          </Grid>
          <Grid item md={12} xs={12}>
            <Grid container spacing={3}>
              <Grid md={6} xs={12} justifyContent="space-between" item>
                <DispatcherField
                  isRequired={formData.form1.grid1[1].isRequired}
                  value={fieldState[formData.form1.grid1[1].id]}
                  id={formData.form1.grid1[1].id}
                  label={formData.form1.grid1[1].label}
                />
              </Grid>
              <Grid md={6} xs={12} item>
                <DispatcherField
                  isRequired={formData.form1.grid1[2].isRequired}
                  InputProps={{
                    endAdornment: (
                      <InfoPopoverButton info="Legal Entity Identifier" />
                    ),
                  }}
                  value={fieldState[formData.form1.grid1[2].id]}
                  id={formData.form1.grid1[2].id}
                  label={formData.form1.grid1[2].label}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={12}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <DispatcherField
                  isRequired={formData.form1.grid2[0].isRequired}
                  value={fieldState[formData.form1.grid2[0].id]}
                  id={formData.form1.grid2[0].id}
                  label={formData.form1.grid2[0].label}
                />
              </Grid>
              <Grid item xs={12} md={showStates ? 3 : 6}>
                <CustomAutoComplete
                  label={formData.form1.grid2[1].label}
                  dataKey={formData.form1.grid2[1].label}
                  id={formData.form1.grid2[1].id}
                />
              </Grid>
              {showStates && (
                <Grid item xs={12} md={showStates ? 6 : 3}>
                  <CustomAutoComplete
                    label={formData.form1.grid2[2].label}
                    dataKey={formData.form1.grid2[2].label}
                    id={formData.form1.grid2[2].id}
                  />
                </Grid>
              )}
            </Grid>
          </Grid>
          <Grid item xs={12} md={12}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <CustomAutoComplete
                  label={formData.form1.grid3[0].label}
                  dataKey={formData.form1.grid3[0].label}
                  id={formData.form1.grid3[0].id}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <DispatcherField
                  isRequired={formData.form1.grid3[1].isRequired}
                  value={fieldState[formData.form1.grid3[1].id]}
                  id={formData.form1.grid3[1].id}
                  label={formData.form1.grid3[1].label}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={12}>
            <DispatcherField
              isRequired={formData.form1.grid3[2].isRequired}
              value={fieldState[formData.form1.grid3[2].id]}
              id={formData.form1.grid3[2].id}
              label={formData.form1.grid3[2].label}
              multiline
              rows={9}
            />
            <Divider style={{ marginTop: "20px" }} />
          </Grid>

          <Grid item md={12}>
            <Grid container>
              <Grid xs={12} item md={12}>
                <Typography>Assets</Typography>
              </Grid>
              <Grid item xs={12} md={12}>
                {products.map((product, i) => {
                  return (
                    <Box
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <FormControlLabel
                        className={classes.checkBox}
                        style={{ display: "flex", alignItems: "center" }}
                        control={
                          <Checkbox
                            key={formData.form1.grid3[3].id}
                            id={formData.form1.grid3[3].id}
                            value={product.asset_name}
                            checked={product.uuids.every((val) =>
                              fieldState.onboarding_has_company_asset.includes(
                                val
                              )
                            )}
                            onChange={(e) => handleChange(e, product)}
                          />
                        }
                        label={
                          <Typography style={{ textTransform: "capitalize" }}>
                            {product.asset_name}
                          </Typography>
                        }
                        id={formData.form1.grid3[3].id}
                      />
                      <Typography>
                        ({product.mode_names.map((mode) => mode).join("/")})
                      </Typography>
                    </Box>
                  );
                })}
                <Divider style={{ marginTop: "20px" }} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={12}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12}>
                <Typography>Contact Info</Typography>
              </Grid>
              <Grid item xs={12} md={12}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={4}>
                    <CustomAutoComplete
                      label={formData.form1.grid3[4].label}
                      dataKey={formData.form1.grid3[4].label}
                      id={formData.form1.grid3[4].id}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <DispatcherField
                      isRequired={formData.form1.grid3[5].isRequired}
                      value={fieldState[formData.form1.grid3[5].id]}
                      id={formData.form1.grid3[5].id}
                      label={formData.form1.grid3[5].label}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <DispatcherField
                      isRequired={formData.form1.grid3[6].isRequired}
                      value={fieldState[formData.form1.grid3[6].id]}
                      id={formData.form1.grid3[6].id}
                      label={formData.form1.grid3[6].label}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
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
