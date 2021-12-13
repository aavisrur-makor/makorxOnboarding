import {
  Container,
  makeStyles,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import React, { useEffect } from 'react';
import StepperFormComplex from './components/StepperFormComplex';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SimpleForm from './components/SimpleForm';
import FinaleBox from './components/FinaleBox';
import useEventListener from './hooks/useEventListener';
import { useState } from 'react';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    padding: '0',
    [theme.breakpoints.down('md')]: { padding: '1rem' },
  },
}));

const App = () => {
  const classes = useStyles();

  const appRef = useEventListener('copy', (e) => {
    e.preventDefault();
  });

  return (
    <Container maxWidth='md' className={classes.mainContainer} ref={appRef}>
      <Router>
        <Routes>
          <Route path='/' element={<SimpleForm />}></Route>
          <Route path='/:uuid' element={<StepperFormComplex />}></Route>
          <Route path='/finale' element={<FinaleBox />}></Route>
        </Routes>
      </Router>
      <FinaleBox />
    </Container>
  );
};

export default App;
