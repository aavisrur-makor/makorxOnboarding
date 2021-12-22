import React, { useEffect, useContext } from "react";
import { Box } from "@material-ui/core";
import { Stepper } from "@material-ui/core";
import { Step } from "@material-ui/core";
import { StepButton, Grid } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { Typography, makeStyles } from "@material-ui/core";
import PseudoForm from "./PseudoForm";
import FileForm from "./FileForm";
import TermsForm from "./TermsForm";
import ProgressBar from "./ProgressBar";
import axios from "axios";
import FieldContext from "../context/fields";
import FileContext from "../context/files";
import AuthContext from "../context/auth";

import { useParams, useNavigate } from "react-router";
import StyledButton from "./StyledButton";
import { useStyles as useMixins } from "../styles/mixins";
import { useStyles } from "../styles/UiForm";
import CircularProgress from "@material-ui/core/CircularProgress";

import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core";
import MobileStepper from "./MobileStepper";
import { BASE_URL, END_POINT } from "../constant";

const steps = ["Submit Documentation"];

const StepperFormComplex = () => {
  const classes = useStyles();
  const mixins = useMixins();

  const { fieldState, setFieldState } = useContext(FieldContext);
  const { fileState, setFileState } = useContext(FileContext);
  const { authState, setAuthState } = useContext(AuthContext);
  const params = useParams();
  const queryMatch = useMediaQuery("(max-width:800px)");
  let navigate = useNavigate();

  useEffect(() => {
    const uuidRegExp =
      /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
    if (!uuidRegExp.test(params.uuid)) {
      navigate("/404");
    }
  }, []);
  useEffect(() => {
    setAuthState((prev) => ({ ...prev, uuid: params.uuid }));
    if (params.uuid) {
      console.log(
        "🚀 ~ file: StepperFormComplex.js ~ line 67 ~ useEffect ~ ${BASE_URL}${END_POINT.onboarding}${params.uuid}",
        `${BASE_URL}${END_POINT.ONBOARDING}${params.uuid}`
      );

      const fieldCall = axios
        .get(`${BASE_URL}${END_POINT.ONBOARDING}${params.uuid}`)
        .then((res) => {
          console.log("THE DETAILS FROM THE SERVER", res);
          const textFields = res.data;
          const textFieldAfterParse = {
            ...textFields,
            contact_email: JSON.parse(res.data.contact_email)[0],
            address: JSON.parse(res.data.address),
          };

          setFieldState((prev) => ({ ...prev, ...textFieldAfterParse }));
          setAuthState((prev) => ({
            ...prev,
            progress: res.data.progress,
            companyForProducts: res.data.company_id,
          }));
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
    if (authState.isAccepted) navigate("finale");
  };
  const handleSend = () => {
    const field = {
      is_agreed: true,
    };
    axios
      .put(`${BASE_URL}${END_POINT.ONBOARDING}${authState.uuid}`, field)
      .then((res) => {
        setAuthState((prev) => ({
          ...prev,
          isAgreed: true,
        }));
      })
      .catch((err) => console.log(err));
  };
  return (
    <Grid container className={classes.container}>
      {queryMatch ? (
        <Grid item xs={10}>
          <MobileStepper
            nextStepLabel={steps[activeStep + 1]}
            stepLabel={steps[activeStep]}
            activeStep={activeStep}
          />
        </Grid>
      ) : (
        <Grid item xs={12}>
          {/* <Stepper
            className={classes.stepper}
            nonLinear
            activeStep={activeStep}
          >
            {steps.map((label, i) => (
              <Step key={label} completed={completed[i]}>
                <StepButton
                  className={classes.Label}
                  color="inherit"
                  onClick={handleStep(i)}
                >
                  {label}
                </StepButton>
              </Step>
            ))}
          </Stepper> */}
        </Grid>
      )}
      <Grid item className={classes.BoxContainer} xs={11}>
        <Grid container direction="column">
          <Grid item>{!queryMatch && <ProgressBar />}</Grid>
          <Grid item className={mixins.formBody}>
            {activeStep === 0 ? (
              <PseudoForm query={queryMatch} value={fieldState} />
            ) : null}
          </Grid>
          <Grid item>
            <Grid container>
              {activeStep !== 0 && (
                <Grid item>
                  <StyledButton
                    color="inherit"
                    className={classes.backStepperButtons}
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                    variant="outlined"
                  >
                    Back
                  </StyledButton>
                </Grid>
              )}
              <Grid item className={classes.navButtonRight}>
                <StyledButton
                  className={
                    activeStep === 2 && classes.acceptAndSendStepperButtons
                  }
                  onClick={activeStep !== 2 ? handleSend : handleAccept}
                  sx={{ mr: 1 }}
                  variant="outlined"
                >
                  Accept And Send
                </StyledButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default StepperFormComplex;
