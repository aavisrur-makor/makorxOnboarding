export default {
  form1: {
    grid1: [
      { id: "company_entity_id", label: "Company", type: "select" },
      { id: "legal_entity_name", label: "Legal Entity Name", type: "text" },
      {
        id: "legal_entity_identifier",
        label: "Legal Entity Identifier",
        type: "text",
      },
    ],
    grid2: [
      {
        id: "registration_gapi_location",
        label: "Address",
        type: "text",
      },
      { id: "country", label: "Country", type: "select" },
      {
        id: "us_state",
        label: "State",
        type: "select",
      },
    ],
    grid3: [
      { id: "regulator", label: "Regulator", type: "text" },
      { id: "regulation_number", label: "Regulation Number", type: "text" },
      { id: "activity_description", label: "Comment", type: "textarea" },
      {
        id: "onboarding_has_company_entity_asset",
        label: "Products",
        type: "checkbox",
      },
      { id: "contact_position", label: "Position", type: "select" },
      { id: "contact_name", label: "Name", type: "text" },
      { id: "contact_email", label: "Info", type: "text" },
    ],
  },
  form2: [
    {
      id: "certificate_of_incorporation",
      label: "CERTIFICATE OF INCORPORATION",
    },
    {
      id: "articles_of_association",
      label: "ARTICLES OF ASSOCIATION / MEMORANDUM OF ASSOCIATION",
    },
    { id: "proof_of_business_address", label: "DIRECTOR'S NAME" },
    {
      id: "directors_list",
      label: "PROOF OF REGISTERED OR PRINCIPAL BUSINESS ADDRESS",
    },
    {
      id: "shareholders_list",
      label: "COMPANY DIRECTORS' LIST DATED AND SIGNED",
    },
    { id: "source_of_funds", label: "SOURCE OF FUNDS/WEALTH" },
    {
      id: "chart_of_organisation",
      label: "OWNERSHIP STRUCTURE SCHEME/ORGANIZATIONAL CHART OR EQUIVALENT",
    },
    { id: "aml_policy", label: "COMPLIANCE KYC AML POLICY" },
    {
      id: "financial_statement",
      label: "LATEST FINANCIAL STATEMENT (IF AVAILABLE)",
    },
    { id: "PROOFS", label: "DIRECTOR'S NAME" },
  ],
};

// select	mandatory	company	onboarding.company_entity_id
// input(type="text")	mandatory	legal entity name	onboarding.legal_entity_name
// input(type="text")		LEI	onboarding.legal_entity_identifier
// input(type="text")		address	onboarding.registration_gapi_location
// select	mandatory	country	onboarding.country
// select		state	onboarding.us_state
// input(type="text")		regulator	onboarding.regulator
// input(type="text")		regulation number	onboarding.regulation_number
// textarea		comment	onboarding.activity_description
// input(type="checkbox")	mandatory	products	onboarding.onboarding_has_company_entity_asset
// select		contact - position	onboarding.onboarding_contact.contact_position
// input		contact - name	onboarding.onboarding_contact.name
// input(type="email")	mandatory	contact - contact info	onboarding.onboarding_contact.email
