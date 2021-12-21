import { Container, makeStyles } from "@material-ui/core";
import React, { useEffect } from "react";
import StepperFormComplex from "./components/StepperFormComplex";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SimpleForm from "./components/SimpleForm";
import FinaleBox from "./components/FinaleBox";
import useEventListener from "./hooks/useEventListener";
import axios from "axios";
import NotFound from "./components/CutomAutoComplete copy";

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    padding: "0",
    "& Mui-error": {
      backgroundColor: theme.palette.error.main,
      color: theme.palette.error.main,
    },
    [theme.breakpoints.down("md")]: { padding: "1rem" },
  },
}));

const App = () => {
  const classes = useStyles();
  // const gapiKey = "AIzaSyCIUAWPh7gQNZwSg6FnzmyobRzEZyRbLoA";

  useEffect(() => {
    // axios
    //   .post(
    //     "https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyCIUAWPh7gQNZwSg6FnzmyobRzEZyRbLoA"
    //   )
    //   .then((res) => {
    //     console.log("GOGGLE GEO LOCATION API", res);
    //   });
  }, []);

  const appRef = useEventListener("copy", (e) => {
    e.preventDefault();
  }); 

  return (
    <Container maxWidth="md" className={classes.mainContainer} ref={appRef}>
      <Router>
        <Routes>
          <Route path="/" exact element={<SimpleForm />}></Route>
          <Route path="/:uuid" exact element={<StepperFormComplex />}></Route>
          <Route path="/finale" exact element={<FinaleBox />}></Route>
          <Route path="/notFound" exact element={<NotFound />}></Route>
        </Routes>
      </Router>
      <FinaleBox />
    </Container>
  );
};

export default App;
