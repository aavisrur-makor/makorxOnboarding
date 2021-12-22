import { createContext } from "react";

export default createContext();
export const initialState = {
  company_id: "",
  company_name: "",
  LEI: "",
  address: "",
  country_id: "",
  us_state_id: "",
  regulator_id: "",
  regulation_number: "",
  comment: "",
  checked_assets: [],
  contact_position_id: "",
  contact_name: "",
  contact_email: "",
};
