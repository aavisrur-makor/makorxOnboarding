import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {},
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  subContainer: {
    width: "50%",
    backgroundColor: "white",
    background: "#FCFCFC 0% 0% no-repeat padding-box",
    boxShadow: "0px 5px 15px #4E4E4E29",
    opacity: "1",
    width: "541px",
    height: "247px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  Button: {
    marginTop: "70px",
    border: "2px solid #222246",
    opacity: "1",
    width: "108px",
    height: "43px",
  },
}));
