import { useState } from "react";
import FileContext, {
  initialState as initialFileState,
} from "../context/files";
import FieldContext, {
  initialState as initialFieldState,
} from "../context/fields";
import AuthContext, { initialState as initialAuthState } from "../context/auth";

const ChiefProvider = (props) => {
  const [fileState, setFileState] = useState(initialFileState);
  const [fieldState, setFieldState] = useState(initialFieldState);
  const [authState, setAuthState] = useState(initialAuthState);

  return (
    <FileContext.Provider value={{ fileState, setFileState }}>
      <FieldContext.Provider value={{ fieldState, setFieldState }}>
        <AuthContext.Provider value={{ authState, setAuthState }}>
          {props.children}
        </AuthContext.Provider>
      </FieldContext.Provider>
    </FileContext.Provider>
  );
};

export default ChiefProvider;
