import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { makeStyles, TextField } from "@material-ui/core";
import FieldContext from "../context/fields";
import AuthContext from "../context/auth";
import { BASE_URL, END_POINT } from "../constant";
import { useDebouncedCallback } from "use-debounce";
import validate from "../utils/validate";
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
  const [error, setError] = useState("");
  const classes = useStyles();

  const handleChange = async (e) => {
    if (props.isRequired) {
      console.log(
        "🚀 ~ file: DispatcherField.js ~ line 65 ~ handleChange ~ props.isRequired",
        props.isRequired
      );

      validate(e.target.id, fieldState[e.target.id], setError);
    }

    let field = {};
    if (e.target.id === "registration_gapi_location") {
      field = {
        fieldToUpdate: {
          field: e.target.id,
          value: [
            {
              name: "11 Derech Menachem Begin",
              location: { lat: 100.123456, lon: -90.987654 },
            },
          ],
        },
      };
    } else if (e.target.id === "email") {
      field = {
        fieldToUpdate: {
          field: e.target.id,
          value: [fieldState[e.target.id]],
        },
      };
    } else {
      field = {
        fieldToUpdate: {
          field: e.target.id,
          value: fieldState[e.target.id],
        },
      };
    }

    console.log(
      "🚀 ~ file: DispatcherField.js ~ line 82 ~ handleChange ~ ${BASE_URL}${END_POINT.ONBOARDING}${authState.uuid}",
      BASE_URL,
      END_POINT.ONBOARDING,
      authState.uuid
    );
    axios
      .put(`${BASE_URL}${END_POINT.ONBOARDING}${authState.uuid}`, field)
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
      InputProps={props.InputProps}
      className={classes.textField}
      id={props.id}
      fullWidth
      onChange={(e) => {
        setFieldState((prev) => {
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
      error={!!error}
      helperText={error && error}
    />
  );
};

export default DispatcherField;
