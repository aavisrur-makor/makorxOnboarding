import { useContext } from "react";
import axios from "axios";
import { makeStyles, TextField } from "@material-ui/core";
import FieldContext from "../context/fields";
import AuthContext from "../context/auth";

import { useDebouncedCallback } from "use-debounce";

const useStyles = makeStyles((theme) => ({
  root: {
    border: "0px",
    "& .MuiInputBase-root.MuiOutlinedInput-root.MuiInputBase-fullWidth.MuiInputBase-formControl":
      {
        border: "0px",
      },
    "& .MuiInputBase-root.MuiOutlinedInput-root.MuiInputBase-fullWidth.MuiInputBase-formControl":
      {
        borderRadius: "0",
      },
    "& .MuiInputLabel-outlined": {
      textAlign: "center",

      letterSpacing: "0px",
      color: "#8A8A8A",
      opacity: "1",
    },
  },
  textField: {
    "& > .MuiInputLabel-root": {
      [theme.breakpoints.down("sm")]: { fontSize: "13px" },
    },
  },
}));

const DispatcherField = (props) => {
  const { fieldState, setFieldState } = useContext(FieldContext);
  const { authState, setAuthState } = useContext(AuthContext);
  const classes = useStyles();

  const handleChange = async (e) => {
    console.log("handling change in dispatcher", e.target.value);
    const fieldToUpdate = {
      field: e.target.id,
      value: fieldState[e.target.id],
    };
    console.log("FIELD TO UPDATE", fieldToUpdate);
    console.log("about to putting in fields", authState);
    console.log("putting in fields");
    axios
      .put(
        `http://10.0.0.191:3030/api/onboarding/${authState.uuid}`,
        fieldToUpdate
      )
      .then((res) => {
        if (res.status === 200) {
          setAuthState((prev) => ({
            ...prev,
            progress: res.data.progress,
          }));
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const debounced = useDebouncedCallback(handleChange, 400);

  return (
    <TextField
      className={classes.textField}
      id={props.id}
      fullWidth
      onChange={(e) => {
        setFieldState((prev) => {
          console.log("previous field state", e.target.value);
          return {
            ...prev,
            [props.id]: e.target.value,
          };
        });
        debounced(e);
      }}
      inputProps={{ style: { padding: 2 } }}
      label={props.label}
      value={fieldState[props.id]}
      variant="outlined"
      maxRows={props.maxRows}
      rows={props.rows}
      multiline
    />
  );
};

export default DispatcherField;
