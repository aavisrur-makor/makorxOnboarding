import { createContext } from "react";

export default createContext();
export const initialState = {
  certificate_of_incorporation: "",
  articles_of_association: "",
  proof_of_business_address: "",
  directors_list: "",
  shareholders_list: "",
  source_of_funds: "",
  chart_of_organisation: "",
  aml_policy: "",
  financial_statement: "",
  f_proofs: [],
  extraProofs: [],
};
