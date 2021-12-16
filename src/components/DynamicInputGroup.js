import {
  IconButton,
  Grid,
  makeStyles,
  Input,
  useMediaQuery,
} from "@material-ui/core";
import _ from "lodash";
import { useEffect, useContext } from "react";
import FileContext from "../context/files";
import { ReactComponent as AddIcon } from "./../assets/icons/Group46.svg";
import { ReactComponent as TrashIcon } from "./../assets/icons/trashIcon.svg";

import axios from "axios";
import DynamicUploaderField from "./DynamicUploaderField";
import { useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    cursor: "pointer",
  },
  dynamicContainer: {
    marginTop: "32px",
    gap: "1.2rem",
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
      gap: "1.05rem",
    },
    "&.MuiBox-root": {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-evenly",
      alignItems: "center",
      marginTop: "40px",
    },
    "& .MuiTypography": {
      color: "red",
    },
    "& .MuiIconButton-root": {
      padding: "0",
      marginLeft: "20px",
    },
  },
  addButton: {
    "& .MuiIconButton-label": {
      marginLeft: "auto",
    },
    [theme.breakpoints.down("sm")]: {
      transform: "translateY(15px)",
    },
    [theme.breakpoints.up("md")]: {
      position: "relative",
      left: "100%",
      transform: "translate(4px,-242%)",
    },
  },
  subDynamicContainer: {
    border: "1px solid #B9C6CD",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px",
    "& .MuiBox-root": {
      display: "flex",
      alignItems: "center",
    },
    "& .MuiGrid-root:first-child": {},
    "& .MuiGrid-root:nth-child(3)": {},
    [theme.breakpoints.down("md")]: {
      padding: ".5rem",
    },
  },
}));

const DynamicInputGroup = () => {
  const { fileState, setFileState } = useContext(FileContext);
  const { f_proofs, extraProofs } = fileState;
  const classes = useStyles();
  const query = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    const fineTunedExtraProofs = extraProofs.length
      ? extraProofs
      : f_proofs.length
      ? []
      : [{ fileName: "", id: Math.round(Math.random() * 10000) }];
    setFileState({ ...fileState, extraProofs: fineTunedExtraProofs });
  }, []);

  const handleAdd = () => {
    console.log("adding dynamic nput");
    setFileState({
      ...fileState,
      extraProofs: [
        ...extraProofs,
        { fileName: "", id: Math.round(Math.random() * 10000) },
      ],
    });
  };

  return (
    <Grid container xs={12} md={11} className={classes.dynamicContainer}>
      {[...f_proofs, ...extraProofs].map((supposedFile, i) => {
        const id =
          typeof supposedFile === "string" ? supposedFile : supposedFile.id;

        return (
          <Grid item xs={12} className={classes.subDynamicContainer} key={id}>
            <DynamicUploaderField id={id} />
          </Grid>
        );
      })}
      <IconButton
        className={classes.addButton}
        onClick={handleAdd}
        disableRipple
        disableTouchRipple
        focusRipple={false}
      >
        <AddIcon style={{ marginRight: "20px" }} />
      </IconButton>
    </Grid>
  );
};

export default DynamicInputGroup;
