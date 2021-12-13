import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import { Box, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  mobileStepperBox: {
    display: 'flex',
    gap: '9%',
    alignItems: 'center',
    marginBottom: '1.5rem',
  },
  circularMain: {
    color: '#3E2F71',
    '& .MuiCircularProgress-circle': {
      transition: '.65s ease-out',
    },
  },
  circularProgress: {
    position: 'relative',
  },
  circularBG: {
    color: '#F3F3F3',
    position: 'absolute',
    lefT: '0',
  },
  mobileStepperLabel: {
    fontWeight: 500,
  },
  mobilePageLabel: { fontWeight: 500 },
  nextPageLabel: {
    fontWeight: 300,
    // '&.customPatch': {
    //   [theme.breakpoints.down('sm')]: {
    //     visibility: 'hidden',
    //   },
    // },
  },
}));

const MobileStepper = (props) => {
  const classes = useStyles();

  return (
    <Box className={classes.mobileStepperBox}>
      <Box
        position='relative'
        display='inline-flex'
        className={classes.circularProgress}
      >
        <CircularProgress
          variant='determinate'
          value={100}
          size='70px'
          className={classes.circularBG}
        />
        <CircularProgress
          className={classes.circularMain}
          variant='determinate'
          value={(props.activeStep + 1) * 33.3}
          size='70px'
        />
        <Box
          top={0}
          left={0}
          bottom={0}
          right={0}
          position='absolute'
          display='flex'
          alignItems='center'
          justifyContent='center'
        >
          <Typography className={classes.mobileStepperLabel}>
            {props.activeStep + 1} of 3
          </Typography>
        </Box>
      </Box>
      <Box
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'start',
        }}
      >
        <Typography className={classes.mobilePageLabel}>
          {props.stepLabel}
        </Typography>
        <Typography
          className={classes.nextPageLabel}
          style={{ color: '#B9C6CD' }}
        >
          {props.activeStep !== 2
            ? `Next: ${props.nextStepLabel}`
            : 'Read and accept the Terms of Use'}
        </Typography>
      </Box>
    </Box>
  );
};

export default MobileStepper;

// export default function CircularStatic() {
//   const [progress, setProgress] = React.useState(10);

//   React.useEffect(() => {
//     const timer = setInterval(() => {
//       setProgress((prevProgress) =>
//         prevProgress >= 100 ? 0 : prevProgress + 10
//       );
//     }, 800);
//     return () => {
//       clearInterval(timer);
//     };
//   }, []);

//   return <CircularProgressWithLabel value={progress} />;
// }
