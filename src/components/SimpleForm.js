import React, { useContext, useEffect, useState } from "react";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { styled } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import StyledButton from "../components/StyledButton";
import axios from "axios";
import {
  Modal,
  Typography,
  Snackbar,
  makeStyles,
  FormControl,
} from "@material-ui/core";
import AuthContext from "../context/auth";
import { useStyles } from "../styles/SmallForm";
// import DialPhoneAutoComplete from "./DialPhoneAutoComplete";
import { END_POINT, BASE_URL } from "../constant";
import isEmail from "validator/lib/isEmail";

const SimpleForm = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [dialCode, setDialCode] = useState();
  const [company, setCompany] = useState();
  const [isMailValid, setIsMailValid] = useState(true);
  const { authState, setAuthState } = useContext(AuthContext);
  const classes = useStyles();
  const [isSubmitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      contact_name: name,
      contact_email: [email],
      contact_phone: [
        {
          dialing_code: "972",
          number: phone,
        },
      ],
      company_name: company,
    };

    setSubmitted(true);
    axios
      .post(`${BASE_URL}${END_POINT.ONBOARDING}`, data)
      .then((res) => {
        if (res.status === 200) {
          const isNewUser = res.data.isNewUser;
          if (isNewUser) setAuthState((prev) => ({ ...prev, isNewUser }));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (e) => {
    const { value, id } = e.target;

    switch (id) {
      case "client_name":
        setName(value);
        break;
      case "client_email":
        setIsMailValid(isEmail(value));
        if (isMailValid) {
          setEmail(value);
        }
        break;
      case "client_phone":
        setPhone(value);
        break;
      case "client_company":
        setCompany(value);
        break;
      default:
        return null;
    }
  };

  const handleCloseSnackbar = () => {
    setSubmitted(false);
  };
  const handleDialCode = (e) => {
    setDialCode(e.dialing_code);
  };
  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Grid container className={classes.simpleForm}>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={12}>
              <Typography className={classes.clientInformation}>
                Client Information
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Grid container style={{ marginTop: "20px" }} spacing={2}>
                <Grid item xs={12} md={6} className={classes.gridItemContainer}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    required
                    onChange={handleChange}
                    id="client_company"
                    label="Company Legal Name"
                    className={classes.inputFields}
                  />
                </Grid>
                <Grid item xs={12} md={6} className={classes.gridItemContainer}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    onChange={handleChange}
                    id="client_name"
                    label="Name"
                    className={classes.inputFields}
                  />
                </Grid>
                <Grid item xs={12} md={6} className={classes.gridItemContainer}>
                  <TextField
                    type="email"
                    variant="outlined"
                    required
                    fullWidth
                    onChange={handleChange}
                    id="client_email"
                    label="Email"
                    className={classes.inputFields}
                  />
                  {/* {!isMailValid && <Typography>mail is not valid</Typography>} */}
                </Grid>

                <Grid item xs={12} md={6}>
                  <Grid container className={classes.dialAutoCompleteContainer}>
                    <Grid className={classes.dialAutoComplete} item>
                      {/* <DialPhoneAutoComplete handleChange={handleDialCode} /> */}
                    </Grid>

                    <Grid item className={classes.dialAutoCompleteNumber}>
                      <TextField
                        variant="outlined"
                        type="number"
                        required
                        fullWidth
                        onChange={handleChange}
                        id="client_phone"
                        label="Phone"
                        className={classes.inputFields}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} className={classes.gridItemButtonContainer}>
                  <StyledButton className={classes.sendButton} type="submit">
                    Send
                  </StyledButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={isSubmitted}
          onClose={handleCloseSnackbar}
          message="Please proceed via the link sent to your email address."
          key={"snackbarKey"}
          autoHideDuration={5000}
        />
      </Grid>
    </Box>
  );
};
export default SimpleForm;
