import { Box, Checkbox, FormControlLabel, makeStyles } from '@material-ui/core';
import { Grid, Typography, Paper, List } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { useState, useLayoutEffect, useContext, useEffect } from 'react';
import AuthContext from '../context/auth';
import CheckBoxOutlineBlankSharpIcon from '@material-ui/icons/CheckBoxOutlineBlankSharp';
import StyledButton from '../components/StyledButton';
import { useStyles } from '../styles/UiForm';
import { terms, appendix } from '../data/content';
import { createTermsAppendixContent, createTermsContent } from '../utils';

const TermsForm = (props) => {
  const classes = useStyles();
  const [isAgreed, setAgreed] = useState(false);
  const { authState, setAuthState } = useContext(AuthContext);

  useLayoutEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  const handleApprove = (e) => {
    
    setAgreed(true);
  };
  const handleReject = () => {
    setAgreed(false);
  };

  const toggleAgree = (e) => {
    const isAgree = e.target.checked;
    console.log('accepting ', isAgree);
    setAuthState((prev) => ({ ...prev, isAgree }));

    //////////////////PROBABLY NEEDS TO CALL THE SERVER NOW
  };
  return (
    <Grid container className={classes.termFormContainer}>
      <Grid item>
        {!props.query && (
          <Typography className={classes.termsOfUseLabel} variant='h4'>
            Terms of Use
          </Typography>
        )}
      </Grid>
      <Grid item className={classes.termOfUseContainer}>
        <Grid container spacing={2}>
          {createTermsContent(terms, classes)}
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid
          container
          direction='column'
          className={classes.agreeToServiceBox}
        >
          <Grid item>
            <Typography
              style={{
                color: '#3E2F71',
                textAlign: 'center',
                fontSize: '16px',
              }}
              variant='h6'
            >
              Would you like to use our electronic trading platform and
              services?
            </Typography>
          </Grid>
          <Grid item>
            <Grid container className={classes.yesNoContainer}>
              <Grid item>
                <StyledButton onClick={handleApprove}>Yes</StyledButton>
              </Grid>
              <Grid item>
                <StyledButton onClick={handleReject}>No</StyledButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item hidden={!isAgreed}>
            <Grid className={classes.termOfUseContainer} container spacing={3}>
              {createTermsAppendixContent(appendix, classes)}s
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item className={classes.acceptLabel} xs={12}>
        <FormControlLabel
          className={classes.formLabelTermOfUse}
          sx={{ color: 'white' }}
          control={
            <Checkbox
              onChange={toggleAgree}
              icon={<CheckBoxOutlineBlankSharpIcon />}
              checked={authState.isAgree}
            />
          }
          label={
            <Typography style={{ fontSize: '16px', textAlign: 'center' }}>
              Before you can submit application, you must aggree with Terms of
              Use
            </Typography>
          }
        />
      </Grid>
      <Grid item className={classes.subAcceptLabel} xs={12}>
        <Grid>
          <Typography>
            The submitted documentation will be reviewed by the Compliance
            department. This process might take up to 14 business days.
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default TermsForm;
