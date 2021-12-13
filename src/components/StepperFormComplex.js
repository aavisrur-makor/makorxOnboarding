import React, { useEffect, useContext } from 'react';
import { Box } from '@material-ui/core';
import { Stepper } from '@material-ui/core';
import { Step } from '@material-ui/core';
import { StepButton, Grid } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { Typography, makeStyles } from '@material-ui/core';
import PseudoForm from './PseudoForm';
import FileForm from './FileForm';
import TermsForm from './TermsForm';
import ProgressBar from './ProgressBar';
import axios from 'axios';
import FieldContext from '../context/fields';
import FileContext from '../context/files';
import AuthContext from '../context/auth';

import { useParams } from 'react-router';
import StyledButton from './StyledButton';
import { useStyles as useMixins } from '../styles/mixins';
import { useStyles } from '../styles/UiForm';
import CircularProgress from '@material-ui/core/CircularProgress';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core';
import MobileStepper from './MobileStepper';

const steps = ['Submit Documentation', 'Attach Documents', 'Terms of Use'];

const StepperFormComplex = () => {
  const classes = useStyles();
  const mixins = useMixins();

  const { fieldState, setFieldState } = useContext(FieldContext);
  const { fileState, setFileState } = useContext(FileContext);
  const { authState, setAuthState } = useContext(AuthContext);
  const params = useParams();
  const theme = useTheme();
  const queryMatch = useMediaQuery('(max-width:800px)');

  console.log('statetest', authState);

  useEffect(() => {
    console.log('uuid useeffect', params.uuid);
    setAuthState((prev) => ({ ...prev, uuid: params.uuid }));
    if (params.uuid) {
      const fieldCall = axios.get(
          `http://10.0.0.191:3030/api/onboarding/${params.uuid}`
        ),
        fileCall = axios.get(
          `http://10.0.0.191:3030/api/document/${params.uuid}`
        );

      axios
        .all([fieldCall, fileCall])
        .then(
          axios.spread((res1, res2) => {
            console.log('RES 1', res1);
            console.log('RES2', res2);
            const textFields = res1.data;
            const fileFields = res2.data;

            res2.data.forEach((file) => {
              console.log('FILE INSIDE THE FOREA', file);

              console.log('fileName', file.file_boarding_name);
              fileFields[file.document_type_name] = file.boarding_name;
            });
            console.log('FILE FIELDS AFTER INSERT', fileFields);
            const fullData = { ...textFields, ...fileFields };
            setFieldState((prev) => ({ ...prev, ...textFields }));
            setFileState((prev) => ({ ...prev, ...fileFields }));
            setAuthState((prev) => ({
              ...prev,
              progress: res1.data.progress,
            }));
          })
        )
        .catch((err) => {
          console.log('inside the error', err);
        });
    }
  }, []);

  useEffect(() => {}, [authState]);

  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleAccept = () => {
    if (authState.isAccepted) window.location.pathname = 'finale';
  };
  console.log('FILE STATE', fileState);
  return (
    <Grid container className={classes.container} sm={12}>
      {queryMatch ? (
        <Grid item xs={10}>
          <MobileStepper
            nextStepLabel={steps[activeStep + 1]}
            stepLabel={steps[activeStep]}
            activeStep={activeStep}
          />
        </Grid>
      ) : (
        <Grid xs={12}>
          <Stepper
            className={classes.stepper}
            nonLinear
            activeStep={activeStep}
          >
            {steps.map((label, i) => (
              <Step key={label} completed={completed[i]}>
                <StepButton
                  className={classes.Label}
                  color='inherit'
                  onClick={handleStep(i)}
                >
                  {label}
                </StepButton>
              </Step>
            ))}
          </Stepper>
        </Grid>
      )}
      <Grid item className={classes.BoxContainer} xs={11}>
        <Grid container direction='column'>
          <Grid item>{!queryMatch && <ProgressBar />}</Grid>
          <Grid item className={mixins.formBody}>
            {activeStep === 0 ? (
              <PseudoForm query={queryMatch} value={fieldState} />
            ) : activeStep === 1 ? (
              <FileForm query={queryMatch} />
            ) : (
              <TermsForm query={queryMatch} />
            )}
          </Grid>
          <Grid item>
            <Grid container>
              {activeStep !== 0 && (
                <Grid item>
                  <StyledButton
                    // className={classes.navButton}
                    color='inherit'
                    className={classes.backStepperButtons}
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                    variant='outlined'
                  >
                    Back
                  </StyledButton>
                </Grid>
              )}
              <Grid item className={classes.navButtonRight}>
                {activeStep !== 2 ? (
                  <StyledButton
                    onClick={handleNext}
                    sx={{ mr: 1 }}
                    variant='outlined'
                  >
                    Next
                  </StyledButton>
                ) : (
                  <StyledButton
                    // className={classes.navButton}
                    className={classes.acceptAndSendStepperButtons}
                    onClick={handleAccept}
                    sx={{ mr: 1 }}
                    variant='outlined'
                  >
                    Accept and Send
                  </StyledButton>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default StepperFormComplex;
