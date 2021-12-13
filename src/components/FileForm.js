import React, { useEffect, useLayoutEffect, useContext } from "react";
import {
  Box,
  makeStyles,
  Typography,
  Grid,
  useMediaQuery,
} from "@material-ui/core";
import formData from "../data/formData";
import UploaderField from "./UploaderField";
import FileContext from "../context/files";
import DynamicInputGroup from "./DynamicInputGroup";
import { useStyles } from "../styles/UiForm";
import { useStyles as useMixins } from "../styles/mixins";

const FileForm = ({ query }) => {
  const classes = useStyles();
  const mixins = useMixins();

  useLayoutEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <Grid container>
      {!query && (
        <Grid item>
          <Typography gutterBottom className={classes.titleText}>
            Documents
          </Typography>
        </Grid>
      )}
      <Grid item>
        <Grid container>
          {formData.form2.map(({ id, label }, i) => (
            <Grid item xs={12}>
              <UploaderField
                style={{ padding: "16px 0" }}
                id={id}
                label={label}
                info={i !== 1 && i !== formData.form2.length - 1 ? true : false}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid item>
        <Typography className={classes.filesParagraph}>
          Personal documents for all shareholder/interest holders with 25% or
          more in the company, and also for at least two company’s current
          directors (and if no majority shareholder, than please provide a
          document signed by a director certifying that no individual owns 25%
          or more and leave this field empty)
        </Typography>
      </Grid>
      <DynamicInputGroup />
    </Grid>
  );
};

const StaticUploaderField = () => {};
export default FileForm;
