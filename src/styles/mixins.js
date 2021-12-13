import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  formBody: {
    marginBottom: '3rem',
  },
  unroundedField: {
    '& .MuiInputBase-root MuiOutlinedInput-root MuiInputBase-fullWidth MuiInputBase-formControl MuiInputBase-multiline MuiOutlinedInput-multiline':
      {
        borderRadius: 0,
      },
  },
}));
