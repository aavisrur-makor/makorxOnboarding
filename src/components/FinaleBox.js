import { makeStyles, Box, Button, Typography, Modal } from "@material-ui/core";
import { useStyles } from "../styles/FinalePage";
import AuthContext from "../context/auth";
import { useContext } from "react";

const FinaleBox = () => {
  const classes = useStyles();
  const { authState, setAuthState } = useContext(AuthContext);
  const handleClose = () => {
    setAuthState((prev) => ({
      ...prev,
      isAgreed: false,
    }));
  };
  return (
    <Modal open={authState.isAgreed} className={classes.container}>
      <Box className={classes.subContainer}>
        <Typography
          style={{ font: "normal normal normal 24px/28px Work Sans" }}
        >
          Your application is successfully sent
        </Typography>
        <Button className={classes.Button} onClick={handleClose}>
          Close
        </Button>
      </Box>
    </Modal>
  );
};

export default FinaleBox;
