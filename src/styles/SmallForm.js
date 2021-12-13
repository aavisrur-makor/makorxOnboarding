import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  root: {},
  simpleForm: {
    minHeight: '100vh',
    alignItems: 'center',
    justifyContent: 'center',

    '& > .MuiGrid-root.MuiGrid-item': {
      // boxSizing: 'border-box',
      boxShadow: '0 .7rem 2.5rem -5px rgba(0,0,0,.1)',
      padding: '100px',
      [theme.breakpoints.down('md')]: {
        padding: '10% 5%',
      },
      justifyContent: 'center',
    },
    // "& > .MuiGrid-root.MuiGrid-item > .MuiGrid-root.MuiGrid-container": {
    //   padding: "2rem",
    // },
    // // '& > .MuiGrid-root.MuiGrid-item >  .MuiGrid-root.MuiGrid-container': {
    //   boxShadow: '0 .7rem 1.9rem rgba(0,0,0,.1)',
    //   textAlign: 'center',
    //   justifyContent: 'center',
    // },
  },
  sendButtonContainer: {
    display: 'flex',
    justifyContent: 'right',
  },
  sendButton: {
    padding: '.35rem 1.65rem',
    borderRadius: '0',
    backgroundSize: '100% 205%',
    backgroundOrigin: 'padding',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center 100%',
    backgroundImage: 'linear-gradient(to bottom, #3E2F72 50%, transparent 50%)',
    border: '3px #3E2F72 solid',
    transition: '.2s',
    '&:hover': {
      backgroundPosition: 'center 0',
      color: 'white',
    },
  },
  clientInformation: {
    textAlign: 'left',
    font: 'normal normal normal 32px/38px Work Sans',
    letterSpacing: '0px',
    color: '#404040',
    opacity: '1',
  },
  inputFields: {
    border: '0px solid #B9C6CD',
    opacity: '1',
    '& .MuiInputBase-root.MuiOutlinedInput-root.MuiInputBase-fullWidth.MuiInputBase-formControl':
      {
        borderRadius: '0',
      },
  },
  //   gridItemContainer: {
  //     display: "flex",
  //     alignItems: "center",
  //   },
  gridItemButtonContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: '.6rem',
  },
  ModalContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0px 5px 15px #4E4E4E29',
    border: 'none',
  },
  ModalBoxContainer: {
    background: '#FCFCFC 0% 0% no-repeat padding-box',
    opacity: '1',
    top: '392px',
    left: '690px',
    width: '541px',
    height: '247px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
  },
  modalTextFontTitle: {
    font: 'normal normal normal 24px/28px Work Sans',
    textAlign: 'center',
    marginBottom: '20px',
  },
  modalTextFont: {
    font: 'normal normal normal 19px/24px Work Sans',
    textAlign: 'center',
    marginBottom: '20px',
  },
  modalButton: {
    border: '2px solid #222246',
    opacity: '1',
  },
  dialAutoCompleteContainer: {
    gap: '1.25rem',
    justifyContent: 'space-between',
  },
  dialAutoComplete: {
    marginTop: '0 !important',

    '& .MuiGrid-root.MuiGrid-item': { flex: '1' },
    '& .MuiAutocomplete-root': {
      padding: '15px 0 1px 10px',
    },
    '& .MuiInputBase-root': {
      marginTop: '0',

      // boxShadow: "inset 0 0 0 1px #B9C6CD",
    },
    '& .MuiInputBase-root::before,& .MuiInputBase-root.Mui-focused::before ': {
      content: 'none',
    },
    '& .MuiFormLabel-root.MuiInputLabel-root.MuiInputLabel-formControl.MuiInputLabel-animated.MuiInputLabel-shrink.MuiFormLabel-filled':
      { display: 'none' },
    '& .MuiButtonBase-root.MuiIconButton-root.MuiAutocomplete-clearIndicator.MuiAutocomplete-clearIndicatorDirty':
      { display: 'none' },
  },
  dialAutoCompleteNumber: {
    flex: 1,
  },
}));
