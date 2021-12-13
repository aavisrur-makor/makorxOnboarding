import { makeStyles, Box, Button, Typography, Modal } from "@material-ui/core";
import { useStyles } from "../styles/FinalePage";

const FinaleBox = () => {
  const classes = useStyles();
  const handleClose = () => {};
  return (
    <Modal open={false} className={classes.container}>
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
