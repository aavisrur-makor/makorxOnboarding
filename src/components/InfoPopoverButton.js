import { useEffect, useState, useRef, memo } from 'react';
import {
  Typography,
  Box,
  IconButton,
  Popover,
  makeStyles,
} from '@material-ui/core';
import { ReactComponent as InfoSvg } from '../assets/circleoutline.svg';

const useStyles = makeStyles((theme) => ({
  popoverBox: {
    transform: 'translateY(-2px)',
    [theme.breakpoints.down('md')]: {
      justifyContent: 'end',
    },
  },
  popover: {
    zIndex: 1301,
  },
  popOverContent: {
    width: '60vw',

    position: 'absolute',
    willChange: 'transform',
    top: '0px',
    left: '0px',
    transform: 'translate3d(-20px, 10px, 0px)',
  },
}));

const InfoPopoverButton = (props) => {
  const infoRef = useRef();
  const [isOpen, setOpen] = useState(false);
  const [anchor, setAnchor] = useState(null);
  const classes = useStyles();

  useEffect(() => {
    console.log(
      '🚀 ~ file: InfoPopoverButton.js ~ line 10 ~ InfoPopoverButton ~ anchor',
      anchor
    );
  }, [anchor]);

  const handleOpen = (e) => {
    // setOpen(true);

    // MuiButtonBase-root.MuiIconButton-root

    console.log('opened', e.currentTarget);
    setAnchor(e.currentTarget);
  };

  const handleClose = () => {
    // setOpen(false);
    setAnchor(null);
    console.log('closed');
  };

  // useEffect(() => {
  //   console.log('truInfoRef', infoRef);
  // }, [infoRef]);

  // useEffect(() => {
  //   console.log('reopeend');
  // }, [isOpen]);

  return (
    <Box className={classes.popoverBox}>
      <IconButton
        style={{ padding: 0, marginLeft: '10px' }}
        // ref={infoRef}
        // aria-describedby={props.id}
        // variant='contained'
        onMouseEnter={handleOpen}
        onMouseLeave={handleClose}
        className={anchor ? classes.popover : ''} ///////////////CHECK FURTHER
      >
        <InfoSvg />
      </IconButton>

      <Popover
        // id={'simple-popover'}
        className={classes.popOverContent}
        open={!!anchor}
        anchorEl={anchor}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'right',
        }}
      >
        <Typography sx={{ p: 2 }}>{props.info}</Typography>
      </Popover>
    </Box>
  );
};

export default InfoPopoverButton;
