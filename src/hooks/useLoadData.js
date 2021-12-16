import React, { useEffect, useContext, useState } from "react";
import { Box, makeStyles, createStyles } from "@material-ui/core";
import { Stepper } from "@material-ui/core";
import { Step } from "@material-ui/core";
import { StepButton } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import PseudoForm from "./PseudoForm";
import FileForm from "./FileForm";
import TermsForm from "./TermsForm";
import ProgressBar from "./ProgressBar";
import { useSelector } from "react-redux";
import axios from "axios";
import FieldContext from "../context/fields";
import FileContext from "../context/files";
import AuthContext from "../context/auth";
import fieldDataActions from "../store/fieldDataSlice";
import fileDataActions from "../store/fileDataSlice";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import auth from "../context/auth";
import { useStyles } from "../styles/UiForm";
import useEventListener from "../hooks/useEventListener";

const useLoadData = () => {
  const { fieldState, setFieldState } = useContext(FieldContext);
  const { fileState, setFileState } = useContext(FileContext);
  const { authState, setAuthState } = useContext(AuthContext);
  const params = useParams();

  const [error, setError] = useState("");

  useEffect(() => {
    if (params.uuid) {
      setAuthState((prev) => ({ ...prev, uuid: params.uuid }));
    }
  }, [params]);
  return { error };
};
