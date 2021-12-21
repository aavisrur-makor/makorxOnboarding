import { useEffect, useState, useRef, memo } from "react";
import {
  Typography,
  Box,
  IconButton,
  Popover,
  makeStyles,
  useTheme,
  useMediaQuery,
  Portal,
} from "@material-ui/core";
import { ReactComponent as InfoSvg } from "../assets/circleoutline.svg";

const useStyles = makeStyles((theme) => ({
  popoverBox: {
    [theme.breakpoints.up("sm")]: {
      position: "relative",
    },

    // transform: "translateY(-2px)",
    [theme.breakpoints.down("md")]: {
      justifyContent: "end",
    },
    "&:hover > p": {
      opacity: "1",
      visibility: "visible",
      transform: "translate(100%, -100%)  rotateZ(.19deg)",
      [theme.breakpoints.down("sm")]: {
        position: "relative",
        transform: "translate(10px, -10px)  rotateZ(.19deg)",
      },
    },
  },
  popover: {
    zIndex: 1301,
    position: "absolute",
    top: "0",
    right: "0",
    // transition: " transform ",
    opacity: "0",
    // visibility: "hidden",
    pointerEvents: "none",
    width: "max-content",
    color: "rgba(62,47,113, .8)",
    fontWeight: "400",
    transform: "translate(100%, -98%) rotateZ(.19deg)",
    backgroundColor: "white",
    padding: ".65rem .75rem",
    boxShadow: "0 5px 23px rgba(0,0,0,.2)",
    borderRadius: "4px",
    fontSize: "15px",

    [theme.breakpoints.down("sm")]: {
      top: "0",
      left: "0",
      transform: "translate(10px, 10px)",
    },

    // zIndex: 1301,
  },
  popOverContent: {
    // width: "30rem",
    // willChange: 'transform',
    // top: '0px',
    // left: '0px',
    transform: "translate3d(-20px, 10px, 0px)",
    "& .MuiPopover-paper": {
      // top: "00px",
      // left: "1000px",
    },
  },
}));

const InfoPopoverButton = (props) => {
  const infoRef = useRef();
  const [anchor, setAnchor] = useState(null);
  const classes = useStyles();
  const theme = useTheme();
  const queryMatch = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    console.log(
      "🚀 ~ file: InfoPopoverButton.js ~ line 51 ~ useEffect ~ effect"
    );
  }, []);

  const handleOpen = (e) => {
    setAnchor(e.currentTarget);
  };

  const handleClick = () => {
    setAnchor((prev) => !prev);
  };

  const handleClose = () => {
    setAnchor(null);
  };

  // const open = !!anchor;
  // const id = open ? 'simple-popover' : undefined;

  return (
    <Box className={classes.popoverBox}>
      <IconButton
        style={{ padding: 0, marginLeft: "10px" }}
        // onMouseEnter={queryMatch ? null : handleClick}
        // onMouseLeave={queryMatch ? null : handleClose}
        onClick={handleClick}
      >
        <InfoSvg />
      </IconButton>
      <Typography className={classes.popover}>{props.info}</Typography>
    </Box>
  );
};

export default InfoPopoverButton;
