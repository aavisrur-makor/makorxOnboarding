import { createContext } from "react";

export default createContext();
export const initialState = {
  company_entity_id: "",
  legal_entity_name: "",
  legal_entity_identifier: "",
  registration_gapi_location: "",
  country_id: "",
  us_state: "",
  regulator: "",
  regulation_number: "",
  activity_description: "",
  onboarding_has_company_entity_asset: [],
  contact_position: "",
  name: "",
  email: "",
};
