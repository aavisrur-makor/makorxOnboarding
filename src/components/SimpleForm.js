import React, { useContext, useEffect, useState } from 'react';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { styled } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import StyledButton from '../components/StyledButton';
import axios from 'axios';
import {
  Modal,
  Typography,
  Snackbar,
  makeStyles,
  FormControl,
} from '@material-ui/core';
import AuthContext from '../context/auth';
import { useStyles } from '../styles/SmallForm';
// import { Autocomplete } from "@mui/material";
import CountryAutoComplete from './CountryAutoComplete';
import DialPhoneAutoComplete from './DialPhoneAutoComplete';

const SimpleForm = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [company, setCompany] = useState();
  const { authState, setAuthState } = useContext(AuthContext);
  const classes = useStyles();
  const [isSubmitted, setSubmitted] = useState(false);

  // useEffect(async () => {
  //   console.log("SIMPLE FORM FIRST UPLOAD");
  //   getUserCountry();
  // }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);
    console.log('inside the submit');
    const data = {
      name: name,
      email: [email],
      phone: [phone],
      company: company,
    };

    console.log('data', data);
    setSubmitted(true);
    axios
      .post(`http://10.0.0.191:3030/api/onboarding`, data)
      .then((res) => {
        console.log('login res', res);
        if (res.status === 200) {
          const isNewUser = res.data.isNewUser;
          if (isNewUser) setAuthState((prev) => ({ ...prev, isNewUser }));
          ////////////////save uuid in redux
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (e) => {
    const { value, id } = e.target;
    console.log('id:', id);
    console.log('value:', value);
    switch (id) {
      case 'client_name':
        setName(value);
        break;
      case 'client_email':
        setEmail(value);
        break;
      case 'client_phone':
        setPhone(value);
        break;
      case 'client_company':
        setCompany(value);
        break;
      default:
        return null;
    }
  };

  const handleCloseSnackbar = () => {
    setSubmitted(false);
  };

  return (
    <Box component='form' onSubmit={handleSubmit}>
      <Grid container className={classes.simpleForm}>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={12}>
              <Typography className={classes.clientInformation}>
                Client Information
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Grid container style={{ marginTop: '20px' }} spacing={2}>
                <Grid item xs={12} md={6} className={classes.gridItemContainer}>
                  <TextField
                    variant='outlined'
                    fullWidth
                    required
                    onChange={handleChange}
                    id='client_company'
                    label='Company Legal Name'
                    className={classes.inputFields}
                  />
                </Grid>
                <Grid item xs={12} md={6} className={classes.gridItemContainer}>
                  <TextField
                    variant='outlined'
                    required
                    fullWidth
                    onChange={handleChange}
                    id='client_name'
                    label='Name'
                    // multiline
                    // maxRows={9}
                    // rows='9'
                    className={classes.inputFields}
                  />
                </Grid>
                <Grid item xs={12} md={6} className={classes.gridItemContainer}>
                  <TextField
                    type='email'
                    variant='outlined'
                    required
                    fullWidth
                    onChange={handleChange}
                    id='client_email'
                    label='Email'
                    className={classes.inputFields}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Grid container className={classes.dialAutoCompleteContainer}>
                    <Grid className={classes.dialAutoComplete} item>
                      <DialPhoneAutoComplete
                      // loggedUserCountry={userCountry}
                      />
                    </Grid>
                    <Grid item className={classes.dialAutoCompleteNumber}>
                      <TextField
                        variant='outlined'
                        required
                        fullWidth
                        onChange={handleChange}
                        id='client_phone'
                        label='Phone'
                        className={classes.inputFields}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} className={classes.gridItemButtonContainer}>
                  <StyledButton
                    // type="submit"
                    className={classes.sendButton}
                    type='submit'
                  >
                    Send
                  </StyledButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={isSubmitted}
          onClose={handleCloseSnackbar}
          message='Please proceed via the link sent to your email address.'
          key={'snackbarKey'}
          autoHideDuration={5000}
        />

        {/* <Modal className={classes.ModalContainer} open={isLogged}>
          <Box className={classes.ModalBoxContainer}>
            <Typography
              className={classes.modalTextFontTitle}
              id="modal-modal-title"
              variant="h6"
              component="h2"
            >
              Success!
            </Typography>

            <Typography
              className={classes.modalTextFont}
              id="modal-modal-description"
              sx={{ mt: 2 }}
            >
              You can now proceed to the link sent to you the phone number you
              provided
            </Typography>
            <StyledButton
              onClick={() => {
                setLogged(false);
              }}
              className={classes.modalButton}
            >
              Close
            </StyledButton>
          </Box>
        </Modal> */}
      </Grid>
    </Box>
  );
};
export default SimpleForm;
